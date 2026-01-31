import { auth } from "@/lib/auth";
import aj from "@/lib/arcjet";
import ip from "@arcjet/ip";
import {
  detectBot,
  protectSignup,
  slidingWindow,
  type ArcjetDecision,
} from "@arcjet/next";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";

/* ---------------- RULES ---------------- */

const signupRule = protectSignup({
  email: {
    mode: "LIVE",
    deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
  },
  bots: {
    mode: "LIVE",
    allow: [],
  },
  rateLimit: {
    mode: "LIVE",
    interval: "2m",
    max: 5,
  },
});

const botRule = detectBot({
  mode: "LIVE",
  allow: [],
});

const rateLimitRule = slidingWindow({
  mode: "LIVE",
  interval: "2m",
  max: 5,
});

/* ---------------- PROTECT ---------------- */

async function protect(req: NextRequest): Promise<ArcjetDecision> {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  const fingerprint = session?.user?.id || ip(req) || "127.0.0.1";

  // SIGN-UP ROUTE
  if (req.nextUrl.pathname.startsWith("/api/auth/sign-up")) {
    const body = await req.clone().json();

    if (typeof body.email === "string") {
      return aj
        .withRule(signupRule)
        .protect(req, { fingerprint, email: body.email });
    }
  }

  // DEFAULT PROTECTION
  return aj
    .withRule(botRule)
    .withRule(rateLimitRule)
    .protect(req, { fingerprint });
}

/* ---------------- BETTER AUTH ---------------- */

const authHandlers = toNextJsHandler(auth.handler);
export const GET = authHandlers.GET;

/* ---------------- POST ---------------- */

export const POST = async (req: NextRequest) => {
  const decision = await protect(req);

  console.log("Arcjet Decision:", decision)

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return new Response(null, { status: 429 });
    }

    if (decision.reason.isEmail()) {
      let message = "Invalid email";

      if (decision.reason.emailTypes.includes("INVALID")) {
        message = "Email format is invalid.";
      } else if (decision.reason.emailTypes.includes("DISPOSABLE")) {
        message = "Disposable email addresses are not allowed.";
      } else if (decision.reason.emailTypes.includes("NO_MX_RECORDS")) {
        message = "Email domain has no MX records.";
      }

      return Response.json({ message }, { status: 400 });
    }

    return new Response(null, { status: 403 });
  }

  return authHandlers.POST(req);
};
