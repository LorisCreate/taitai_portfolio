import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

function publicUrl(folder: string, file: string) {
  return `/${folder}/${file.split("/").map(encodeURIComponent).join("/")}`;
}

/** Image URLs in public/{folder}, sorted by filename. */
export function listPublicFolderImages(folder: string): string[] {
  const dir = path.join(PUBLIC_DIR, folder);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && IMAGE_EXT.test(entry.name) && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true, sensitivity: "base" }))
    .map((file) => publicUrl(folder, file));
}
