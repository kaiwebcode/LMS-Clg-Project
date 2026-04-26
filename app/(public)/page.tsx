"use client";

import { Hero } from "./_components/Hero";
import { About } from "./_components/About";
import { Reviews } from "./_components/Reviews";

// interface Feature {
//   title: string;
//   description: string;
//   icon: ReactNode;
// }

// const features: Feature[] = [
//   {
//     title: "Comprehensive Courses",
//     description:
//       "Expert-crafted courses designed to help you master real-world skills.",
//     icon: <GiBookCover />,
//   },
//   {
//     title: "Interactive Learning",
//     description: "Engage with quizzes, challenges, and hands-on assignments.",
//     icon: <IoGameController />,
//   },
//   {
//     title: "Progress Tracking",
//     description:
//       "Visual dashboards and analytics to track your learning journey.",
//     icon: <SiSimpleanalytics />,
//   },
//   {
//     title: "Community Support",
//     description:
//       "Learn together with instructors and peers in an active community.",
//     icon: <BsFillPeopleFill />,
//   },
// ];

export default function Home() {
  return (
   <div className="relative bg-accent-primary/5 overflow-hidden">
      <Hero />
      <About />
      <Reviews />
    </div>
  );
}
