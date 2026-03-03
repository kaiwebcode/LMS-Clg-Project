"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { GiBookCover } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { SiSimpleanalytics } from "react-icons/si";
import { BsFillPeopleFill } from "react-icons/bs";

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}

const features: Feature[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Expert-crafted courses designed to help you master real-world skills.",
    icon: <GiBookCover />,
  },
  {
    title: "Interactive Learning",
    description: "Engage with quizzes, challenges, and hands-on assignments.",
    icon: <IoGameController />,
  },
  {
    title: "Progress Tracking",
    description:
      "Visual dashboards and analytics to track your learning journey.",
    icon: <SiSimpleanalytics />,
  },
  {
    title: "Community Support",
    description:
      "Learn together with instructors and peers in an active community.",
    icon: <BsFillPeopleFill />,
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* 🔮 Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-100 w-100 -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-75 w-75 rounded-full bg-purple-500/20 blur-[120px]" />
      </div>

      {/* 🚀 HERO SECTION */}
      <section className="container py-28 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="px-5 py-1">
            🚀 Next-Gen Learning Platform
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          Learn Smarter. <br />
          <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Grow Faster with Alpha LMS
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto max-w-2xl text-muted-foreground md:text-xl"
        >
          A modern Learning Management System built for students, instructors,
          and institutions — fast, secure & beautiful.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link href="/courses" className={buttonVariants({ size: "lg" })}>
            Browse Courses
          </Link>
          <Link
            href="/login"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            Get Started
          </Link>
        </motion.div>
      </section>

      {/* 🌟 FEATURES SECTION */}
      {/* 🌟 FEATURES SECTION */}
      <section className="container py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.12 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="relative group h-full rounded-2xl p-px bg-linear-to-br from-primary/40 via-purple-500/30 to-transparent hover:from-primary hover:via-purple-500">
                <Card className="relative h-full rounded-2xl bg-background/70 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                  {/* ICON */}
                  <CardHeader className="pb-2">
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary text-3xl shadow-inner"
                    >
                      {feature.icon}
                    </motion.div>
                    <CardTitle className="text-lg font-semibold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>

                  {/* CONTENT */}
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>

                  {/* HOVER GLOW */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-br from-primary/15 via-transparent to-purple-500/20" />
                </Card>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
