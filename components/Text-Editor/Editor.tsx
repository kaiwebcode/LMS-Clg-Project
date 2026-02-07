"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { MenuBar } from "./MenuBar";
import { ControllerRenderProps } from "react-hook-form";
import { CourseSchemaInput } from "@/lib/zodSchema";

interface EditorProps {
  field: ControllerRenderProps<CourseSchemaInput, "description">;
}

export default function Editor({ field }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "min-h-[300px] p-4 focus:outline-none prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl dark:prose-invert w-full !max-w-none",
      },
    },

    content: field.value
      ? JSON.parse(field.value)
      : "<p>Hello world ❤️</p>",

    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
  });

  return (
    <div className="w-full border border-input rounded-lg overflow-hidden dark:bg-input/30">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
