import { EmptyState } from "@/components/general/EmptyState";
import { getEnrolledCourses } from "../data/user/get-enrolled-courses";
import { CourseProgressCard } from "./_components/CourseProgressCard";
import { requireUser } from "../data/user/require-user";

export default async function DashboardPage() {
  const [enrolledCourses] = await Promise.all([getEnrolledCourses()]);

  const user = await requireUser();

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight lg:ml-4">
          Welcome back{" "}
          <span className="capitalize text-primary ">
            {user?.name.split(" ")[0] || user?.email.split("@")[0]}
          </span>
        </h1>
        <p className="text-muted-foreground lg:ml-4">
          Track your progress and continue learning
        </p>
        <div className="border-b border-border mt-3" />
      </div>

      {/* ================= ENROLLED ================= */}
      <section className="space-y-4 lg:ml-4">
        <div className="flex gap-1 items-center justify-between">
          <h2 className="text-4xl font-semibold">Your Courses:-</h2>
          <p className="text-md text-muted-foreground lg:mr-4">
            {enrolledCourses.length} enrolled courses
          </p>
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
    </div>
  );
}
