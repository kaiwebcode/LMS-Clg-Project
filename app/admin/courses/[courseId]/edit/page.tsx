import { adminGetCourse } from "@/app/data/admin/admin-get-course";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditCourseForm from "./_componennts/EditCourseForm";
import { Loader2 } from "lucide-react";
// import { CourseStructure } from "./_componennts/CourseStructure";

type PageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export default async function EditRoute({ params }: PageProps) {
  const { courseId } = await params; // ✅ REQUIRED in Next 15+

  const data = await adminGetCourse(courseId);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Edit Course:{" "}
        <span className="text-primary underline">{data.title}</span>{" "}
      </h1>

      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid grid-cols-2 w-full border-b">
          <TabsTrigger value="basic-info" className="w-full cursor-pointer">
            Basic Info
          </TabsTrigger>
          <TabsTrigger
            value="course-structure"
            className="w-full cursor-pointer"
          >
            Course Structure
          </TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info" className="mt-4">
          <Card>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
              <CardDescription>
                Provide basic Information about the course, such as title,
                description, price, etc.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <EditCourse /> */}
              <EditCourseForm data={data} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="course-structure" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Structure</CardTitle>
              <CardDescription>
                Here you can edit the course structure, such as adding sections, lectures,
              </CardDescription>
              <h1 className="text-2xl text-center mt-10">
                Pending Implementation of Course Structure Editor (Coming
                Soon...)
              </h1>
              <Loader2 className="mx-auto mt-8 h-8 w-8 animate-spin text-muted-foreground" />
            </CardHeader>
            {/* <CardContent>
                <CourseStructure />
            </CardContent> */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
