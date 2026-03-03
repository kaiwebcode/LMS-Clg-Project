"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import aj from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import {
  chapterSchema,
  ChapterSchemaType,
  courseSchema,
  CourseSchemaType,
  lessonSchema,
  LessonSchemaType,
} from "@/lib/zodSchema";
import { detectBot, fixedWindow, request } from "@arcjet/next";
import { revalidatePath } from "next/cache";

/* ---------------- ARCJET SETUP ---------------- */

const arcjet = aj
  .withRule(detectBot({ mode: "LIVE", allow: [] }))
  .withRule(fixedWindow({ mode: "LIVE", window: "1m", max: 5 }));

/* ---------------- EDIT COURSE ---------------- */

export async function editCourse(
  data: CourseSchemaType,
  courseId: string,
): Promise<ApiResponse> {
  const user = await requireAdmin();

  try {
    const req = await request();
    const decision = await arcjet.protect(req, {
      fingerprint: user.user.id,
    });

    if (decision.isDenied()) {
      return {
        status: "error",
        message: decision.reason.isRateLimit()
          ? "You have been rate limited. Please try again later."
          : "You are a bot! If this is a mistake, contact support.",
      };
    }

    const result = courseSchema.safeParse(data);
    if (!result.success) {
      return { status: "error", message: "Invalid data provided" };
    }

    await prisma.course.update({
      where: { id: courseId, userId: user.user.id },
      data: result.data,
    });

    revalidatePath(`/admin/courses/${courseId}/edit`);

    return { status: "success", message: "Course updated successfully" };
  } catch {
    return { status: "error", message: "Failed to update course" };
  }
}

/* ---------------- REORDER LESSONS ---------------- */

export async function reorderLessons(
  chapterId: string,
  lessons: { id: string; position: number }[],
  courseId: string,
): Promise<ApiResponse> {
  await requireAdmin();

  const updates = lessons.map((lesson) =>
    prisma.lesson.update({
      where: { id: lesson.id, chapterId },
      data: { position: lesson.position },
    }),
  );

  await prisma.$transaction(updates);
  revalidatePath(`/admin/courses/${courseId}/edit`);

  return { status: "success", message: "Lessons reordered successfully" };
}

/* ---------------- REORDER CHAPTERS ---------------- */

export async function reorderChapters(
  courseId: string,
  chapters: { id: string; position: number }[],
): Promise<ApiResponse> {
  await requireAdmin();

  const updates = chapters.map((chapter) =>
    prisma.chapter.update({
      where: { id: chapter.id, courseId },
      data: { position: chapter.position },
    }),
  );

  await prisma.$transaction(updates);
  revalidatePath(`/admin/courses/${courseId}/edit`);

  return { status: "success", message: "Chapters reordered successfully" };
}

/* ---------------- CREATE CHAPTER ---------------- */

export async function createChapter(
  values: ChapterSchemaType,
): Promise<ApiResponse> {
  await requireAdmin();

  const result = chapterSchema.safeParse(values);
  if (!result.success) {
    return { status: "error", message: "Invalid data provided" };
  }

  await prisma.$transaction(async (tx) => {
    const max = await tx.chapter.findFirst({
      where: { courseId: result.data.courseId },
      select: { position: true },
      orderBy: { position: "desc" },
    });

    await tx.chapter.create({
      data: {
        title: result.data.name,
        courseId: result.data.courseId,
        position: (max?.position ?? 0) + 1,
      },
    });
  });

  revalidatePath(`/admin/courses/${result.data.courseId}/edit`);
  return { status: "success", message: "Chapter created successfully" };
}

/* ---------------- CREATE LESSON ---------------- */

export async function createLesson(
  values: LessonSchemaType,
): Promise<ApiResponse> {
  await requireAdmin();

  const result = lessonSchema.safeParse(values);
  if (!result.success) {
    return { status: "error", message: "Invalid data provided" };
  }

  await prisma.$transaction(async (tx) => {
    const max = await tx.lesson.findFirst({
      where: { chapterId: result.data.chapterId },
      select: { position: true },
      orderBy: { position: "desc" },
    });

    await tx.lesson.create({
      data: {
        title: result.data.name,
        description: result.data.description,
        videoKey: result.data.videoKey,
        thumbnailKey: result.data.thumbnailKey,
        chapterId: result.data.chapterId,
        position: (max?.position ?? 0) + 1,
      },
    });
  });

  revalidatePath(`/admin/courses/${result.data.courseId}/edit`);
  return { status: "success", message: "Lesson created successfully" };
}

/* ---------------- DELETE LESSON ---------------- */

export async function deleteLesson({
  chapterId,
  courseId,
  lessonId,
}: {
  chapterId: string;
  courseId: string;
  lessonId: string;
}): Promise<ApiResponse> {
  await requireAdmin();

  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
    select: { lessons: { orderBy: { position: "asc" }, select: { id: true } } },
  });

  if (!chapter) {
    return { status: "error", message: "Chapter not found" };
  }

  const updates = chapter.lessons
    .filter((l) => l.id !== lessonId)
    .map((l, index) =>
      prisma.lesson.update({
        where: { id: l.id },
        data: { position: index + 1 },
      }),
    );

  await prisma.$transaction([
    ...updates,
    prisma.lesson.delete({ where: { id: lessonId } }),
  ]);

  revalidatePath(`/admin/courses/${courseId}/edit`);
  return { status: "success", message: "Lesson deleted successfully" };
}

/* ---------------- DELETE CHAPTER ---------------- */

export async function deleteChapter({
  chapterId,
  courseId,
}: {
  chapterId: string;
  courseId: string;
}): Promise<ApiResponse> {
  await requireAdmin();

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { chapter: { orderBy: { position: "asc" }, select: { id: true } } },
  });

  if (!course) {
    return { status: "error", message: "Course not found" };
  }

  const updates = course.chapter
    .filter((c) => c.id !== chapterId)
    .map((c, index) =>
      prisma.chapter.update({
        where: { id: c.id },
        data: { position: index + 1 },
      }),
    );

  await prisma.$transaction([
    ...updates,
    prisma.chapter.delete({ where: { id: chapterId } }),
  ]);

  revalidatePath(`/admin/courses/${courseId}/edit`);
  return { status: "success", message: "Chapter deleted successfully" };
}