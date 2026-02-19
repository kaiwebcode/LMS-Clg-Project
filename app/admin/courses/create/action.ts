"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";
import { headers } from "next/headers";

export async function createCourse(
  data: CourseSchemaType,
): Promise<ApiResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Validate the incoming data
    // If validation fails, throw an error with the validation errors
    // If validation succeeds, proceed to create the course in the database
    // You can use the validationData to check if the validation was successful or not
    const validationData = courseSchema.safeParse(data);

    if (!validationData.success) {
      return {
        status: "error",
        message: "Invalid Form data",
      };
    }

    const courseData = validationData.data;

    // Create the course in the database
    await prisma.course.create({
      data: {
        ...courseData,
        userId: session?.user.id as string,
      },
    });

    return {
      status: "success",
      message: "Course created successfully",
    };
  } catch (error) {
    console.error("Error creating course:", error);
    return {
      status: "error",
      message: "Internal Server Error",
    };
  }
}
