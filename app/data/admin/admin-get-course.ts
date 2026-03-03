import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

/* ================= TYPES ================= */

export interface AdminLesson {
  id: string;
  title: string;
  description: string | null;
  thumbnailKey: string | null;
  videoKey: string | null;
  position: number;
}

export interface AdminChapter {
  id: string;
  title: string;
  position: number;
  lessons: AdminLesson[];
}

export interface AdminCourseSingularType {
  id: string;
  title: string;
  description: string;
  fileKey: string;
  price: number;
  duration: number;
  level: string;
  status: string;
  slug: string;
  smallDescription: string;
  category: string;
  chapter: AdminChapter[];
}

/* ================= FUNCTION ================= */

export async function adminGetCourse(
  courseId: string,
): Promise<AdminCourseSingularType> {
  await requireAdmin();

  if (!courseId) notFound();

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

  if (!data) notFound();

  return data;
}