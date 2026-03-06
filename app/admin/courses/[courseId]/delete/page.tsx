"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { tryCatch } from "@/hooks/try-catch";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteCourse } from "./actions";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";

export default function DeleteChapterPage(  ) {

    const [ isPending, startTransition] = useTransition();
    const { courseId } = useParams()    ;
    const router = useRouter();

     const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        startTransition(async () => {
          const { data: result, error } = await tryCatch(
            deleteCourse(courseId as string),
          );
    
          if (error) {
            toast.error("An unexpected error occurred while deleting the course.");
            console.error("Error deleting course:", error);
            return;
          }
    
          if (result.status === "success") {
            toast.success("Course deleted successfully!");
            // form.reset();
            router.push("/admin/courses");
          } else {
            toast.error(result.message || "Failed to delete course.");
          }
        });
      };

    return (
        <div className="max-w-md mx-auto w-full">
            <Card className="mt-36 border-destructive/50 bg-destructive/10">
                <CardHeader>
                    <CardTitle>
                        Are you sure you want to delete this chapter?
                    </CardTitle>
                    <CardDescription>
                        This action cannot be undone and all lessons under this chapter will also be deleted. Please make sure to backup any important data before proceeding.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between gap-3">
                    <Link href='/admin/courses' className={buttonVariants({ variant: "outline", className: "mr-4" })}>
                        Cancel
                    </Link>

                    <Button variant={"destructive"} onClick={onSubmit} disabled={isPending} className="flex items-center cursor-pointer">
                        {isPending ? (
                            <>
                            Deleting...
                            <Loader2 className="animate-spin" />
                            </>
                        ) : (
                            <>
                                <Trash2 className="mr-2" />
                                Delete Course
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}