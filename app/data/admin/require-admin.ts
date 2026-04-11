import "server-only";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const requireAdmin = cache(async () => {
  // Check if user is authenticated and has admin role
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login"); // Not authenticated, redirect to login
  }

  if (session.user.role !== "admin") {
    return redirect("/not-admin"); // Not an admin, redirect to home
  }

  return session; // User is an admin, return session
});
