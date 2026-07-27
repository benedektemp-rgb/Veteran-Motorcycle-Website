import "server-only";
import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { putFile, deleteFile, isGitHubTokenConfigured } from "./github-content";

export const SITE_SETTINGS_PATH = "content/site-settings.json";
export const GALLERY_PATH = "content/gallery.json";
export const EVENTS_PATH = "content/events.json";

const isVercel = Boolean(process.env.VERCEL);

export function isContentStoreWritable(): boolean {
  return isVercel ? isGitHubTokenConfigured() : true;
}

/** True once a write has actually gone live (local: immediately; Vercel: only after the triggered redeploy finishes). */
export function writesNeedRedeploy(): boolean {
  return isVercel;
}

export async function writeContentFile(relativePath: string, data: unknown): Promise<void> {
  const json = JSON.stringify(data, null, 2) + "\n";

  if (isVercel) {
    await putFile(relativePath, json, `Update ${relativePath} via admin`);
    return;
  }

  const fullPath = path.join(/* turbopackIgnore: true */ process.cwd(), relativePath);
  await writeFile(fullPath, json, "utf8");
}

export async function saveUploadedImage(file: File): Promise<string> {
  const extension = file.name.split(".").pop() || "jpg";
  const filename = `${randomUUID()}.${extension}`;
  const relativePath = `public/uploads/${filename}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  if (isVercel) {
    await putFile(relativePath, buffer, `Add uploaded image ${filename}`);
  } else {
    const fullDir = path.join(/* turbopackIgnore: true */ process.cwd(), "public", "uploads");
    await mkdir(fullDir, { recursive: true });
    await writeFile(path.join(fullDir, filename), buffer);
  }

  return `/uploads/${filename}`;
}

export async function deleteUploadedImage(imageUrl: string): Promise<void> {
  if (!imageUrl.startsWith("/uploads/")) return;
  const relativePath = `public${imageUrl}`;

  if (isVercel) {
    await deleteFile(relativePath, `Remove image ${imageUrl}`);
    return;
  }

  const fullPath = path.join(/* turbopackIgnore: true */ process.cwd(), relativePath);
  await unlink(fullPath).catch(() => {});
}
