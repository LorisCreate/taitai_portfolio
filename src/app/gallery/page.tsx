import { GalleryIndex } from "./gallery-index";

export const metadata = {
  title: "Gallery｜たいたい",
};

export default function GalleryPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 pb-24 md:px-8">
      <div className="page-hero">
        <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:items-end">
          <h1 className="ff-mi text-[32px] tracking-[0.28em] md:text-[42px]">作品</h1>
          <p className="ff-en text-[14px] tracking-[0.16em]">gallery</p>
        </div>
      </div>
      <GalleryIndex />
    </main>
  );
}
