import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  company?: string;
  interest: string;
  message?: string;
}

const TO_EMAIL = "vinayakd@healthchain.com";

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as ContactPayload;

    // Basic server-side validation (never trust the client alone)
    if (!data.name?.trim() || !data.email?.trim() || !data.phone?.trim() || !data.interest?.trim()) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true", // true for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
      to: TO_EMAIL,
      replyTo: data.email,
      subject: `New contact form submission from ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Company: ${data.company || "-"}`,
        `Area of interest: ${data.interest}`,
        `Message: ${data.message || "-"}`,
      ].join("\n"),
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Company:</strong> ${data.company || "-"}</p>
        <p><strong>Area of interest:</strong> ${data.interest}</p>
        <p><strong>Message:</strong><br/>${(data.message || "-").replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form email error:", err);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}