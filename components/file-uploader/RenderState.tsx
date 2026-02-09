import { cn } from "@/lib/utils";
import { Cloud, ImageIcon } from "lucide-react";
import { Button } from "../ui/button";

export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-zinc-800/90 mb-4">
        <Cloud
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
};

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
      <Button type="button" className="mt-4">Retry File Selected</Button>
    </div>
  );
};
