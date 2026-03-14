"use client";

import { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import { type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

import parse from "html-react-parser";

export default function RenderDescription({
  description,
}: {
  description: JSONContent;
}) {
  const outPut = useMemo(() => {
    return generateHTML(description, [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ]);
  }, [description]);

  return (
    <div className="prose dark:prose-invert prose-li:marker:text-primary">
      {parse(outPut)}
    </div>
  );
}
