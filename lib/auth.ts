import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins";
import nodemailer from "nodemailer";

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
            from: `"Kaif Auth" <${env.GMAIL_USER}>`,
            to: email,
            subject: "Kaif - Verify your email",
            html: `
              <div style="font-family: Arial, sans-serif">
                <h2>Email Verification</h2>
                <p>Your OTP code is:</p>
                <h1 style="letter-spacing: 4px">${otp}</h1>
                <p>This code expires shortly.</p>
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
  ],
});
