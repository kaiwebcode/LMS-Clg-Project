import PublicCourseCard from "@/app/(public)/_components/PublicCourseCard";
import { getAllCourses } from "@/app/data/courses/get-all-courses";
import { getEnrolledCourses } from "@/app/data/user/get-enrolled-courses";
import { EmptyState } from "@/components/general/EmptyState";

export default async function CoursesPage() {
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
    <section className="space-y-4 lg:ml-4">
      {/* ================= AVAILABLE ================= */}
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-semibold">Explore Courses</h2>
        <p className="text-md text-muted-foreground">
          {availableCourses.length} available courses
        </p>
      </div>

      <div className="border-b border-border mb-6" />

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
  );
}
