import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Prisma } from "@prisma/client";

export type AdminCourseSingularType =
  Prisma.CourseGetPayload<{
    select: {
      id: true;
      title: true;
      description: true;
      fileKey: true;
      price: true;
      duration: true;
      level: true;
      status: true;
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
              position: true;
              videoKey: true;
            };
          };
        };
      };
    };
  }>;

export async function adminGetCourse(
  courseId: string,
): Promise<AdminCourseSingularType> {
  await requireAdmin();

  if (!courseId) notFound(); // ⬅️ IMPORTANT (no return)

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
              position: true,
              videoKey: true,
            },
          },
        },
      },
    },
  });

  if (!data) notFound(); // ⬅️ IMPORTANT (no return)

  return data;
}