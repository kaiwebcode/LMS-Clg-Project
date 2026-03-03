import { Loader2 } from "lucide-react";

export default function LessonPage() {
    return (
        <div className=" p-4 rounded-lg ">
            <h1 className="text-2xl font-bold mb-4">Lesson Page</h1>
            <p>This is the lesson page. You can add your lesson content here.</p>
            <div className="mt-4 p-4 border rounded-lg text-center flex flex-col items-center justify-center">
            <p className="mt-2 text-lg text-gray-500">
                Pending implementation. This page will display the lesson content and allow the admin to edit it. You can add text, images, videos, and other media to create an engaging learning experience for your students.
            </p>
            <Loader2 className="animate-spin mt-8 w-10 h-10" />
            </div>

        </div>
    );
}