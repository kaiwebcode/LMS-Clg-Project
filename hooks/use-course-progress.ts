"use client";

import { CourseProgressType } from "@/app/types/course-progress";
import { useMemo } from "react";


interface CourseProgressResult {
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
}

interface iAppProps {
  courseData: CourseProgressType;
}

export function useCourseProgress({
  courseData,
}: iAppProps): CourseProgressResult {
  return useMemo(() => {
    if (!courseData?.chapter) {
      return {
        totalLessons: 0,
        completedLessons: 0,
        progressPercentage: 0,
      };
    }

    // 🔥 Flatten lessons
    const lessons = courseData.chapter.flatMap(
      (chapter) => chapter.lessons || []
    );

    const totalLessons = lessons.length;

    const completedLessons = lessons.filter((lesson) =>
      lesson.lessonProgress?.some(
        (progress) =>
          progress.lessonId === lesson.id && progress.completed
      )
    ).length;

    const progressPercentage =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    return {
      totalLessons,
      completedLessons,
      progressPercentage,
    };
  }, [courseData]);
}