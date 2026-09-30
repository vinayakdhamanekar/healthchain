import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface PricingEstimatePayload {
  email: string;
  payerType: string;
  members: number;
  effectivePMPM: number | null;
  recurringAnnual: number;
  connectivityAnnual: number;
}

const SALES_EMAIL = "vinayakd@healthchain.com";

const PAYER_LABELS: Record<string, string> = {
  "medicare-advantage": "Medicare Advantage",
  "medicaid-managed-care": "Medicaid managed care",
};

function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

// Visitor-supplied values are interpolated into HTML emails, so escape them.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as PricingEstimatePayload;

    if (!data.email?.trim() || !Number.isFinite(data.members)) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const email = data.email.trim();
    const payerLabel = PAYER_LABELS[data.payerType] ?? data.payerType;
    const payerLabelHtml = escapeHtml(payerLabel);

    const transporter = process.env.GMAIL_CLIENT_ID
          ? nodemailer.createTransport({
              host: "smtp.gmail.com",
             port: 465,
              secure: true,
              auth: {
                type: "OAuth2",
                user: process.env.SMTP_USER,
                clientId: process.env.GMAIL_CLIENT_ID,
                clientSecret: process.env.GMAIL_CLIENT_SECRET,
                refreshToken: process.env.GMAIL_REFRESH_TOKEN,
              },
            })
          : nodemailer.createTransport({
              host: process.env.SMTP_HOST,
              port: Number(process.env.SMTP_PORT ?? 587),
              secure: process.env.SMTP_SECURE === "true", // true for port 465
              auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
              },
            });

    const pmpmText =
      data.effectivePMPM === null ? "Fixed (annual minimum through 10,000 members)" : data.effectivePMPM.toFixed(3);

    const summaryText = [
      `Payer type: ${payerLabel}`,
      `Covered members: ${data.members.toLocaleString()}`,
      `Effective PMPM: ${pmpmText}`,
      `Annual recurring (total): ${formatCurrency(data.recurringAnnual)}`,
      ...(data.connectivityAnnual > 0
        ? [`Includes direct connectivity (annual): ${formatCurrency(data.connectivityAnnual)}`]
        : []),
    ].join("\n");

    const connectivityHtml =
      data.connectivityAnnual > 0
        ? `<p><strong>Includes direct connectivity (annual):</strong> ${formatCurrency(data.connectivityAnnual)}</p>`
        : "";

    const requestedAt = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Copy for the visitor.
    const customerMail = transporter.sendMail({
      from: `"Health Chain Pricing" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your Health Chain interoperability pricing estimate",
      text: [
        "Here is a copy of your interoperability pricing estimate.",
        "",
        summaryText,
        "",
        "This estimate reflects the selected scope and stated pricing assumptions. Final scope, source readiness, service limits and contract terms are confirmed in your proposal.",
      ].join("\n"),
      html: `
        <h2>Your Health Chain interoperability pricing estimate</h2>
        <p><strong>Payer type:</strong> ${payerLabelHtml}</p>
        <p><strong>Covered members:</strong> ${data.members.toLocaleString()}</p>
        <p><strong>Effective PMPM:</strong> ${pmpmText}</p>
        <p><strong>Annual recurring (total):</strong> ${formatCurrency(data.recurringAnnual)}</p>
        ${connectivityHtml}
        <p style="color:#57534C;font-size:13px;margin-top:24px;">This estimate reflects the selected scope and stated pricing assumptions. Final scope, source readiness, service limits and contract terms are confirmed in your proposal.</p>
      `,
    });

    // Lead notification for sales; replying goes straight to the visitor.
    const salesMail = transporter.sendMail({
      from: `"Health Chain Website" <${process.env.SMTP_USER}>`,
      to: SALES_EMAIL,
      replyTo: email,
      subject: `New pricing estimate request: ${payerLabel}, ${data.members.toLocaleString()} members`,
      text: [
        "A visitor requested a copy of their pricing estimate from the website pricing calculator.",
        "",
        `Requested by: ${email}`,
        `Requested at: ${requestedAt} (ET)`,
        "",
        summaryText,
        "",
        "Reply to this email to contact the requester directly.",
      ].join("\n"),
      html: `
        <h2>New pricing estimate request</h2>
        <p>A visitor requested a copy of their pricing estimate from the website pricing calculator.</p>
        <p><strong>Requested by:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Requested at:</strong> ${requestedAt} (ET)</p>
        <hr style="border:none;border-top:1px solid #E5DECF;margin:20px 0;" />
        <p><strong>Payer type:</strong> ${payerLabelHtml}</p>
        <p><strong>Covered members:</strong> ${data.members.toLocaleString()}</p>
        <p><strong>Effective PMPM:</strong> ${pmpmText}</p>
        <p><strong>Annual recurring (total):</strong> ${formatCurrency(data.recurringAnnual)}</p>
        ${connectivityHtml}
        <p style="color:#57534C;font-size:13px;margin-top:24px;">Reply to this email to contact the requester directly.</p>
      `,
    });

    await Promise.all([customerMail, salesMail]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Pricing estimate email error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
