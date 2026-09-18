import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface PricingEstimatePayload {
  email: string;
  payerType: string;
  members: number;
  effectivePMPM: number;
  recurringAnnual: number;
  connectivityOneTime: number;
}

const SALES_EMAIL = "vinayakd@healthchain.com";

const PAYER_LABELS: Record<string, string> = {
  "medicare-advantage": "Medicare Advantage",
  "medicaid-managed-care": "Medicaid managed care",
};

function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as PricingEstimatePayload;

    if (!data.email?.trim() || !Number.isFinite(data.members)) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const payerLabel = PAYER_LABELS[data.payerType] ?? data.payerType;
    const totalFirstYear = data.recurringAnnual + data.connectivityOneTime;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const summaryText = [
      `Payer type: ${payerLabel}`,
      `Covered members: ${data.members.toLocaleString()}`,
      `Effective PMPM: ${data.effectivePMPM.toFixed(3)}`,
      `Annual recurring: ${formatCurrency(data.recurringAnnual)}`,
      `Direct connectivity (one-time): ${formatCurrency(data.connectivityOneTime)}`,
      `Total first-year investment: ${formatCurrency(totalFirstYear)}`,
    ].join("\n");

    await transporter.sendMail({
      from: `"Health Chain Pricing" <${process.env.SMTP_USER}>`,
      to: data.email,
      bcc: SALES_EMAIL,
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
        <p><strong>Payer type:</strong> ${payerLabel}</p>
        <p><strong>Covered members:</strong> ${data.members.toLocaleString()}</p>
        <p><strong>Effective PMPM:</strong> ${data.effectivePMPM.toFixed(3)}</p>
        <p><strong>Annual recurring:</strong> ${formatCurrency(data.recurringAnnual)}</p>
        <p><strong>Direct connectivity (one-time):</strong> ${formatCurrency(data.connectivityOneTime)}</p>
        <p><strong>Total first-year investment:</strong> ${formatCurrency(totalFirstYear)}</p>
        <p style="color:#57534C;font-size:13px;margin-top:24px;">This estimate reflects the selected scope and stated pricing assumptions. Final scope, source readiness, service limits and contract terms are confirmed in your proposal.</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Pricing estimate email error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
