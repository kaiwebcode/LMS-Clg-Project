export interface CourseProgressType {
  chapter: {
    lessons: {
      id: string;
      lessonProgress?: {
        lessonId: string;
        completed: boolean;
      }[];
    }[];
  }[];
}