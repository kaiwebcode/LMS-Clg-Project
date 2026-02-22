import { adminGetCourses } from "@/app/data/admin/admin-get-course";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import AdminCourseCard from "./_components/AdminCourseCard";

export default async function AdminCoursesPage() {
  const data = await adminGetCourses();

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Courses Management</h1>
        <Link href="/admin/courses/create" className={buttonVariants()}>
          Create Courses
        </Link>
      </div>

      {/* <div className="flex flex-col items-center justify-center mt-36">
        <span className="flex flex-col items-center justify-center space-y-2">
            <LoaderIcon size={40} className="animate-spin"  />
            <h1>Pending...</h1>
        </span>
        <h1 className="text-xl text-center mt-20">Here, you will see all of the courses. </h1>
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {data.map((course) => {
          return <AdminCourseCard key={course.id} data={course} />;
        })}
      </div>
    </>
  );
}
