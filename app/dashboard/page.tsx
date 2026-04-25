import { EmptyState } from "@/components/general/EmptyState";
import { getAllCourses } from "../data/courses/get-all-courses";
import { getEnrolledCourses } from "../data/user/get-enrolled-courses";
import PublicCourseCard from "../(public)/_components/PublicCourseCard";
import { CourseProgressCard } from "./_components/CourseProgressCard";

export default async function DashboardPage() {
  const [allCourses, enrolledCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
  ]);

  const availableCourses = allCourses.filter(
    (course) =>
      !enrolledCourses.some(
        ({ Course: enrolled }) => enrolled.id === course.id,
      ),
  );

  return (
    <div className="space-y-12">
      {/* 🔥 HEADER */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight lg:ml-4">
          Welcome back 👋
        </h1>
        <p className="text-muted-foreground lg:ml-4">
          Track your progress and continue learning
        </p>
      <div className="border-b border-border mt-6" />
      </div>


      {/* ================= ENROLLED ================= */}
      <section className="space-y-4 lg:ml-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold">
              Your Courses
            </h2>
            <p className="text-sm text-muted-foreground">
              {enrolledCourses.length} enrolled courses
            </p>
          </div>
        </div>

        {enrolledCourses.length === 0 ? (
          <EmptyState
            title="No Enrolled Courses"
            description="Start learning by enrolling in a course"
            buttonText="Browse Courses"
            href="/courses"
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <CourseProgressCard key={course.Course.id} data={course} />
            ))}
          </div>
        )}
      </section>

          <div className="border-b border-border " />

      {/* ================= AVAILABLE ================= */}
      <section className="space-y-4 lg:ml-4">
        <div>
          <h2 className="text-3xl font-semibold">
            Explore Courses
          </h2>
          <p className="text-sm text-muted-foreground">
            {availableCourses.length} available courses
          </p>
        </div>

        {availableCourses.length === 0 ? (
          <EmptyState
            title="No Available Courses"
            description="New courses will be added soon"
            buttonText="Refresh"
            href="/courses"
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {availableCourses.map((course) => (
              <PublicCourseCard key={course.id} data={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}