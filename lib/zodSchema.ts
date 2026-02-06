import z from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;

export const courseStatus = ["Draft", "Published", "Archived"] as const;

export const courseCategories = [
  "Development",
  "Business",
  "Marketing",
  "IT & Software",
  "Data Science",
  "Computer Science",
  "Cyber Security",
  "Cloud Computing",
  "Artificial Intelligence",
  "Blockchain",
  "Web Development",
  "Mobile Development",
  "Game Development",
  "Software Engineering",
  "Personal Development",
  "Teaching & Academics",
  "Programming",
  "Design",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" })
    .max(1000, { message: "Description must be at most 1000 characters long" }),
  fileKey: z.string().min(1, { message: "File is required" }),
  price: z.coerce
    .number()
    .min(1, { message: "Price must be a positive number" }),
  duration: z.coerce
    .number()
    .min(1, { message: "Duration must be at least 1 hour" })
    .max(500, { message: "Duration must be at most 500 hours" }),

  level: z.enum(courseLevels, {
    message: "Level must be required",
  }),

  category: z.enum(courseCategories, {
    message: "Category must be required",
  }),
  smallDescription: z
    .string()
    .min(3, { message: "Small description must be at least 3 characters long" })
    .max(255, {
      message: "Small description must be at most 255 characters long",
    }),

  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" }),

  status: z.enum(courseStatus, {
    message: "Status must be required",
  }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
export type CourseSchemaInput = z.input<typeof courseSchema>;
