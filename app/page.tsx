"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
// import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {

  const router = useRouter();

  const {
    data: session,
    // isPending, //loading state
    // error, //error object
    // refetch //refetch the session
  } = authClient.useSession();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // redirect to login page
          toast.success('Logout Successfully')
        },
      },
    });
  }

  return (
    <div>
      <h1>Hello World!!</h1>
      <ModeToggle />

      {session ? (
        <div>
          <p>{session.user.name}</p>
          <Button onClick={signOut} variant="outline">Logout</Button> 
        </div>
      ) : (
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
}
