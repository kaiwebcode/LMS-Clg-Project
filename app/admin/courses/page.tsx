import { buttonVariants } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";

export default function AdminCoursesPage() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Courses Management</h1>
        <Link href="/admin/courses/create" className={buttonVariants()}>Create Courses</Link>
      </div>

      <div className="flex flex-col items-center justify-center mt-36">
        <span className="flex flex-col items-center justify-center space-y-2">
            <LoaderIcon size={40} className="animate-spin"  />
            <h1>Pending...</h1>
        </span>
        <h1 className="text-xl text-center mt-20">Here, you will see all of the courses. </h1>
      </div>
    </>
  );
}
