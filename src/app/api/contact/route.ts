import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";
import { readStore, writeStore } from "@/lib/store";
import { persistFormSubmission } from "@/lib/submissions";

export const runtime = "nodejs";

const DEFAULT_TARGET_EMAILS = [
  "subhamdasholycross2023@gmail.com",
  "epicstudiohelpdesk@gmail.com",
  "rajeshroybusiness1997@gmail.com"
];

const TARGET_EMAILS = process.env.NOTIFICATION_EMAILS
  ? process.env.NOTIFICATION_EMAILS.split(",").map((e) => e.trim()).filter(Boolean)
  : DEFAULT_TARGET_EMAILS;

const TARGET_WHATSAPP_NUMBERS = [
  "916291773811",
  "917980595630"
];

interface ContactPayload {
  type: "inquiry" | "call";
  token?: string;
  name: string;
  email: string;
  phone?: string;
  // Inquiry fields
  discipline?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  // Schedule Call fields
  date?: string;
  timeSlot?: string;
  timezone?: string;
  platform?: string;
  callTopic?: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json();

    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required fields." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium"
    });

    const isCall = body.type === "call";
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || undefined;
    const clientUserAgent = request.headers.get("user-agent") || undefined;

    // Zero-data-loss dual persistence (Prisma SQLite DB primary + local redundant backup)
    const { token, persistedToDb } = await persistFormSubmission({
      token: body.token,
      type: body.type,
      name: body.name,
      email: body.email,
      phone: body.phone,
      discipline: body.discipline,
      budget: body.budget,
      timeline: body.timeline,
      message: body.message,
      date: body.date,
      timeSlot: body.timeSlot,
      timezone: body.timezone,
      platform: body.platform,
      callTopic: body.callTopic,
      ip: clientIp,
      userAgent: clientUserAgent,
    });

    // 1. Prepare Text & Subject
    const subject = isCall
      ? `[EPIC STUDIO] Consultation Scheduled: ${body.name} (${body.date} @ ${body.timeSlot}) [${token}]`
      : `[EPIC STUDIO] New Project Inquiry: ${body.name} — ${body.discipline || "Creative Tech"} [${token}]`;

    const textSummary = isCall
      ? `================================================
EPIC STUDIO — NEW CONSULTATION SCHEDULED
================================================
Reference Token: ${token}
Timestamp: ${timestamp} IST

CLIENT DETAILS:
- Name: ${body.name}
- Email: ${body.email}
- Format: ${body.platform || "Google Meet"}
- Scheduled Date: ${body.date || "Not specified"}
- Time Slot: ${body.timeSlot || "Not specified"} (${body.timezone || "IST (UTC+5:30) — India"})
- Topic: ${body.callTopic || "General Technical Consultation"}
================================================`
      : `================================================
EPIC STUDIO — NEW PROJECT INQUIRY
================================================
Reference Token: ${token}
Timestamp: ${timestamp} IST

CLIENT DETAILS:
- Name: ${body.name}
- Email: ${body.email}
- Phone: ${body.phone || "Not provided"}

PROJECT PARAMETERS:
- Primary Discipline: ${body.discipline || "General Consultation"}
- Target Budget: ${body.budget || "Not specified"}
- Target Timeline: ${body.timeline || "Not specified"}

PROJECT BRIEF:
${body.message || "No additional brief description provided."}
================================================`;

    // 2. Prepare HTML Email Body (Executive Branded Template)
    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #060913; color: #f1f5f9;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; background: #0b1120; border-radius: 14px; overflow: hidden; border: 1px solid #1e293b;">
    <!-- Header -->
    <tr>
      <td style="padding: 28px 32px; background: linear-gradient(135deg, #0534f2 0%, #082fe6 60%, #031c9e 100%);">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>
              <span style="font-size: 11px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: #c9ff17; display: block; margin-bottom: 6px;">
                ${isCall ? "CONSULTATION DISPATCH" : "NEW PROJECT LEAD"}
              </span>
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">
                ${isCall ? "30-Min Technical Briefing" : "Direct Project Inquiry"}
              </h1>
            </td>
            <td align="right" valign="top">
              <span style="font-family: monospace; font-size: 12px; background: rgba(0, 0, 0, 0.4); color: #ffffff; padding: 6px 12px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.2);">
                ${token}
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Content -->
    <tr>
      <td style="padding: 32px;">
        <h2 style="font-size: 15px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 16px 0;">
          Client Information
        </h2>

        <table width="100%" border="0" cellspacing="0" cellpadding="10" style="background: #111827; border-radius: 8px; margin-bottom: 24px; border: 1px solid #1f2937;">
          <tr>
            <td width="35%" style="color: #64748b; font-size: 13px; font-weight: 600;">Full Name:</td>
            <td style="color: #ffffff; font-size: 14px; font-weight: 700;">${body.name}</td>
          </tr>
          <tr>
            <td style="color: #64748b; font-size: 13px; font-weight: 600;">Email Address:</td>
            <td style="color: #38bdf8; font-size: 14px; font-weight: 600;"><a href="mailto:${body.email}" style="color: #38bdf8; text-decoration: none;">${body.email}</a></td>
          </tr>
          ${
            body.phone
              ? `<tr>
            <td style="color: #64748b; font-size: 13px; font-weight: 600;">Phone / WhatsApp:</td>
            <td style="color: #ffffff; font-size: 14px; font-weight: 600;">${body.phone}</td>
          </tr>`
              : ""
          }
        </table>

        <h2 style="font-size: 15px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 16px 0;">
          ${isCall ? "Consultation Details" : "Project Requirements"}
        </h2>

        <table width="100%" border="0" cellspacing="0" cellpadding="10" style="background: #111827; border-radius: 8px; margin-bottom: 24px; border: 1px solid #1f2937;">
          ${
            isCall
              ? `
          <tr>
            <td width="35%" style="color: #64748b; font-size: 13px; font-weight: 600;">Date & Time:</td>
            <td style="color: #c9ff17; font-size: 14px; font-weight: 700;">${body.date || "N/A"} at ${body.timeSlot || "N/A"}</td>
          </tr>
          <tr>
            <td style="color: #64748b; font-size: 13px; font-weight: 600;">Timezone:</td>
            <td style="color: #ffffff; font-size: 13px;">${body.timezone || "IST"}</td>
          </tr>
          <tr>
            <td style="color: #64748b; font-size: 13px; font-weight: 600;">Meeting Platform:</td>
            <td style="color: #ffffff; font-size: 13px;">${body.platform?.toUpperCase() || "GOOGLE MEET"}</td>
          </tr>
          <tr>
            <td style="color: #64748b; font-size: 13px; font-weight: 600;">Topic:</td>
            <td style="color: #f8fafc; font-size: 13px;">${body.callTopic || "General Briefing"}</td>
          </tr>
          `
              : `
          <tr>
            <td width="35%" style="color: #64748b; font-size: 13px; font-weight: 600;">Primary Discipline:</td>
            <td style="color: #c9ff17; font-size: 14px; font-weight: 700;">${body.discipline || "General"}</td>
          </tr>
          <tr>
            <td style="color: #64748b; font-size: 13px; font-weight: 600;">Target Budget:</td>
            <td style="color: #ffffff; font-size: 14px; font-weight: 700;">${body.budget || "Flexible"}</td>
          </tr>
          <tr>
            <td style="color: #64748b; font-size: 13px; font-weight: 600;">Target Timeline:</td>
            <td style="color: #ffffff; font-size: 14px; font-weight: 700;">${body.timeline || "Flexible"}</td>
          </tr>
          `
          }
        </table>

        ${
          !isCall && body.message
            ? `
        <h2 style="font-size: 15px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 16px 0;">
          Project Brief
        </h2>
        <div style="background: #111827; border: 1px solid #1f2937; border-radius: 8px; padding: 18px; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">${body.message}</div>
        `
            : ""
        }

        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #1f2937; font-size: 12px; color: #64748b; text-align: center;">
          Received on ${timestamp} IST · Routed to Studio Leadership
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    // 3. Prepare WhatsApp Message
    const whatsappText = isCall
      ? `*EPIC STUDIO — CONSULTATION BOOKED*\n\n*Ref:* ${token}\n*Client:* ${body.name}\n*Email:* ${body.email}\n*Platform:* ${body.platform || "Google Meet"}\n*Date & Time:* ${body.date} at ${body.timeSlot} (${body.timezone || "IST"})\n*Topic:* ${body.callTopic || "General Technical Consultation"}`
      : `*EPIC STUDIO — NEW PROJECT INQUIRY*\n\n*Ref:* ${token}\n*Client:* ${body.name}\n*Email:* ${body.email}\n*Phone:* ${body.phone || "Not provided"}\n*Discipline:* ${body.discipline || "General"}\n*Budget:* ${body.budget || "Flexible"}\n*Timeline:* ${body.timeline || "Flexible"}\n\n*Brief:* ${body.message || "No brief details provided"}`;

    const whatsappUrls = TARGET_WHATSAPP_NUMBERS.map(
      (phone) =>
        `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
          whatsappText
        )}`
    );

    const mailtoUrl = `mailto:${TARGET_EMAILS.join(",")}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(textSummary)}`;

    // 4. Server-Side Email Dispatch via SMTP (if configured)
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
            pass: smtpPass
          }
        });

        await transporter.sendMail({
          from: `"EPIC STUDIO Notifications" <${smtpUser}>`,
          to: TARGET_EMAILS.join(", "),
          replyTo: body.email,
          subject,
          text: textSummary,
          html: htmlBody
        });

        emailSent = true;
        console.log(`[Contact API] ✓ Email dispatched successfully to: ${TARGET_EMAILS.join(", ")}`);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("[Contact API] SMTP error:", message);
        emailError = message;
      }
    } else {
      console.log(
        `[Contact API] Form submitted by ${body.name} (${body.email}) [${token}]. (Configure SMTP_USER & SMTP_PASS in .env.local for automatic server-side email dispatch)`
      );
    }

    // 5. Automated Server-Side WhatsApp Push (Dispatches to 6291773811 & 7980595630 silently without client intervention)
    let whatsappAutoSent = false;
    let whatsappAutoError: string | null = null;

    // A. Webhook Gateway (e.g. Zapier, Make.com, GreenAPI, UltraMsg, Whapi)
    const waWebhook = process.env.WHATSAPP_WEBHOOK_URL;
    if (waWebhook) {
      try {
        await fetch(waWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipients: TARGET_WHATSAPP_NUMBERS,
            message: whatsappText,
            token,
            lead: body
          })
        });
        whatsappAutoSent = true;
        console.log(`[Contact API] ✓ Automated WhatsApp webhook dispatched to: ${TARGET_WHATSAPP_NUMBERS.join(", ")}`);
      } catch (waErr: unknown) {
        console.error("[Contact API] WhatsApp webhook error:", waErr);
        whatsappAutoError = waErr instanceof Error ? waErr.message : String(waErr);
      }
    }

    // B. Direct CallMeBot WhatsApp API Gateway (Free & zero-setup per number)
    const callMeBotKey1 = process.env.CALLMEBOT_APIKEY_1 || process.env.CALLMEBOT_KEY_6291773811;
    const callMeBotKey2 = process.env.CALLMEBOT_APIKEY_2 || process.env.CALLMEBOT_KEY_7980595630;
    if (callMeBotKey1 || callMeBotKey2) {
      try {
        const promises = [];
        if (callMeBotKey1) {
          promises.push(
            fetch(
              `https://api.callmebot.com/whatsapp.php?phone=916291773811&text=${encodeURIComponent(
                whatsappText
              )}&apikey=${callMeBotKey1}`
            )
          );
        }
        if (callMeBotKey2) {
          promises.push(
            fetch(
              `https://api.callmebot.com/whatsapp.php?phone=917980595630&text=${encodeURIComponent(
                whatsappText
              )}&apikey=${callMeBotKey2}`
            )
          );
        }
        await Promise.allSettled(promises);
        whatsappAutoSent = true;
        console.log(`[Contact API] ✓ Automated WhatsApp alerts dispatched silently to studio numbers.`);
      } catch (cmbErr: unknown) {
        console.error("[Contact API] CallMeBot error:", cmbErr);
      }
    }

    return NextResponse.json({
      success: true,
      token,
      emailSent,
      emailError,
      whatsappAutoSent,
      whatsappAutoError,
      recipients: TARGET_EMAILS,
      whatsappNumbers: TARGET_WHATSAPP_NUMBERS,
      summary: isCall
        ? `${body.date} at ${body.timeSlot} (${body.timezone || "IST"}) via ${(body.platform || "meet").toUpperCase()}`
        : `${body.discipline || "General"} · ${body.budget || "Budget Flexible"} · ${body.timeline || "Timeline Flexible"}`
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("[Contact API] POST error:", message);
    return NextResponse.json(
      { error: "Failed to process contact submission: " + message },
      { status: 500 }
    );
  }
}
