"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import aj from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";
import { detectBot, fixedWindow, request } from "@arcjet/next";


const arcjet = aj
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    }),
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    }),
  );

export async function createCourse(
  data: CourseSchemaType,
): Promise<ApiResponse> {
  const session = await requireAdmin();
  try {
    const req = await request();

    const decision = await arcjet.protect(req, {
      fingerprint: session?.user.id,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "You have been rate limited. Please try again later.",
        };
      } else {
        return {
          status: "error",
          message:
            "You are a bot! if you think this is a mistake, please contact support.",
        };
      }
    }

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
