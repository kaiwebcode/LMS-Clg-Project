import "server-only";

import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetRecentCourses() {

    await new Promise((resolve) => setTimeout(resolve, 3000));

    await requireAdmin();

    const data = await prisma.course.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: 3,
        select: {
            id: true,
            title: true,
            smallDescription: true,
            duration: true,
            level: true,
            status: true,
            slug: true,
            fileKey: true,
            price: true,
        }
    });

    return data;

}