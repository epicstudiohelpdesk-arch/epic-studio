import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { persistFormSubmission } from "@/lib/submissions";

export const runtime = "nodejs";

const DEFAULT_TARGET_EMAILS = [
  "subhamdasholycross2023@gmail.com",
  "epicstudiohelpdesk@gmail.com",
  "rajeshroybusiness1997@gmail.com",
];

const TARGET_EMAILS = process.env.NOTIFICATION_EMAILS
  ? process.env.NOTIFICATION_EMAILS.split(",").map((e) => e.trim()).filter(Boolean)
  : DEFAULT_TARGET_EMAILS;

const TARGET_WHATSAPP_NUMBERS = [
  "916291773811",
  "917980595630",
];

interface CareerApplicationPayload {
  token?: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  experience?: string;
  availability?: string;
  portfolioUrl: string;
  resumeUrl: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body: CareerApplicationPayload = await request.json();

    if (!body.name?.trim() || !body.email?.trim() || !body.phone?.trim() || !body.role?.trim()) {
      return NextResponse.json(
        { error: "Name, email, phone number, and desired role are required." },
        { status: 400 }
      );
    }

    if (!body.resumeUrl?.trim()) {
      return NextResponse.json(
        { error: "Resume / Profile link is required." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      undefined;
    const clientUserAgent = request.headers.get("user-agent") || undefined;

    const formattedMessage = [
      `TARGET ROLE: ${body.role}`,
      `EXPERIENCE LEVEL: ${body.experience || "Not specified"}`,
      `NOTICE / AVAILABILITY: ${body.availability || "Not specified"}`,
      `PORTFOLIO / GITHUB: ${body.portfolioUrl}`,
      `RESUME / CV: ${body.resumeUrl}`,
      "",
      "APPLICANT PITCH / NOTES:",
      body.message?.trim() || "No additional notes provided.",
    ].join("\n");

    // Dual-layer persistence
    const { token, persistedToDb } = await persistFormSubmission({
      token: body.token,
      type: "career",
      name: body.name,
      email: body.email,
      phone: body.phone,
      discipline: body.role,
      budget: body.experience || null,
      timeline: body.availability || null,
      message: formattedMessage,
      callTopic: `Portfolio: ${body.portfolioUrl} | Resume: ${body.resumeUrl}`,
      ip: clientIp,
      userAgent: clientUserAgent,
    });

    // 1. Prepare Email Subject & Body
    const subject = `[EPIC TALENT] New Job Application: ${body.name} — ${body.role} [${token}]`;

    const textSummary = `================================================
EPIC STUDIO — NEW CAREER APPLICATION
================================================
Reference Token: ${token}
Timestamp: ${timestamp} IST

CANDIDATE DETAILS:
- Name: ${body.name}
- Email: ${body.email}
- Phone: ${body.phone}
- Desired Role: ${body.role}
- Experience: ${body.experience || "Not specified"}
- Notice / Availability: ${body.availability || "Immediate"}
- Portfolio / GitHub: ${body.portfolioUrl}
- Resume / CV Link: ${body.resumeUrl}

PITCH / COVER NOTE:
${body.message?.trim() || "None provided"}
================================================
Database Persisted: ${persistedToDb ? "YES (SQLite DB)" : "YES (Local Backup)"}
`;

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #030712; color: #f8fafc; padding: 24px; margin: 0;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: #0b132b; border-radius: 12px; overflow: hidden; border: 1px solid #1e293b;">
    <!-- Header Banner -->
    <tr>
      <td style="background: linear-gradient(135deg, #0534f2 0%, #082fe6 100%); padding: 32px 24px; text-align: left;">
        <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.15em; color: #c9ff17; text-transform: uppercase; margin-bottom: 6px;">
          EPIC STUDIO // TALENT DESK
        </div>
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">
          New Career Application
        </h1>
        <div style="margin-top: 8px; font-size: 13px; color: rgba(255, 255, 255, 0.8);">
          Ref: <span style="font-family: monospace; font-weight: 700; color: #ffffff;">${token}</span>
        </div>
      </td>
    </tr>

    <!-- Body Content -->
    <tr>
      <td style="padding: 28px 24px;">
        <h2 style="font-size: 14px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 16px 0;">
          Candidate Profile
        </h2>

        <table width="100%" border="0" cellspacing="0" cellpadding="10" style="background: #111827; border-radius: 8px; margin-bottom: 24px; border: 1px solid #1f2937;">
          <tr>
            <td width="35%" style="color: #64748b; font-size: 13px; font-weight: 600;">Full Name:</td>
            <td style="color: #ffffff; font-size: 14px; font-weight: 700;">${body.name}</td>
          </tr>
          <tr>
            <td style="color: #64748b; font-size: 13px; font-weight: 600;">Email Address:</td>
            <td style="color: #38bdf8; font-size: 14px; font-weight: 600;">
              <a href="mailto:${body.email}" style="color: #38bdf8; text-decoration: none;">${body.email}</a>
            </td>
          </tr>
          <tr>
            <td style="color: #64748b; font-size: 13px; font-weight: 600;">Phone / WhatsApp:</td>
            <td style="color: #ffffff; font-size: 14px; font-weight: 600;">${body.phone}</td>
          </tr>
          <tr>
            <td style="color: #64748b; font-size: 13px; font-weight: 600;">Applied Role:</td>
            <td style="color: #c9ff17; font-size: 14px; font-weight: 700;">${body.role}</td>
          </tr>
          <tr>
            <td style="color: #64748b; font-size: 13px; font-weight: 600;">Experience Level:</td>
            <td style="color: #ffffff; font-size: 13px;">${body.experience || "Not specified"}</td>
          </tr>
          <tr>
            <td style="color: #64748b; font-size: 13px; font-weight: 600;">Notice Period:</td>
            <td style="color: #ffffff; font-size: 13px;">${body.availability || "Immediate"}</td>
          </tr>
        </table>

        <h2 style="font-size: 14px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 16px 0;">
          Links &amp; Credentials
        </h2>

        <table width="100%" border="0" cellspacing="0" cellpadding="10" style="background: #111827; border-radius: 8px; margin-bottom: 24px; border: 1px solid #1f2937;">
          <tr>
            <td width="35%" style="color: #64748b; font-size: 13px; font-weight: 600;">Portfolio / GitHub:</td>
            <td style="color: #38bdf8; font-size: 13px; font-weight: 600;">
              <a href="${body.portfolioUrl}" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: underline;">
                ${body.portfolioUrl}
              </a>
            </td>
          </tr>
          <tr>
            <td style="color: #64748b; font-size: 13px; font-weight: 600;">Resume / CV Link:</td>
            <td style="color: #38bdf8; font-size: 13px; font-weight: 600;">
              <a href="${body.resumeUrl}" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: underline;">
                ${body.resumeUrl}
              </a>
            </td>
          </tr>
        </table>

        ${
          body.message
            ? `
        <h2 style="font-size: 14px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 16px 0;">
          Pitch / Candidate Note
        </h2>
        <div style="background: #111827; border: 1px solid #1f2937; border-radius: 8px; padding: 18px; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">${body.message}</div>
        `
            : ""
        }

        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #1f2937; font-size: 12px; color: #64748b; text-align: center;">
          Received on ${timestamp} IST · Dispatched to Talent &amp; Leadership Desks
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    // 2. Dispatch Email via Nodemailer
    let emailSent = false;
    let emailError: string | null = null;

    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASSWORD;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpSecure = process.env.SMTP_SECURE !== "false";

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"EPIC STUDIO Talent" <${smtpUser}>`,
          to: TARGET_EMAILS.join(", "),
          replyTo: body.email,
          subject,
          text: textSummary,
          html: htmlBody,
        });

        emailSent = true;
        console.log(`[Join API] ✓ Career application email dispatched to: ${TARGET_EMAILS.join(", ")}`);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("[Join API] SMTP dispatch error:", message);
        emailError = message;
      }
    } else {
      console.log(
        `[Join API] Application submitted by ${body.name} (${body.email}) for ${body.role} [${token}].`
      );
    }

    // Direct WhatsApp fallback link
    const cleanWhatsappMsg = encodeURIComponent(
      `Hello EPIC STUDIO Talent Team, I have submitted my application for the ${body.role} position (Ref: ${token}). Candidate: ${body.name} (${body.phone}).`
    );
    const whatsappUrls = TARGET_WHATSAPP_NUMBERS.map(
      (num) => `https://wa.me/${num}?text=${cleanWhatsappMsg}`
    );

    return NextResponse.json({
      success: true,
      token,
      name: body.name,
      email: body.email,
      role: body.role,
      emailSent,
      emailError,
      whatsappUrls,
      timestamp,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[Join API] Internal server error:", message);
    return NextResponse.json(
      { error: "Failed to process career application. Please try again." },
      { status: 500 }
    );
  }
}
