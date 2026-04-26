"use client";

import { useState, useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Aarav Sharma",
    role: "Software Engineer",
    text: "Alpha-Lms completely changed how I upskill. The interactive courses and live mentorship helped me land my dream job at a top tech firm.",
    avatar: "AS",
  },
  {
    name: "Priya Patel",
    role: "UX Designer",
    text: "The quality of courses is unmatched. Beautiful UI, expert instructors, and the certificate actually got noticed by recruiters!",
    avatar: "PP",
  },
  {
    name: "Marcus Johnson",
    role: "Marketing Lead",
    text: "I love how I can learn at my own pace. The progress tracking keeps me motivated and the community is incredibly supportive.",
    avatar: "MJ",
  },
  {
    name: "Sofia Rodriguez",
    role: "Student",
    text: "As a college student, Alpha-Lms gives me skills my university doesn't. Affordable, modern, and genuinely fun to use.",
    avatar: "SR",
  },
  {
    name: "Liam Chen",
    role: "Product Manager",
    text: "Our entire team uses Alpha-Lms for continuous learning. The team analytics dashboard is a game-changer.",
    avatar: "LC",
  },
  {
    name: "Emma Williams",
    role: "Freelance Developer",
    text: "Best investment I've made in my career. The instructors are world-class and the platform feels premium throughout.",
    avatar: "EW",
  },
];

export function Reviews() {
  const [hovered, setHovered] = useState<number | null>(null);

  const glowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const size = 380;

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
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* 🔥 CURSOR GLOW */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-0 left-0 w-[380px] h-[380px] 
        bg-[radial-gradient(circle,rgba(14,165,233,0.25)_0%,rgba(99,102,241,0.2)_40%,transparent_70%)]
        blur-3xl rounded-full transition-transform duration-300 ease-out"
      />

      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-[140px] rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* 🔥 HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold">
            Trusted by thousands of{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
              learners
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            feedback from learners growing with Alpha-Lms.
          </p>
        </div>

        {/* 🚀 GRID */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative group"
            >
              {/* 🌟 SPOTLIGHT GLOW */}
              <div
                className={`absolute inset-0 rounded-2xl transition duration-500 blur-2xl ${
                  hovered === i
                    ? "bg-linear-to-r from-primary/30 via-purple-500/50 to-blue-500/50 opacity-100"
                    : "opacity-0"
                }`}
              />

              {/* 💎 CARD */}
              <div
                className={`relative rounded-2xl border border-white/10 bg-background/70 backdrop-blur-xl p-6 transition-all duration-500 ${
                  hovered === i
                    ? "scale-[1.04] shadow-2xl"
                    : "scale-100 opacity-90"
                }`}
              >
                <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/30" />

                <div className="flex gap-1 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-yellow-400" />
                  ))}
                </div>

                <p className="mt-4 text-sm leading-relaxed">“{r.text}”</p>

                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-primary to-purple-500 text-white text-sm font-semibold">
                    {r.avatar}
                  </div>

                  <div>
                    <div className="text-sm font-semibold">{r.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {r.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}