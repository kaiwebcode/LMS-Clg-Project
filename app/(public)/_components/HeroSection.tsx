"use client";

import { useEffect, useRef } from "react";

export function HeroSection() {
  const glowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const size = 340;

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
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl border bg-linear-to-br from-background via-muted/40 to-background p-8 md:p-10"
    >
      {/* 🔥 Cursor Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-0 left-0 w-85 h-85 
        bg-[radial-gradient(circle,rgba(14,165,233,0.35)_0%,rgba(14,165,233,0.15)_40%,transparent_70%)]
        blur-3xl rounded-full transition-transform duration-300 ease-out"
      />

      {/* Static Glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 blur-3xl rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          Explore Courses
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed">
          Discover high-quality courses designed to help you grow your skills 
          and build your future. Learn from real-world content and start your 
          journey today.
        </p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
            New Courses Added Weekly
          </span>
        </div>
      </div>
    </div>
  );
}