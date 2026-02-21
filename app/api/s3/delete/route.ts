import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { S3 } from "@/lib/S3Client";
import { detectBot, fixedWindow } from "@arcjet/next";
import aj from "@/lib/arcjet";
import { requireAdmin } from "@/app/data/admin/require-admin";

const arcjet = aj
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    }),
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    }),
  );

export async function DELETE(request: Request) {
    const session = await requireAdmin();
  try {
    const decision = await arcjet.protect(request, {
      fingerprint: session?.user.id as string,
    });

    if (decision.isDenied()) {
      return NextResponse.json(
        {
          error: "Bot Detected",
        },
        { status: 429 },
      );
    }

    const body = await request.json();
    const fileKey = body.fileKey;

    if (!fileKey) {
      return NextResponse.json(
        { error: "File key is required" },
        { status: 400 },
      );
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES!,
      Key: fileKey,
    });

    // const s3 = new S3Client({});
    await S3.send(command);

    // Call your S3 deletion logic here
    // If successful:
    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200 },
    );
    // If failed:
    // return NextResponse.json({ error: 'Failed to delete file from S3' }, { status: 500 });
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    return NextResponse.json(
      { error: "Missing or invalid object key" },
      { status: 500 },
    );
  }
}
