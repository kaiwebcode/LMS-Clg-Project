"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import heroImg from "../../../public/hero-elearning.jpg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const size = 400;

      glowRef.current.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px)`;
    };

    const container = containerRef.current;

    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative overflow-hidden bg-gradient-soft pb-16 lg:pb-24"
    >
      {/* 🔥 CURSOR GLOW (MAIN MAGIC) */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-0 left-0 w-[400px] h-[400px] 
        bg-[radial-gradient(circle,rgba(14,165,233,0.35)_0%,rgba(99,102,241,0.25)_40%,transparent_70%)]
        blur-3xl rounded-full transition-transform duration-300 ease-out"
      />

      {/* 🔮 Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-100 w-100 -translate-x-1/2 rounded-full bg-primary/40 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-75 w-75 rounded-full bg-purple-500/40 blur-[120px]" />
        <div className="absolute left-0 bottom-0 h-75 w-75 rounded-full bg-blue-500/40 blur-[120px]" />
      </div>

      {/* 🚀 Container */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-90px)] flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* 🔥 LEFT CONTENT */}
          <div className="flex flex-col justify-center animate-fade-up">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              New: AI-powered course recommendations
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
              Learn without limits. <br />
              <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Grow without bounds.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              LearnSphere is the all-in-one learning management system that
              helps students, educators, and teams master new skills.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/login"
                className={buttonVariants({ variant: "ghost" })}
              >
                <Button size="lg" className="shadow-xl gap-2 cursor-pointer">
                  Start Learning
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

            
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { v: "50K+", l: "Learners" },
                { v: "1,200+", l: "Courses" },
                { v: "4.9★", l: "Rating" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl font-bold">{s.v}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 🎨 RIGHT IMAGE */}
          <div className="relative flex justify-center animate-fade-up [animation-delay:200ms]">
            
            {/* Glow Behind Image */}
            <div className="absolute inset-0 -z-10 rounded-3xl bg-linear-to-tr from-primary/30 to-purple-500/30 blur-3xl" />

            <Image
              src={heroImg.src}
              width={550}
              height={400}
              alt="Students learning"
              className="w-full max-w-130 rounded-3xl shadow-3xl hover:scale-[1.02] transition duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}