"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useState, useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function LoginForm() {
  const [agreed, setAgreed] = useState(false);
  const [githubPending, startGithubTransition] = useTransition();
  const [googlePending, startGoogleTransition] = useTransition();

  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Github, you will be redirected...");
          },
          onError: () => {
            toast.error("Internal Server Error");
          },
        },
      });
    });
  }

  async function signInWithGoogle() {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Google, you will be redirected...");
          },
          onError: () => {
            toast.error("Internal Server Error");
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome Back!!</CardTitle>
        <CardDescription>
          Login with your Github or Email Account
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col  gap-4">
        <Button
          onClick={signInWithGithub}
          disabled={githubPending}
          className="w-full"
          variant="outline"
        >
          {githubPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <FaGithub size={4} />
              Sign up with your Github account!
            </>
          )}
        </Button>

        <Button
          onClick={signInWithGoogle}
          disabled={googlePending}
          className="w-full"
          variant="outline"
        >
          {googlePending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <FaGoogle size={4} />
              Sign up with your Google Account
            </>
          )}
        </Button>

        <div
          className="relative mt-2 text-center text-sm after:absolute after:inset-0  after:top-1/2 after:z-0 after:flex after:items-center
        after:border-t after:border-border"
        >
          <span className="relative z-10 px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <div className="grid grid-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" placeholder="Enter your email.." />

            <Button disabled={!agreed} className="w-full">
              Continue with Email
            </Button>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <Checkbox
            id="terms"
            checked={agreed}
            onCheckedChange={(v) => setAgreed(Boolean(v))}
            className="cursor-pointer"
          />
          <Label htmlFor="terms" className="leading-snug text-muted-foreground">
            I agree to the{" "}
            <span className="underline hover:text-primary cursor-pointer">
              Terms
            </span>{" "}
            and{" "}
            <span className="underline hover:text-primary cursor-pointer">
              Privacy Policy
            </span>
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}
