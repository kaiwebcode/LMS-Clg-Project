import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Prisma } from "@prisma/client";

/* =========================
   ✅ CORRECT TYPE (FROM PRISMA)
   ========================= */

export type AdminCourseSingularType =
  Prisma.CourseGetPayload<{
    select: {
      id: true;
      title: true;
      description: true;
      fileKey: true;
      price: true;
      duration: true;
      level: true;          // ✅ CourseLevel enum
      status: true;         // ✅ CourseStatus enum
      slug: true;
      smallDescription: true;
      category: true;
      chapter: {
        select: {
          id: true;
          title: true;
          position: true;
          lessons: {
            select: {
              id: true;
              title: true;
              description: true;
              thumbnailKey: true;
              videoKey: true;
              position: true;
            };
          };
        };
      };
    };
  }>;

/* =========================
   FUNCTION
   ========================= */

export async function adminGetCourse(
  courseId: string,
): Promise<AdminCourseSingularType> {
  await requireAdmin();

  if (!courseId) {
    notFound(); // ⬅️ do NOT return
  }

  const data = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      description: true,
      fileKey: true,
      price: true,
      duration: true,
      level: true,
      status: true,
      slug: true,
      smallDescription: true,
      category: true,
      chapter: {
        orderBy: { position: "asc" },
        select: {
          id: true,
          title: true,
          position: true,
          lessons: {
            orderBy: { position: "asc" },
            select: {
              id: true,
              title: true,
              description: true,
              thumbnailKey: true,
              videoKey: true,
              position: true,
            },
          },
        },
      },
    },
  });

  if (!data) {
    notFound(); // ⬅️ do NOT return
  }

  return data;
}