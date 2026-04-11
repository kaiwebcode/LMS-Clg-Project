import "server-only";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const requireUser = cache(async () => {
  // Implement your logic to check if the user is authenticated
  const session = await auth.api.getSession({
    // Include the session cookie in the request
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  return session.user;
});
