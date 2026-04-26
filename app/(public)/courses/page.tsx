import { getAllCourses } from "@/app/data/courses/get-all-courses";
import PublicCourseCard, {
  PublicCourseCardSkeleton,
} from "../_components/PublicCourseCard";
import { Suspense } from "react";
import { HeroSection } from "../_components/HeroSection";


export default function CoursesPage() {
  return (
    <div className="my-10 px-4 lg:px-8 space-y-10">

      {/* 🔥 HERO (Client Component) */}
      <HeroSection />

      {/* 🔥 COURSES SECTION */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-semibold">
            All Courses
          </h2>
        </div>

        <Suspense fallback={<LoadingSkeletonLayout />}>
          <RenderCourses />
        </Suspense>
      </div>
    </div>
  );
}

async function RenderCourses() {
  const courses = await getAllCourses();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div
          key={course.id}
          className="group transition-all duration-300 hover:-translate-y-1"
        >
          <PublicCourseCard data={course} />
        </div>
      ))}
    </div>
  );
}

function LoadingSkeletonLayout() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <PublicCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}