import { cn } from "@/lib/utils";
import { CloudUpload, ImageIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-zinc-800/90 mb-4">
        <CloudUpload
          className={cn(
            "size-6  text-muted-foreground",
            isDragActive && "text-primary",
          )}
        />
      </div>
      <p className="text-base text-muted-foreground font-semibold">
        Drop your files here or{" "}
        <span className="text-primary font-bold cursor-pointer">
          Click to upload{" "}
        </span>
        <br />
        Supported formats: JPG, PNG, PDF, DOCX. <br />
        Max file size: 10MB.
      </p>
      <Button type="button" variant="default" className="mt-4">
        Select Files
      </Button>
    </div>
  );
}

export const RenderErrorState = () => {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-destructive/30 mb-4">
        <ImageIcon className={cn("size-6  text-destructive")} />
      </div>
      <p className="text-base font-semibold">Upload Failed</p>
      <p className="text-xs text-muted-foreground mt-1">
        Something went Wrong!!
      </p>
      {/* <p className="text-xl mt-3 text-muted-foreground">Click or drag file to retry</p> */}
      <Button type="button" className="mt-4">
        Retry File Selected
      </Button>
    </div>
  );
};

export function RenderUploadedState({ previewUrl }: { previewUrl: string }) {
  return (
    <div>
      <Image 
        width={240}
        height={240}
        src={previewUrl}
        alt="Upload file"
        className="object-contain p-2 w-60 h-60"
      />

      <Button
        type="button"
        variant="destructive"
        size="icon"
        className={cn("absolute top-4 right-4")}
      >
        <XIcon className="size-4"/>
      </Button>
    </div>
  );
}
