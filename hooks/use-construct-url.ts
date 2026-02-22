import { env } from "@/lib/env";

export function useConstructUrl(Key: string): string {
//   const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_URL;
  return `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.t3.storage.dev/${Key}`;
}

// https://alpha-lms-clg-project.t3.storage.dev/
