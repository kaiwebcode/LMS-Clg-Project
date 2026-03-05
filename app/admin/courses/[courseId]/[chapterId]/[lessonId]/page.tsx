import { AdminGetLesson } from "@/app/data/admin/admin-get-lesson";
import LessonForm from "./_compoenents/LessonForm";

type Params = Promise<{
  courseId: string;
  chapterId: string;
  lessonId: string;
}>;

export default async function LessonPage({ params }: { params: Params }) {
  const { courseId, chapterId, lessonId } = await params;
  const lesson = await AdminGetLesson(lessonId);

  return (
    <LessonForm data={lesson} chapterId={chapterId} courseId={courseId}  />
  );
}
