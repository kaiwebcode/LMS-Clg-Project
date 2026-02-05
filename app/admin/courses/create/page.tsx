"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  courseSchema,
  CourseSchemaInput,
} from "@/lib/zodSchema";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function CourseCreatePage() {
  // define your form
  const form = useForm<CourseSchemaInput>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      fileKey: "",
      price: 0,
      duration: 0,
      level: "Beginner",
      category: "",
      status: "Draft",
      slug: "",
      smallDescription: "",
    },
  });

  // define your submit handler
  const onSubmit: SubmitHandler<CourseSchemaInput> = (data) => {
    // At runtime, data is already validated & coerced by Zod
    const validatedData = courseSchema.parse(data);

    console.log("Validated data:", validatedData);
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        <Link
          href="/admin/courses"
          className={buttonVariants({
            variant: "outline",
            size: "icon",
          })}
        >
          <ArrowLeft className=" h-4 w-4" />
        </Link>
        <h1 className="text-2xl font-bold mb-4 mt-4">Create a New Course</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Provide basic information about the course
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Course Title</FormLabel>
                        <FormControl>
                        <Input placeholder="Course Title" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
