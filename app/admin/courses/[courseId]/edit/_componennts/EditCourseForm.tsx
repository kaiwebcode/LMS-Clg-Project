"use client";

import { Button } from "@/components/ui/button";
import {
  courseCategories,
  courseLevels,
  courseSchema,
  CourseSchemaInput,
  CourseSchemaType,
  courseStatus,
} from "@/lib/zodSchema";
import { Loader2, PlusIcon, SparkleIcon } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import slugify from "slugify";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Editor from "@/components/Text-Editor/Editor";
import Upload from "@/components/file-uploader/Upload";
import { useTransition } from "react";
import { tryCatch } from "@/hooks/try-catch";
// import { createCourse } from "./action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { editCourse } from "../action";
import { AdminCourseSingularType } from "@/app/data/admin/admin-get-course";

interface iAppProps {
  data: AdminCourseSingularType;
}

export default function EditCourseForm({ data }: iAppProps) {
  const [isPending, setTransition] = useTransition();
  const router = useRouter();

  // define your form
  const form = useForm<CourseSchemaInput>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: data.title || "",
      description: data.description || "",
      fileKey: data.fileKey || "",
      price: data.price || 0,
      duration: data.duration || 0,
      level: data.level || "Beginner",
      category: data.category as CourseSchemaType["category"],
      status: data.status || "Draft",
      slug: data.slug || "",
      smallDescription: data.smallDescription || "",
    },
  });

  // define your submit handler
  const onSubmit: SubmitHandler<CourseSchemaInput> = (values) => {
    // At runtime, data is already validated & coerced by Zod
    // const validatedData = courseSchema.parse(data);

    // console.log("Validated data:", validatedData);

    setTransition(async () => {
      const { data: result, error } = await tryCatch(
        editCourse(values as CourseSchemaType, data.id),
      );

      if (error) {
        toast.error("An unexpected error occurred while creating the course.");
        console.error("Error creating course:", error);
        return;
      }

      if (result.status === "success") {
        toast.success("Course created successfully!");
        form.reset();
        router.push("/admin/courses");
      } else {
        toast.error(result.message || "Failed to create course.");
      }
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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

        <div className="flex gap-4  items-end ">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Course Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Course Slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            className="w-fit cursor-pointer whitespace-nowrap"
            onClick={() => {
              const titleValue = form.getValues("title");
              const slug = slugify(titleValue);

              form.setValue("slug", slug, { shouldValidate: true });
            }}
          >
            Generate Slug <SparkleIcon className="ml-2 h-4 w-4 animate-pulse" />
          </Button>
        </div>

        <FormField
          control={form.control}
          name="smallDescription"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Course Small Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Course Small Description"
                  className="min-h-35"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Course Description</FormLabel>
              <FormControl>
                <Editor field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fileKey"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Thumbnail Image</FormLabel>
              <FormControl>
                <Upload onChange={field.onChange} value={field.value} />
                {/* <Input placeholder="Thumbnail Url" {...field} /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courseCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Level</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courseLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Duration (in hours)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Duration"
                    type="number"
                    value={
                      field.value !== undefined && field.value !== null
                        ? String(field.value)
                        : ""
                    }
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Price (in USD)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Price"
                    type="number"
                    value={
                      field.value !== undefined && field.value !== null
                        ? String(field.value)
                        : ""
                    }
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courseStatus.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="cursor-pointer">
          {isPending ? (
            <>
              <span>Updating...</span>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              Update  Course <PlusIcon className="ml-1" size={16} />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
