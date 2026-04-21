import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function LessonSkeleton() {
  return (
    <div className="flex flex-col h-full pl-6">
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="space-y-3 mt-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      <div className="flex gap-3 mt-3">
        <Skeleton className="h-10 w-32 " />
        <Skeleton className="h-10 w-5/24 " />
      </div>
    </div>
  );
}

export default LessonSkeleton;
