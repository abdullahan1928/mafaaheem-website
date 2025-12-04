export enum S3_FOLDER {
  BLOGS = "blogs",
  EVENTS = "events",
}

export function extractS3Key(url: string): string | null {
  try {
    const path = new URL(url).pathname;
    return decodeURIComponent(path.slice(1));
  } catch {
    return null;
  }
}