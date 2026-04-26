import { Button } from "@/components/ui/button";
import { ArrowLeft, GraduationCap } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-black">
      {/* 🌈 Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl top-[-100px] left-[-100px] animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-blue-500/30 rounded-full blur-3xl bottom-[-100px] right-[-100px] animate-pulse" />
      </div>

      {/* 🔙 Back Button */}
      <Link href="/" className="absolute left-4 top-4">
        <Button
          variant="outline"
          className="gap-2 backdrop-blur-md bg-white/10 border-white/20 text-white hover:bg-white/20 transition cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>
      </Link>

      {/* 🧊 Glass Card */}
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
        {/* 🔥 Logo */}
        <Link
          href="/"
          className="mb-6 flex justify-center text-3xl font-bold tracking-tight text-white gap-1"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero shadow-card">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          Alpha-Lms
        </Link>

        {children}
      </div>
    </div>
  );
}
