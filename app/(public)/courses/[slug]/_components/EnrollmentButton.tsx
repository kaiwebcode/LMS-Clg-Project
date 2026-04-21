"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { EnrollInCourse } from "../actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function EnrollmentButton({ courseId }: { courseId: string }) {
  const [pending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(async () => {
      try {
        const result = await EnrollInCourse(courseId);

        console.log("Enrollment Result:", result);

        // 👉 If server returns something (like already enrolled)
        if (result?.status === "success") {
          toast.success(result.message);
        } else if (result?.status === "error") {
          toast.error(
            result.message || "Something went wrong. Please try again later.",
          );
        }

        // 👉 If redirect happens, code below WON'T run (and that's correct)
      } catch (error: unknown) {
        // ✅ Ignore Next.js redirect error
        if (
          typeof error === "object" &&
          error !== null &&
          "digest" in error &&
          typeof (error as { digest?: string }).digest === "string" &&
          (error as { digest?: string }).digest?.includes("NEXT_REDIRECT")
        ) {
          return;
        }

        console.error("Real Error:", error);
        toast.error("Something went wrong.");
      }
    });
  }

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
