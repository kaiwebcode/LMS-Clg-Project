import {
  BookOpen,
  Users,
  Trophy,
  BarChart3,
  Video,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Rich Course Library",
    desc: "Access 1,200+ expert-led courses across tech, business, design, and more.",
  },
  {
    icon: Video,
    title: "Live Classes",
    desc: "Join interactive sessions with industry experts and ask questions in real time.",
  },
  {
    icon: BarChart3,
    title: "Smart Progress Tracking",
    desc: "AI-powered analytics that adapt to your learning style and pace.",
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    desc: "Study groups, peer reviews, and community discussions built right in.",
  },
  {
    icon: Trophy,
    title: "Verified Certificates",
    desc: "Earn industry-recognized certificates to showcase your achievements.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Access",
    desc: "Once enrolled, learn at your own pace — forever, on any device.",
  },
];

export function About() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      
      {/* 🌌 BACKGROUND THEME */}
      {/* <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/20 blur-[120px] rounded-full" />
      </div> */}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* 🔥 HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-4xl font-bold uppercase  text-primary">
            About Alpha-Lms
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl font-bold leading-tight">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
              learn, teach & grow
            </span>
          </h2>

          <p className="mt-5 text-lg text-muted-foreground">
            A modern learning platform built for the way people actually learn —
            flexible, social, and powered by intelligent tools.
          </p>
        </div>

        {/* 🚀 CARDS */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-primary/40 via-purple-500/30 to-transparent hover:from-primary hover:via-purple-500 transition-all duration-500"
            >
              {/* CARD */}
              <div className="relative h-full rounded-2xl bg-background/70 backdrop-blur-xl border border-white/10 p-6 transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                
                {/* ICON */}
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <f.icon className="h-6 w-6" />
                </div>

                {/* TITLE */}
                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  {f.title}
                </h3>

                {/* DESC */}
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>

                {/* ✨ HOVER GLOW */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}