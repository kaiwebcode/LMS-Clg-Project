// import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins";
import nodemailer from "nodemailer";
import { admin } from "better-auth/plugins";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // 🔥 CHANGE (not 465)
  secure: false, // 🔥 IMPORTANT
  requireTLS: true,
  auth: {
    user: env.GMAIL_USER,
    pass: env.GMAIL_APP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // 🔥 FIX self-signed cert issue
  },
});
// 🔥 VERIFY SMTP
transporter.verify((error) => {
  if (error) {
    console.error("❌ SMTP CONNECTION FAILED:", error);
  } else {
    console.log("✅ SMTP READY");
  }
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  socialProviders: {
    google: {
      clientId: env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
    },
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        console.log("📨 Sending OTP to:", email, "OTP:", otp);

        try {
          await transporter.sendMail({
            from: `"Alpha-Lms" <${env.GMAIL_USER}>`,
            to: email,
            subject: "Alpha-Lms - Verify your email",
            html: `
  <div style="margin:0;padding:0;background:#0f172a;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:40px 0;">
      <tr>
        <td align="center">

          <!-- Main Card -->
          <table width="420" cellpadding="0" cellspacing="0" style="
            background: linear-gradient(135deg, #1e293b, #020617);
            border-radius:16px;
            padding:30px;
            box-shadow:0 10px 40px rgba(0,0,0,0.6);
            color:#e2e8f0;
          ">

            <!-- Logo / Title -->
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h1 style="
                  margin:0;
                  font-size:22px;
                  font-weight:700;
                  color:#38bdf8;
                  letter-spacing:1px;
                ">
                  Alpha-LMS
                </h1>
                <p style="margin:5px 0 0;font-size:13px;color:#94a3b8;">
                  Secure Email Verification
                </p>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td>
                <hr style="border:none;border-top:1px solid #1e293b;margin:20px 0;">
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="text-align:center;">
                <h2 style="margin:0 0 10px;font-size:20px;color:#f1f5f9;">
                  Verify Your Email
                </h2>
                <p style="font-size:14px;color:#94a3b8;margin-bottom:25px;">
                  Use the OTP below to complete your login. This code is valid for a short time.
                </p>
              </td>
            </tr>

            <!-- OTP Box -->
            <tr>
              <td align="center">
                <div style="
                  display:inline-block;
                  background:#020617;
                  padding:16px 30px;
                  border-radius:10px;
                  border:1px solid #38bdf8;
                  letter-spacing:8px;
                  font-size:28px;
                  font-weight:700;
                  color:#38bdf8;
                  box-shadow:0 0 20px rgba(56,189,248,0.3);
                ">
                  ${otp}
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="text-align:center;padding-top:30px;">
                <p style="font-size:12px;color:#64748b;margin:0;">
                  If you didn’t request this, you can safely ignore this email.
                </p>
              </td>
            </tr>

          </table>

          <!-- Bottom Branding -->
          <p style="margin-top:20px;font-size:12px;color:#64748b;">
            © ${new Date().getFullYear()} Alpha-LMS. All rights reserved.
          </p>

        </td>
      </tr>
    </table>
  </div>
`,
          });

          console.log("✅ OTP EMAIL SENT");
        } catch (err) {
          console.error("❌ OTP EMAIL ERROR:", err);
          throw err;
        }
      },
    }),

    admin(),
  ],
});
