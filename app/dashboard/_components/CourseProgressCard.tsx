"use client";

import { EnrolledCourseType } from "@/app/data/user/get-enrolled-courses";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { useCourseProgress } from "@/hooks/use-course-progress";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  data: EnrolledCourseType;
}

export function CourseProgressCard({ data }: iAppProps) {
  const thumbnailUrl = useConstructUrl(data.Course.fileKey);

  // ✅ NO TYPE ERROR HERE
  const { totalLessons, completedLessons, progressPercentage } =
    useCourseProgress({
      courseData: data.Course,
    });

  return (
    <Card className="group relative py-0 gap-0">
      <Badge className="absolute top-2 right-2 z-10">
        {data.Course.level}
      </Badge>

      <Image
        src={thumbnailUrl}
        alt="Thumbnail Image of Course"
        width={600}
        height={400}
        className="w-full rounded-t-xl aspect-video object-cover"
      />

      <CardContent className="p-4">
        <Link
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
          href={`/dashboard/${data.Course.slug}`}
        >
          {data.Course.title}
        </Link>

        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
          {data.Course.smallDescription}
        </p>

        {/* ✅ Progress Section */}
        <div className="space-y-4">
          <div className="flex justify-between text-sm mt-4">
            <p>Progress:</p>
            <p className="font-medium">{progressPercentage}%</p>
          </div>

          <Progress value={progressPercentage} className="h-2" />

          <p className="text-sm text-muted-foreground">
            {completedLessons} / {totalLessons} lessons completed
          </p>
        </div>

        <Link
          href={`/dashboard/${data.Course.slug}`}
          className={buttonVariants({
            className: "mt-4 w-full",
          })}
        >
          Continue Learning
        </Link>
      </CardContent>
    </Card>
  );
}