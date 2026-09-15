import Image from "next/image";
import { galleryWorks } from "@/lib/site";

export const metadata = {
  title: "Gallery｜ATELIER 516",
};

export default function GalleryPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 pb-20 md:px-8">
      <div className="page-hero">
        <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:items-end">
          <h1 className="ff-mi text-[32px] tracking-[0.28em] md:text-[42px]">作品</h1>
          <p className="ff-en text-[14px] tracking-[0.16em]">gallery</p>
        </div>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {galleryWorks.map((work) => (
          <article key={work.title} className="group">
            <figure className="overflow-hidden">
              <Image
                src={work.image}
                alt={work.title}
                width={800}
                height={1000}
                className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </figure>
            <p className="ff-en mt-4 text-[12px] tracking-[0.14em]">{work.category}</p>
            <h2 className="mt-1 text-[15px] tracking-[0.12em]">{work.title}</h2>
          </article>
        ))}
      </div>
    </main>
  );
}
