

import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";
import { CourseLevel, CourseStatus } from "@prisma/client";
import { notFound } from "next/navigation";

export async function adminGetCourse(courseId: string) {
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
        select: {
          id: true,
          title: true,
          position: true,
          lessons: {
            select: {
              id: true,
              title: true,
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


export type AdminCourseSingularType = {
  id: string;
  title: string;
  description: string;
  fileKey: string;
  price: number;
  duration: number;
  level: CourseLevel;
  status: CourseStatus;
  slug: string;
  smallDescription: string;
  category: string;
  chapter: {
    id: string;
    title: string;
    position: number;
    lessons: {
      id: string;
      title: string;
      position: number;
    }[];
  }[];
};