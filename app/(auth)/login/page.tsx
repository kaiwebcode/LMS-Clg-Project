"use client"

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
import { GithubIcon } from "lucide-react";
import { useState } from "react";

/**
 * Defaults page of the application
 * @returns 
 */

export default function LoginPage() {
  const [agreed, setAgreed] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome Back!!</CardTitle>
        <CardDescription>
          Login with your Github account Email Account
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col  gap-4">
        <Button className="w-full" variant="outline">
          <GithubIcon size={4} />
          Sign up with your Github account!
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
