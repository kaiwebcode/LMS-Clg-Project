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

  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">
          Enrolled Courses: {enrolledCourses.length}
        </h1>
        <p>Here you can see all the courses you have purchased: </p>
      </div>

      {enrolledCourses.length === 0 ? (
        <EmptyState
          title="No Enrolled Courses"
          description="You have not enrolled in any courses yet."
          buttonText="Browse Courses"
          href="/courses"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {enrolledCourses.map((course) => (
            <CourseProgressCard key={course.Course.id} data={course} />
          ))}
        </div>
      )}

      <section className="mt-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">
            Available Courses: {allCourses.length}
          </h1>
          <p>Here you can see all the courses you have purchased: </p>
        </div>

        {allCourses.filter(
          (course) =>
            !enrolledCourses.some(
              ({ Course: enrolled }) => enrolled.id === course.id,
            ),
        ).length === 0 ? (
          <EmptyState
            title="No Available Courses"
            description="There are no available courses at the moment."
            buttonText="Browse Courses"
            href="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {allCourses
              .filter(
                (course) =>
                  !enrolledCourses.some(
                    ({ Course: enrolled }) => enrolled.id === course.id,
                  ),
              )
              .map((course) => (
                <PublicCourseCard key={course.id} data={course} />
              ))}
          </div>
        )}
      </section>
    </>
  );
}
