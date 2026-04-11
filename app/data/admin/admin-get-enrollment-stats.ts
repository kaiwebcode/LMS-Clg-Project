import "server-only";

import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetEnrollmentStats() {
  // TODO: Implement this function to fetch enrollment statistics from the database

  await requireAdmin();

  const thirtyDaysAgo = new Date();

  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const enrollments = await prisma.enrollment.findMany({
    where: {
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const last30DaysStats: { date: string; enrollments: number }[] = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date();

    date.setDate(date.getDate() - i);

    // Count enrollments for the current date
    last30DaysStats.push({
      date: date.toISOString().split("T")[0],
      enrollments: 0,
    });
  }

  enrollments.forEach((enrollment) => {
    const enrollmentDate = enrollment.createdAt.toISOString().split("T")[0];
    const dayIndex = last30DaysStats.findIndex(
      (day) => day.date === enrollmentDate,
    );

    if (dayIndex !== -1) {
      last30DaysStats[dayIndex].enrollments += 1;
    }
  });

  return last30DaysStats;
}
