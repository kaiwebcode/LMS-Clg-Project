"use client";

import { LessonContentType } from "@/app/data/course/get-lesson-content";
import RenderDescription from "@/components/Text-Editor/RenderDescription";
import { Button } from "@/components/ui/button";
import { constructUrl } from "@/hooks/use-construct-url";
import { BookIcon, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { MarkLessonAsCompleted } from "../action";
import { tryCatch } from "@/hooks/try-catch";
import { useConfetti } from "@/hooks/use-confetti";
import { useTransition } from "react";

interface iAppProps {
  data: LessonContentType;
}

/* ✅ MOVE OUTSIDE */
function VideoPlayer({
  thumbnailKey,
  videoKey,
}: {
  thumbnailKey: string;
  videoKey: string;
}) {
  const videoUrl = constructUrl(videoKey);
  const thumbnailUrl = constructUrl(thumbnailKey);

  if (!videoUrl) {
    return (
      <div className="aspect-video flex flex-col items-center justify-center rounded-md bg-muted mx-2">
        <BookIcon className="size-16 text-primary mx-auto mb-4" />
        <p className="text-muted-foreground text-center">
          This lesson does not have a video yet. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="aspect-video rounded-md bg-muted relative overflow-hidden">
      <video
        src={videoUrl}
        className="w-full h-full"
        controls
        poster={thumbnailUrl}
        preload="metadata"
        controlsList="nodownload"
        playsInline
      />
    </div>
  );
}

export function CourseContent({ data }: iAppProps) {
  const [isPending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();

  const onSubmit = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        MarkLessonAsCompleted(data.id, data.Chapter.Course.slug)
      );

      if (error) {
        toast.error("An unexpected error occurred. Please try again later.");
        console.error("Error to Mark Lesson :", error);
        return;
      }

      if (result.status === "success") {
        toast.success("Lesson marked as completed!");
        triggerConfetti();
      } else {
        toast.error(result.message || "Failed to mark lesson as completed.");
      }
    });
  };

  return (
    <div className="flex flex-col h-full w-full bg-background px-2 lg:pl-5">
      <VideoPlayer
        videoKey={data.videoKey ?? ""}
        thumbnailKey={data.thumbnailKey ?? ""}
      />

      <div className="py-4 border-b">
        {data.lessonProgress.length > 0 ? (
          <Button
            variant="outline"
            className="w-auto h-auto px-3 text-green-500 cursor-not-allowed"
            disabled
          >
            <CheckCircle className="size-6 text-green-500" />
            Completed
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-auto h-auto px-3 cursor-pointer"
            onClick={onSubmit}
            disabled={isPending}
          >
            <CheckCircle className="size-4 text-green-500" />
            Mark as Completed
          </Button>
        )}
      </div>

      <div className="space-y-4 py-4 px-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {data.title} :-
        </h1>

        {data.description && (
          <RenderDescription description={JSON.parse(data.description)} />
        )}
      </div>
    </div>
  );
}