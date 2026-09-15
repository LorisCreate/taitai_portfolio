"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/reveal";
import { galleryCategories, galleryWorks } from "@/lib/site";

export function GalleryIndex() {
  const [active, setActive] = useState<(typeof galleryCategories)[number]>("all");

  const works = useMemo(
    () =>
      active === "all"
        ? galleryWorks
        : galleryWorks.filter((work) => work.tag === active),
    [active],
  );

  return (
    <>
      <Reveal className="relative mt-16 bg-[#f3f3f3] px-6 pb-10 pt-8 md:mt-20 md:px-12 md:pb-12">
        <h2 className="ff-en absolute top-0 left-6 -translate-y-1/2 text-[28px] tracking-[0.18em] md:left-12 md:text-[36px]">
          category
        </h2>
        <ul className="flex flex-wrap gap-2 pt-6 md:gap-3">
          {galleryCategories.map((category) => {
            const selected = active === category;
            return (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => setActive(category)}
                  className={`ff-en border px-4 py-2 text-[12px] tracking-[0.14em] md:px-5 ${
                    selected
                      ? "border-black bg-black text-white"
                      : "border-transparent bg-white text-black"
                  }`}
                >
                  {category === "web" ? "web site" : category}
                </button>
              </li>
            );
          })}
        </ul>
      </Reveal>

      {works.length === 0 ? (
        <p className="mt-16 text-center">このカテゴリーの作品はまだありません。</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-14 md:mt-10 md:grid-cols-2 md:gap-y-16">
          {works.map((work) => (
            <Reveal key={`${active}-${work.slug}`}>
              <article>
                <Link href={`/gallery/${work.slug}`} className="group block">
                  <div className="flex items-baseline gap-4 text-[12px]">
                    <p className="ff-en relative pr-4 tracking-[0.14em] after:absolute after:top-1/2 after:right-0 after:h-2.5 after:w-px after:-translate-y-1/2 after:bg-black">
                      {work.tag === "web" ? "web site" : work.tag}
                    </p>
                    <p className="ff-en tracking-[0.12em]">{work.date}</p>
                  </div>
                  <h2 className="ff-en mt-3 text-[22px] tracking-[0.14em] md:text-[26px]">
                    {work.title}
                  </h2>
                  <figure className="mt-5 overflow-hidden">
                    <Image
                      src={work.image}
                      alt={work.title}
                      width={900}
                      height={600}
                      className="aspect-[3/2] h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </figure>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
