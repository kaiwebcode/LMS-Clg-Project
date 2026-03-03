import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { deleteLesson } from "../action";
import { toast } from "sonner";

export function DeleteLesson({
  chapterId,
  courseId,
  lessonId,
}: {
  chapterId: string;
  courseId: string;
  lessonId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  async function onDelete() {
    // Implement the delete logic here, e.g., call an API to delete the lesson
    // After deletion, you might want to close the dialog and refresh the lesson list
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        deleteLesson({
          chapterId,
          courseId,
          lessonId,
        }),
      );
      if (error) {
        toast.error("Failed to delete lesson. Please try again.");
        console.error("Error deleting lesson:", error);
        return;
      }

      if (result.status === "success") {
        toast.success("Lesson deleted successfully!");
        console.log("Lesson deleted successfully:", result);
        setIsOpen(false);
      }
    });
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger>
        <Button variant={"ghost"} size={"icon"} className="ml-auto">
          <Trash2 className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this lesson? This action cannot be
            undone.
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the lesson and all its associated
            content. Please confirm your action.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={onDelete} disabled={pending} >
            {pending ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
