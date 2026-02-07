"use client";

import { type Editor } from "@tiptap/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  ListIcon,
  ListOrdered,
  Redo,
  Undo,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FaStrikethrough } from "react-icons/fa";
import { Button } from "../ui/button";

interface MenuBarProps {
  editor: Editor | null;
}

export function MenuBar({ editor }: MenuBarProps) {
  if (!editor) return null;

  return (
    <div className="border border-input border-t-0 border-x-0 rounded-lg p-2 bg-card flex flex-wrap gap-1 items-center">
      <TooltipProvider>
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() => {
                  editor.chain().focus().toggleBold().run();
                }}
                className={cn(
                  "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  editor.isActive("bold") &&
                    "bg-primary text-primary-foreground",
                )}
              >
                <BoldIcon className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>

            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() => {
                  editor.chain().focus().toggleItalic().run();
                }}
                className={cn(
                  "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  editor.isActive("italic") &&
                    "bg-primary text-primary-foreground",
                )}
              >
                <ItalicIcon className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>

            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("strike")}
                onPressedChange={() => {
                  editor.chain().focus().toggleStrike().run();
                }}
                className={cn(
                  "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  editor.isActive("strike") &&
                    "bg-primary text-primary-foreground",
                )}
              >
                <FaStrikethrough className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>

            <TooltipContent>Strike</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 1 })}
                onPressedChange={() => {
                  editor.chain().focus().toggleHeading({ level: 1 }).run();
                }}
                className={cn(
                  "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  editor.isActive("heading", { level: 1 }) &&
                    "bg-primary text-primary-foreground",
                )}
              >
                <Heading1Icon className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>

            <TooltipContent>Heading 1</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() => {
                  editor.chain().focus().toggleHeading({ level: 2 }).run();
                }}
                className={cn(
                  "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  editor.isActive("heading", { level: 2 }) &&
                    "bg-primary text-primary-foreground",
                )}
              >
                <Heading2Icon className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>

            <TooltipContent>Heading 2</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 3 })}
                onPressedChange={() => {
                  editor.chain().focus().toggleHeading({ level: 3 }).run();
                }}
                className={cn(
                  "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  editor.isActive("heading", { level: 3 }) &&
                    "bg-primary text-primary-foreground",
                )}
              >
                <Heading3Icon className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>

            <TooltipContent>Heading 3</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("bulletList")}
                onPressedChange={() => {
                  editor.chain().focus().toggleBulletList().run();
                }}
                className={cn(
                  "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  editor.isActive("bulletList") &&
                    "bg-primary text-primary-foreground",
                )}
              >
                <ListIcon className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>

            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("orderedList")}
                onPressedChange={() => {
                  editor.chain().focus().toggleOrderedList().run();
                }}
                className={cn(
                  "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  editor.isActive("orderedList") &&
                    "bg-primary text-primary-foreground",
                )}
              >
                <ListOrdered className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>

            <TooltipContent>Ordered List</TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 bg-border mx-2 "></div>

        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: "left" })}
                onPressedChange={() => {
                  editor.chain().focus().setTextAlign("left").run();
                }}
                className={cn(
                  "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  editor.isActive({ textAlign: "left" }) &&
                    "bg-primary text-primary-foreground",
                )}
              >
                <AlignLeft className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>

            <TooltipContent>Left Align</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: "center" })}
                onPressedChange={() => {
                  editor.chain().focus().setTextAlign("center").run();
                }}
                className={cn(
                  "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  editor.isActive({ textAlign: "center" }) &&
                    "bg-primary text-primary-foreground",
                )}
              >
                <AlignCenter className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>

            <TooltipContent>Center Align</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: "right" })}
                onPressedChange={() => {
                  editor.chain().focus().setTextAlign("right").run();
                }}
                className={cn(
                  "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  editor.isActive({ textAlign: "right" }) &&
                    "bg-primary text-primary-foreground",
                )}
              >
                <AlignRight className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>

            <TooltipContent>Right Align</TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 bg-border mx-2 "></div>

        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size={"lg"}
                variant="ghost"
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <Undo />
              </Button>
            </TooltipTrigger>

            <TooltipContent>Undo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size={"lg"}
                variant="ghost"
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <Redo />
              </Button>
            </TooltipTrigger>

            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
