import fs from "node:fs";
import path from "node:path";
import type { GalleryTag, GalleryWork } from "@/lib/site";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

type Folder = "image_card" | "original" | "funart";

type PublicFile = {
  folder: Folder;
  file: string;
  base: string;
  url: string;
};

function publicUrl(folder: Folder, file: string) {
  return `/${folder}/${file.split("/").map(encodeURIComponent).join("/")}`;
}

function listFolder(folder: Folder): PublicFile[] {
  const dir = path.join(PUBLIC_DIR, folder);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && IMAGE_EXT.test(entry.name) && !entry.name.startsWith("."))
    .map((entry) => {
      const file = entry.name;
      const base = path.parse(file).name.normalize("NFC");
      return { folder, file, base, url: publicUrl(folder, file) };
    });
}

function indexByBase(files: PublicFile[]) {
  const map = new Map<string, PublicFile>();
  for (const file of files) {
    const key = file.base.toLowerCase();
    if (!map.has(key)) {
      map.set(key, file);
    }
  }
  return map;
}

function titleFromBase(base: string) {
  return base.replace(/[_-]+/g, " ").trim() || base;
}

function slugFromBase(base: string) {
  return base;
}

/**
 * Gallery works from public/image_card, public/original, and public/funart.
 * Thumbnails live in image_card. Tag + full image come from original (オリジナル)
 * or funart (二次創作), matched by basename (extension ignored, case-insensitive).
 * Live2D is kept as a filter label only — there is no Live2D folder yet.
 */
export function listGalleryWorks(): GalleryWork[] {
  const cards = indexByBase(listFolder("image_card"));
  const originals = indexByBase(listFolder("original"));
  const funarts = indexByBase(listFolder("funart"));

  const keys = new Set([...cards.keys(), ...originals.keys(), ...funarts.keys()]);

  const works: GalleryWork[] = [];

  for (const key of keys) {
    const card = cards.get(key);
    const original = originals.get(key);
    const funart = funarts.get(key);
    // Same basename in both original and funart: prefer original.
    const full = original ?? funart;
    const thumb = card ?? full;
    if (!thumb) continue;

    let tag: GalleryTag | null = null;
    if (original) tag = "オリジナル";
    else if (funart) tag = "二次創作";

    const source = full ?? thumb;
    works.push({
      slug: slugFromBase(source.base),
      title: titleFromBase(source.base),
      tag,
      date: "",
      image: thumb.url,
      images: [full?.url ?? thumb.url],
      body: "",
    });
  }

  works.sort((a, b) => a.title.localeCompare(b.title, "ja"));
  return works;
}

export function getGalleryWork(slug: string) {
  const decoded = decodeURIComponent(slug);
  return listGalleryWorks().find(
    (work) => work.slug === slug || work.slug === decoded || decodeURIComponent(work.slug) === decoded,
  );
}
