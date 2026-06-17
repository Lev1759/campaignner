import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ROLE_LABELS: Record<string, string> = {
  voter:     "Voter / Concerned Citizen",
  candidate: "Political Candidate / Party Rep",
  civil:     "Civil Society / NGO",
  media:     "Journalist / Media Platform",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, role } = body;

    if (!email || !role) {
      return NextResponse.json(
        { error: "Email and role are required." },
        { status: 400 }
      );
    }

    const firstName = fullName?.split(" ")[0] || "there";
    const roleLabel = ROLE_LABELS[role] ?? role;

    // ── 1. Confirmation email to the user ──────────────────────────────────

    await resend.emails.send({
      from: "Campaignner <hello@Campaignner.com>",
      to: email,
      subject: "You're on the Campaignner waitlist ✓",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Waitlist Confirmation</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;border:1px solid #e2e8f0;overflow:hidden;max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#0a0f1e;padding:32px 40px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#1a54cb;border-radius:10px;width:36px;height:36px;text-align:center;vertical-align:middle;">
                    <span style="color:#fff;font-weight:700;font-size:16px;line-height:36px;">B</span>
                  </td>
                  <td style="padding-left:12px;">
                    <span style="color:#ffffff;font-weight:600;font-size:16px;">Campaignner</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#0f172a;line-height:1.2;">
                You're on the list, ${firstName}. 🎉
              </h1>
              <p style="margin:0 0 24px;font-size:15px;color:#64748b;line-height:1.6;">
                Thanks for joining the Campaignner waitlist as a
                <strong style="color:#0f172a;">&nbsp;${roleLabel}</strong>.
                You're among the first to experience a new standard in civic engagement.
              </p>

              <!-- What's next card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f6ff;border-radius:14px;border:1px solid #dbeafe;margin-bottom:28px;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#1a54cb;">
                      What happens next
                    </p>
                    <table cellpadding="0" cellspacing="0" width="100%">
                      ${[
                        ["🔐", "Identity verification opens in the next phase."],
                        ["📬", "You'll receive an early-access invite code by email."],
                        ["🗳️", "Be among the first to explore the Candidate Hub."],
                      ].map(([emoji, text]) => `
                        <tr>
                          <td style="vertical-align:top;padding-bottom:10px;width:28px;">
                            <span style="font-size:16px;">${emoji}</span>
                          </td>
                          <td style="padding-left:10px;padding-bottom:10px;">
                            <span style="font-size:13px;color:#334155;line-height:1.5;">${text}</span>
                          </td>
                        </tr>
                      `).join("")}
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 28px;font-size:14px;color:#94a3b8;line-height:1.6;">
                We won't flood your inbox — only meaningful updates about the platform launch, feature previews, and your exclusive invite.
              </p>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#1a54cb;border-radius:14px;">
                    <a href="https://Campaignner.com" style="display:inline-block;padding:14px 28px;color:#ffffff;font-weight:600;font-size:14px;text-decoration:none;letter-spacing:0.01em;">
                      Visit Campaignner →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #f1f5f9;padding:20px 40px;">
              <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.6;">
                You received this email because you joined the waitlist at Campaignner.com.
                This platform is independent of INEC and does not represent any political party.
                <br/>
                <a href="https://Campaignner.com/unsubscribe" style="color:#94a3b8;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    // ── 2. Internal notification to team ──────────────────────────────────

    await resend.emails.send({
      from: "Campaignner <hello@Campaignner.com>",
      to: process.env.NOTIFY_EMAIL ?? "support@Campaignner.com",
      subject: `New waitlist signup — ${roleLabel}`,
      html: `
        <p><strong>Name:</strong> ${fullName || "—"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> ${roleLabel}</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[waitlist] error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}