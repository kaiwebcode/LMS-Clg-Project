import { ReactNode } from "react";
import CourseSidebar from "../_components/CourseSidebar";
import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";

interface iAppProps {
  params: Promise<{ slug: string }>;
  children: ReactNode;
}

export default async function CourseLayout({ params, children }: iAppProps) {
  const { slug } = await params;

  const course = await getCourseSidebarData(slug);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      
      {/* 📱 MOBILE: CONTENT FIRST (VIDEO) */}
      <div className="block lg:hidden w-full h-full overflow-y-auto mt-10">
        {children}  
      </div>

      {/* SIDEBAR */}
      <div className="w-full lg:w-100 border-t lg:border-t-0 lg:border-r border-border overflow-y-auto ">
        <CourseSidebar course={course.course} />
      </div>

      {/* 💻 DESKTOP: CONTENT RIGHT */}
      <div className="hidden lg:flex flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}