import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const { fileName, fileType, folderName } = await req.json();

    const bucket = process.env.AWS_S3_BUCKET_NAME!;
    const folderKey = `${folderName}/`;

    const listCommand = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: folderKey,
      MaxKeys: 1,
    });

    const result = await s3.send(listCommand);

    if (!result.Contents || result.Contents.length === 0) {
      const createFolderCommand = new PutObjectCommand({
        Bucket: bucket,
        Key: folderKey,
      });
      await s3.send(createFolderCommand);
    }

    const key = `${folderName}/${Date.now()}-${fileName}`;
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: fileType,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 60 });
    return NextResponse.json({ url, key });
  } catch (err) {
    console.error("S3 Upload Error:", err);
    return NextResponse.json({ error: "Failed to get presigned URL" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { key } = await req.json();

    if (!key) {
      return NextResponse.json({ error: "Missing key" }, { status: 400 });
    }

    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: key,
      })
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("S3 delete error:", error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
