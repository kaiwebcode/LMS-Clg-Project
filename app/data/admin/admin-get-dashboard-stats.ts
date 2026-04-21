import "server-only";

import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetDashboardStats() {
  await requireAdmin();

  const [totalUsers, totalCustomers, totalCourses, totalLessons] =
    await Promise.all([
      // Fetch user count
      prisma.user.count(),
      // Fetch customer count
      prisma.user.count({
        where: {
          enrollment: {
            some: {
              status: "Active",
            },
          },
        },
      }),
      // Fetch course count
      prisma.course.count(),
      // Fetch lesson count
      prisma.lesson.count(),
    ]);

  return {
    totalUsers,
    totalCustomers,
    totalCourses,
    totalLessons,
  };
}
