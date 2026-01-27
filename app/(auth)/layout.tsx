import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-svh flex items-center justify-center bg-linear-to-br from-background to-muted px-4">
      
      {/* Back button */}
      <Link href="/" className="absolute left-4 top-4">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="size-4" />
          Back
        </Button>
      </Link>

      {/* Auth container */}
      <div className="w-max rounded-2xl border bg-background p-5 shadow-xl">
        
        {/* Logo / Title */}
        <Link
          href="/"
          className="mb-6 flex justify-center text-3xl font-bold tracking-tight"
        >
          Kai-Regal
        </Link>

        {children}

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground leading-relaxed">
          By continuing, you agree to our{" "}
          <span className="cursor-pointer underline underline-offset-4 hover:text-primary">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="cursor-pointer underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
}
