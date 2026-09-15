"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { galleryWorks, type GalleryWork } from "@/lib/site";

const SPACING = 30;

export function GalleryIndex() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [front, setFront] = useState<GalleryWork | null>(null);

  const updateProgress = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const max = Math.max(rect.height - window.innerHeight, 1);
    const scrolled = Math.min(Math.max(-rect.top, 0), max);
    setProgress(scrolled / max);
  }, []);

  useEffect(() => {
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress]);

  useEffect(() => {
    if (!front) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFront(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [front]);

  const count = galleryWorks.length;
  const offset = progress * Math.max(count - 1, 1);

  const items = useMemo(
    () =>
      galleryWorks.map((work, index) => {
        const t = index - offset;
        const x = t * SPACING;
        const y = t * t * 4.2;
        const rotate = t * 5.5;
        const depth = 1 - Math.min(Math.abs(t) / 3.2, 1);
        const scale = 0.72 + depth * 0.28;
        const z = Math.round(depth * 40);
        return { work, x, y, rotate, scale, z, opacity: 0.35 + depth * 0.65 };
      }),
    [offset],
  );

  return (
    <div ref={trackRef} className="relative" style={{ height: `${Math.max(count, 4) * 70}vh` }}>
      <div className="sticky top-[72px] h-[calc(100svh-72px)] overflow-hidden md:top-[88px] md:h-[calc(100svh-88px)] lg:top-[100px] lg:h-[calc(100svh-100px)]">
        <p className="ff-en pointer-events-none absolute top-4 left-6 z-20 text-[12px] tracking-[0.2em] md:top-6 md:left-8">
          pickup works
        </p>

        <div className="absolute inset-0">
          <div className="pointer-events-none absolute top-[18%] right-[-20%] left-[-20%] h-[70%] rounded-[50%] border border-black/10" />
          {items.map(({ work, x, y, rotate, scale, z, opacity }) => (
            <button
              key={work.slug}
              type="button"
              onClick={() => setFront(work)}
              className="gallery-card absolute top-1/2 left-1/2 h-[42vw] max-h-[420px] min-h-[210px] w-[30vw] max-w-[300px] min-w-[150px] origin-center cursor-pointer overflow-hidden bg-neutral-100 shadow-[0_18px_40px_rgba(0,0,0,0.12)] md:h-[46vh] md:w-[22vw]"
              style={{
                zIndex: z,
                opacity,
                transform: `translate(-50%, -58%) translate(${x}vw, ${y}vh) rotate(${rotate}deg) scale(${scale})`,
              }}
              aria-label={`${work.title}を前面に表示`}
            >
              <Image
                src={work.image}
                alt={work.title}
                fill
                sizes="(max-width: 768px) 45vw, 22vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {front ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-white/70 px-5 backdrop-blur-[2px]"
          onClick={() => setFront(null)}
        >
          <figure
            className="gallery-front relative w-full max-w-[520px]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
              <Image
                src={front.image}
                alt={front.title}
                fill
                sizes="520px"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="mt-5 flex items-end justify-between gap-4">
              <div>
                <p className="ff-en text-[12px] tracking-[0.16em]">
                  {front.tag === "web" ? "web site" : front.tag}　/　{front.date}
                </p>
                <h2 className="mt-1 text-[18px] tracking-[0.12em]">{front.title}</h2>
              </div>
              <Link
                href={`/gallery/${front.slug}`}
                className="ff-en text-[12px] tracking-[0.16em] underline"
              >
                view
              </Link>
            </figcaption>
            <button
              type="button"
              className="ff-en mt-6 text-[12px] tracking-[0.18em]"
              onClick={() => setFront(null)}
            >
              close
            </button>
          </figure>
        </div>
      ) : null}
    </div>
  );
}
