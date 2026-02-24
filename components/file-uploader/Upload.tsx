"use client";

import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
} from "./RenderState";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useConstructUrl } from "@/hooks/use-construct-url";

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

interface iAppProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function Upload({ value, onChange }: iAppProps) {
  
  const fileUrl = useConstructUrl(value ?? "");

  const [fileState, setFileState] = useState<UploaderState>({
    error: false,
    file: null,
    id: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    fileType: "image",
    key: value ?? undefined,
    objectUrl: value ? fileUrl : undefined,
  });

  const uploadFile = useCallback(
    async (file: File) => {
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

              onChange?.(key);

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
        console.error(error);
        setFileState((prev) => ({
          ...prev,
          progress: 0,
          error: true,
          uploading: false,
        }));
        // console.error(error);
      }
    },
    [onChange],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Handle file upload
      // console.log("Accepted files:", acceptedFiles);
      if (!acceptedFiles.length) return;

      const file = acceptedFiles[0];

      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }

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
    },

    [fileState.objectUrl, uploadFile],
  );

  async function handleRemoveFile() {
    if (fileState.isDeleting || !fileState.objectUrl) return;

    try {
      setFileState((prev) => ({
        ...prev,
        isDeleting: true,
      }));
      // Call API to delete file from S3

      const response = await fetch("/api/s3/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileKey: fileState.key,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to delete file from storage.");

        setFileState((prev) => ({
          ...prev,
          isDeleting: true,
          error: true,
        }));

        return;
      }

      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }

      onChange?.("");

      setFileState(() => ({
        file: null,
        uploading: false,
        progress: 0,
        objectUrl: undefined,
        error: false,
        id: null,
        isDeleting: false,
        fileType: "image",
      }));

      toast.success("File deleted successfully.");

      // await deleteFileFromS3(fileState.key!);

      // Reset state after deletion
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Something went wrong while deleting the file.");

      setFileState((prev) => ({
        ...prev,
        isDeleting: false,
        error: true,
      }));
    }
  }

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
      return (
        <RenderUploadingState
          progress={fileState.progress}
          file={fileState.file as File}
        />
      );
    }

    if (fileState.error) {
      return <RenderErrorState />;
    }

    if (fileState.objectUrl) {
      return (
        <RenderUploadedState
          previewUrl={fileState.objectUrl}
          isDeleting={fileState.isDeleting}
          handleRemoveFile={handleRemoveFile}
        />
      );
    }

    return <RenderEmptyState isDragActive={isDragActive} />;
  }

  useEffect(() => {
    return () => {
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

  // Configure the dropzone with options like accepted file types, max file size, etc.
  //  For example, you can accept only images and limit the file size to 10MB:
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDropRejected: rejectedFile,
    disabled: fileState.uploading || !!fileState.objectUrl,
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
