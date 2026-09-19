import { listGalleryWorks } from "@/lib/gallery";
import { GalleryIndex } from "./gallery-index";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gallery｜たいたい",
};

export default function GalleryPage() {
  const works = listGalleryWorks();

  return (
    <main>
      <GalleryIndex works={works} />
    </main>
  );
}
