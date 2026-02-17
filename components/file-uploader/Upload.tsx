"use client";

import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
} from "./RenderState";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image" | "video";
}

// const INITIAL_STATE: UploaderState = {
//   id: null,
//   file: null,
//   uploading: false,
//   progress: 0,
//   isDeleting: false,
//   error: false,
//   objectUrl: null,
//   fileType: "image",
// };

export default function Upload() {
  const [fileState, setFileState] = useState<UploaderState>({
    error: false,
    file: null,
    id: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    fileType: "image",
    // objectUrl: ""
  });

  async function uploadFile(file: File) {
    // Implement file upload logic here
    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }));

    // Simulate upload progress
    try {
      // 1. GEt presigned URl
      const presignedResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          isImage: true,
        }),
      });

      if (!presignedResponse.ok) {
        toast.error("Failed to get pressigned URL");
        // console.error(presignedResponse);
        setFileState((prev) => ({
          ...prev,
          uploading: false,
          progress: 0,
          error: true,
        }));

        return;
      }

      const { presignedUrl, key } = await presignedResponse.json();

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentageCompleted = (event.loaded / event.total) * 100;
            setFileState((prev) => ({
              ...prev,
              progress: Math.round(percentageCompleted),
            }));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFileState((prev) => ({
              ...prev,
              progress: 100,
              uploading: false,
              key: key,
            }));

            toast.success("File upload Successfully.");

            resolve();
          } else {
            reject(new Error("Upload failed.."));
            // console.error(reject);
          }
        };

        xhr.onerror = () => {
          reject(new Error("Upload failed"));
        };
        
        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error)
      setFileState((prev) => ({
        ...prev,
        progress: 0,
        error: true,
        uploading: false,
      }));
      // console.error(error);
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file upload
    // console.log("Accepted files:", acceptedFiles);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFileState({
        file: file,
        uploading: false,
        progress: 0,
        objectUrl: URL.createObjectURL(file),
        error: false,
        id: uuidv4(),
        isDeleting: false,
        fileType: "image",
      });

      uploadFile(file);
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

      // const invalidFileType = fileRejections.find(
      //   (rejection) => rejection.errors[0].code === "file-invalid-type",
      // );

      // if (invalidFileType) {
      //   toast.error(
      //     "Invalid file type. Please upload an image file (JPG, PNG ).",
      //   );
      // }
    }
  };

  function renderContent() {
    if (fileState.uploading) {
      return <h1>Uploading...</h1>;
    }

    if (fileState.error) {
      return <RenderErrorState />;
    }

    if (fileState.objectUrl) {
      return <RenderUploadedState previewUrl={fileState.objectUrl} />;
    }

    return <RenderEmptyState isDragActive={isDragActive} />;
  }

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

        {renderContent()}
      </CardContent>
    </Card>
  );
}
