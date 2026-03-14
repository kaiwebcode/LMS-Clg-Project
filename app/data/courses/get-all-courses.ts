import { prisma } from "@/lib/db";

export async function getAllCourses() {

    await new Promise((resolve) => setTimeout(resolve, 2000));

  const data = await prisma.course.findMany({
    where: {
      status: "Published",
    },
    select: {
      id: true,
      title: true,
      price: true,
      smallDescription: true,
      slug: true,
      fileKey: true,
      level: true,
      duration: true,
      category: true,
      description: true,
      createdAt: true,
    },
    orderBy: {
      // sort by createdAt in descending order to show the most recent courses first
      createdAt: "desc",
    },
  });
  return data;
}

export type PublicCoursesType = Awaited<ReturnType<typeof getAllCourses>>[0];
