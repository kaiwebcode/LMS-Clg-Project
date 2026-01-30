import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { resend } from "./resend";
import { emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
  //...
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  socialProviders: {
    google: {
      clientId: env.AUTH_GOOGLE_CLIENT_ID || "",
      clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET || "",
    },

    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID || "",
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET || "",
    },
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        try {
          await resend.emails.send({
            from: "onboarding@resend.dev",
            to: [email],
            subject: "Kaif - Verify your email",
            html: `<p>Your OTP is <strong>${otp}</strong></p>`,
          });
        } catch (err) {
          console.error("EMAIL OTP ERROR:", err);
          throw err; // IMPORTANT
        }
      },
    }),
  ],
});
