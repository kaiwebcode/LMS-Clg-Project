"use client";

import { AdminLessonType } from "@/app/data/admin/admin-get-lesson";
import Upload from "@/components/file-uploader/Upload";
import Editor from "@/components/Text-Editor/Editor";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { tryCatch } from "@/hooks/try-catch";
import { lessonSchema, LessonSchemaType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { editLesson } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface iAppProps {
  data: AdminLessonType;
  chapterId: string;
  courseId: string;
}

export default function LessonForm({ data, chapterId, courseId }: iAppProps) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  // define your form
  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: data.title,
      chapterId: chapterId,
      courseId: courseId,
      description: data.description || "",
      videoKey: data.videoKey || "",
      thumbnailKey: data.thumbnailKey || "",
    },
  });

  const onSubmit: SubmitHandler<LessonSchemaType> = (values) => {
    // At runtime, data is already validated & coerced by Zod
    // const validatedData = courseSchema.parse(data);

    // console.log("Validated data:", validatedData);

    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        editLesson(values as LessonSchemaType, data.id),
      );

      if (error) {
        toast.error("An unexpected error occurred while editing the lesson.");
        console.error("Error editing lesson:", error);
        return;
      }

      if (result.status === "success") {
        toast.success("Lesson edited successfully!");
        form.reset();
        router.push("/admin/courses");
      } else {
        toast.error(result.message || "Failed to edit lesson.");
      }
    });
  };

  return (
    <div>
      <Link
        href={`/admin/courses/${courseId}/edit`}
        className={buttonVariants({ variant: "outline", className: "mb-4" })}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Go back</span>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Configuration</CardTitle>
          <CardDescription>
            Configuration for the lesson {data.title}, the video and the
            thumbnail for the lesson must be uploaded to the s3 bucket and the
            keys must be added here, the description is optional but recommended
            for better SEO.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            {/* form fields will go here */}
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Chapter xyz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson Description</FormLabel>
                    <FormControl>
                      <Editor field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="thumbnailKey"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                      <Upload
                        onChange={field.onChange}
                        value={field.value}
                        fileTypeAccepted="image"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="videoKey"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video File</FormLabel>
                    <FormControl>
                      <Upload
                        onChange={field.onChange}
                        value={field.value}
                        fileTypeAccepted="video"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="ml-auto cursor-pointer" disabled={pending}>
                {pending ? (
                  <>
                    Saving...
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  </>
                ) : (
                  "Save Lesson"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
