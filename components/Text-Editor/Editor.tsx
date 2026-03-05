"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { MenuBar } from "./MenuBar";

/* ---------- TYPE ---------- */
interface EditorField {
  value?: string;
  onChange: (value: string) => void;
}

interface EditorProps {
  field: EditorField;
}

/* ---------- SAFE PARSER ---------- */
function parseEditorContent(value?: string) {
  if (!value) {
    return "<p>Put your Lesson Description Here...</p>";
  }

  try {
    return JSON.parse(value);
  } catch {
    return `<p>${value}</p>`;
  }
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

    content: parseEditorContent(field.value),

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