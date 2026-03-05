"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { lessonSchema, LessonSchemaType } from "@/lib/zodSchema";

export async function editLesson(
  values: LessonSchemaType,
  lessonId: string,
): Promise<ApiResponse> {
  // Implement lesson editing logic here
  await requireAdmin();

  try {
    // Validate input data and update the lesson in the database
    // Example: await prisma.lesson.update({ where: { id: lessonId }, data: updatedData });
    const result = lessonSchema.safeParse(values);

    if (!result.success) {
      return { status: "error", message: "Invalid data provided" };
    }

    await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        title: result.data.name,
        description: result.data.description,
        videoKey: result.data.videoKey,
        thumbnailKey: result.data.thumbnailKey,
      },
    });

    return {
      status: "success",
      message: "Lesson edited successfully",
    };
  } catch {
    return { status: "error", message: "Failed to edit lesson" };
    //   console.error("Error editing lesson:", error);
    //   throw new Error("Failed to edit lesson");
  }
}
