"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { EnrollInCourse } from "../actions";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function EnrollmentButton({ courseId }: { courseId: string }) {
  const [pending, startTransition] = useTransition();

  function onSubmit() {
    // At runtime, data is already validated & coerced by Zod
    // const validatedData = courseSchema.parse(data);

    // console.log("Validated data:", validatedData);

    startTransition(async () => {
      const { data: result, error } = await tryCatch(EnrollInCourse(courseId));

      if (error) {
        toast.error("Something went wrong.");
        console.error(" Something went wrong: ", error);
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
      } else {
        toast.error(
          result.message || "Something went wrong. Please try again later."
        );
      }
    });
  };

  return (
    <Button
      onClick={onSubmit}
      disabled={pending}
      className="w-full cursor-pointer"
      size="lg"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        "Enroll Now!"
      )}
    </Button>
  );
}
