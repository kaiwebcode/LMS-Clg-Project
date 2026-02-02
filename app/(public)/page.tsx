"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { GiBookCover } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { SiSimpleanalytics } from "react-icons/si";
import { BsFillPeopleFill } from "react-icons/bs";
import { ReactNode } from "react";

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}

const features: Feature[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Access a wide range of carefully curated courses designed by industry experts.",
    icon: <GiBookCover />,
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with interactive content, quizzes, and assignments.",
    icon: <IoGameController />,
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your progress with detailed analytics and dashboards.",
    icon: <SiSimpleanalytics />,
  },
  {
    title: "Community Support",
    description:
      "Collaborate with learners and instructors in a vibrant community.",
    icon: <BsFillPeopleFill />,
  },
];

export default function Home() {
  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="outline">The Future of Online Education</Badge>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Elevate your learning experience
          </h1>

          <p className="max-w-2xl text-muted-foreground md:text-xl">
            Discover a new way to learn with our modern LMS platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/courses" className={buttonVariants({ size: "lg" })}>
              Explore Courses
            </Link>

            <Link
              href="/login"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
