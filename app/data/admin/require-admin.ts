import "server-only";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAdmin() {
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

}
