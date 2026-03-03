import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { tryCatch } from "@/hooks/try-catch";
import { lessonSchema, LessonSchemaType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { createLesson } from "../action";
import { toast } from "sonner";

export default function NewLessonModal({
  courseId,
  chapterId,
}: {
  courseId: string;
  chapterId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // define your form
  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: "",
      courseId: courseId,
      chapterId: chapterId,
    },
  });

  async function onSubmit(values: LessonSchemaType) {
    startTransition(async () => {
      // Your async logic here
      const { data: result, error } = await tryCatch(createLesson(values));

      if (error) {
        // Handle error
        toast.error("Failed to create lesson. Please try again.");
        console.error("Error creating lesson:", error);
        return;
      }
      if (result.status === "success") {
        // Handle success
        toast.success("Lesson created successfully!");
        console.log("Lesson created successfully:", result);
        form.reset();
        setIsOpen(false);
      } else if (result.status === "error") {
        // Handle unexpected result
        toast.error("Unexpected response from server. Please try again.");
        console.error("Unexpected response:", result);
      }
    });
  }

  const handleOpen = (open: boolean) => {
    if (!open) {
      form.reset();
    }

    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild className="ml-auto cursor-pointer  ">
        <Button
          variant={"outline"}
          size={"sm"}
          className="w-full justify-center gap-1  px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <Plus className="mr-2" size={16} />
          New Lesson
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Create new Lesson</DialogTitle>
          <DialogDescription>
            What would you like to name your lesson? You can always change it
            later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Form fields will go here */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Lesson Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-0">
              <Button disabled={isPending} type="submit">
                {isPending ? "Saving..." : "Save Change"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
