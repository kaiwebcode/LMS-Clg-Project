"use client";

import { useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { RenderEmptyState } from "./RenderState";
import { toast } from "sonner";
// import { v4 as uuidv4 } from "uuid";

// interface UploaderState {
//   id: string | null;
//   file: File | null;
//   uploading: boolean;
//   progress: number;
//   key?: string;
//   isDeleting: boolean;
//   error: boolean;
//   objectUrl: string | null;
//   fileType: "image" | "video";
// }

export default function Upload() {
  // const [fileState, setFileState] = useState<UploaderState | null>({
  //   error: false,
  //   file: null,
  //   id: null,
  //   isDeleting: false,
  //   objectUrl: null,
  //   progress: 0,
  //   uploading: false,
  //   fileType: "image",
  // });

  // const uploadFile = (file: File) => {
  //   // Implement file upload logic here
  //   setFileState((prev) => ({
  //     ...prev,
  //     uploading: true,
  //     progress: 0,
  //   }));

  //   // Simulate upload progress
  //   try {

  //   } catch (error) {

  //   }

  // }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file upload
    // console.log("Accepted files:", acceptedFiles);
    if (acceptedFiles.length) {
      // const file = acceptedFiles[0];

      // setFileState({
      //   file: file,
      //   uploading: false,
      //   progress: 0,
      //   objectUrl: URL.createObjectURL(file),
      //   error: false,
      //   id: uuidv4(),
      //   isDeleting: false,
      //   fileType: "image",
      // });
    }
  }, []);

  const rejectedFile = (fileRejections: FileRejection[]) => {
    // Handle rejected files (e.g., show error messages)
    if (fileRejections.length) {
      const tooManyFiles = fileRejections.find(
        (rejection) => rejection.errors[0].code === "too-many-files",
      );

      if (tooManyFiles) {
        toast.error("Too many files. Please upload only one file.");
      }

      const fileTooLarge = fileRejections.find(
        (rejection) => rejection.errors[0].code === "file-too-large",
      );

      if (fileTooLarge) {
        toast.error(
          "File is too large. Please upload a file smaller than 10MB.",
        );
      }

      const invalidFileType = fileRejections.find(
        (rejection) => rejection.errors[0].code === "file-invalid-type",
      );

      if (invalidFileType) {
        toast.error(
          "Invalid file type. Please upload an image file (JPG, PNG ).",
        );
      }
    }
  };

  // Configure the dropzone with options like accepted file types, max file size, etc.
  //  For example, you can accept only images and limit the file size to 10MB:
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDropRejected: rejectedFile,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-dashed border-2 border-gray-400 p-4 transition-colors duration-200 ease-in-out w-full h-64",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary",
      )}
    >
      <CardContent className="flex items-center justify-center h-full w-full p-4">
        <input {...getInputProps()} />

        <RenderEmptyState isDragActive={isDragActive} />
      </CardContent>
    </Card>
  );
}
