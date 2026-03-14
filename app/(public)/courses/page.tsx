import { getAllCourses } from "@/app/data/courses/get-all-courses";
import PublicCourseCard, {
  PublicCourseCardSkeleton,
} from "../_components/PublicCourseCard";
import { Suspense } from "react";

export default function CoursesPage() {
  return (
    <div className="mt-6">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
          Explore Courses
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Discover our wide range of courses designed to help you learn new
          skills and advance your career. Whether you&apos;re interested in
          technology, business, or creative arts, we have something for
          everyone. Browse through our course catalog and find the perfect
          course to start your learning journey today!
        </p>
      </div>

      <Suspense fallback={<LoadingSkeletonLayout />}>
        <RenderCourses />
      </Suspense>
    </div>
  );
}

async function RenderCourses() {
  const courses = await getAllCourses();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <PublicCourseCard key={course.id} data={course} />
      ))}
    </div>
  );
}

function LoadingSkeletonLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <PublicCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}
