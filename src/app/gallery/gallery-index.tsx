"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  galleryFilters,
  showGalleryDetailPages,
  type GalleryWork,
} from "@/lib/site";

const SPACING = 30;

type Filter = (typeof galleryFilters)[number];

function visibleWorksFor(allWorks: GalleryWork[], filter: Filter) {
  return allWorks.filter(
    (work) => filter === "ALL" || work.tag === filter,
  );
}

function wrapDelta(t: number, count: number) {
  if (count <= 1) return t;
  return t - count * Math.round(t / count);
}

function trackScroll(track: HTMLDivElement) {
  const rect = track.getBoundingClientRect();
  const max = Math.max(rect.height - window.innerHeight, 1);
  const scrolled = Math.min(Math.max(-rect.top, 0), max);
  return { max, scrolled, progress: scrolled / max };
}

export function GalleryIndex({ works: allWorks }: { works: GalleryWork[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>("ALL");
  const [progress, setProgress] = useState(0);
  const [frontSlug, setFrontSlug] = useState<string | null>(null);

  const works = useMemo(
    () => visibleWorksFor(allWorks, filter),
    [allWorks, filter],
  );

  const front = useMemo(
    () => (frontSlug == null ? null : (works.find((work) => work.slug === frontSlug) ?? null)),
    [frontSlug, works],
  );

  const stepFront = useCallback(
    (delta: number) => {
      setFrontSlug((current) => {
        if (works.length === 0) return current;
        const from = current
          ? works.findIndex((work) => work.slug === current)
          : 0;
        const index = from < 0 ? 0 : from;
        return works[(index + delta + works.length) % works.length].slug;
      });
    },
    [works],
  );

  const touchYRef = useRef<number | null>(null);

  const updateProgress = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setProgress(trackScroll(track).progress);
  }, []);

  const wrapIndexScroll = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track || works.length <= 1) return false;
      const { max, scrolled } = trackScroll(track);
      const atTop = scrolled <= 2;
      const atBottom = scrolled >= max - 2;
      if (direction < 0 && atTop) {
        window.scrollBy(0, max * ((works.length - 1) / works.length) - scrolled);
        return true;
      }
      if (direction > 0 && atBottom) {
        window.scrollBy(0, -scrolled);
        return true;
      }
      return false;
    },
    [works.length],
  );

  useEffect(() => {
    updateProgress();
    const onScroll = () => {
      updateProgress();
    };
    const onWheel = (event: WheelEvent) => {
      if (frontSlug != null) return;
      if (event.deltaY === 0) return;
      if (wrapIndexScroll(event.deltaY > 0 ? 1 : -1)) {
        event.preventDefault();
      }
    };
    const onTouchStart = (event: TouchEvent) => {
      touchYRef.current = event.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (frontSlug != null) return;
      const y = event.touches[0]?.clientY;
      if (y == null || touchYRef.current == null) return;
      const dy = touchYRef.current - y;
      if (Math.abs(dy) < 8) return;
      if (wrapIndexScroll(dy > 0 ? 1 : -1)) {
        event.preventDefault();
        touchYRef.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [frontSlug, updateProgress, wrapIndexScroll, works.length]);

  const selectFilter = (next: Filter) => {
    setFilter(next);
    setFrontSlug(null);
    setProgress(0);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (frontSlug == null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFrontSlug(null);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        stepFront(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        stepFront(-1);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [frontSlug, stepFront]);

  const count = works.length;
  const offset = count <= 1 ? 0 : progress * count;

  const items = useMemo(
    () =>
      works.map((work, index) => {
        const t = wrapDelta(index - offset, count);
        const x = t * SPACING;
        const y = t * t * 4.2;
        const rotate = t * 5.5;
        const depth = 1 - Math.min(Math.abs(t) / 3.2, 1);
        const scale = 0.72 + depth * 0.28;
        const z = Math.round(depth * 40);
        return { work, x, y, rotate, scale, z, opacity: 0.35 + depth * 0.65 };
      }),
    [count, offset, works],
  );

  return (
    <div ref={trackRef} className="relative" style={{ height: `${Math.max(count, 4) * 70}vh` }}>
      <div className="sticky top-[72px] h-[calc(100svh-72px)] overflow-hidden md:top-[88px] md:h-[calc(100svh-88px)] lg:top-[96px] lg:h-[calc(100svh-96px)]">
        <div className="absolute top-4 right-6 left-6 z-30 flex flex-col gap-4 md:top-8 md:right-8 md:left-8 md:flex-row md:items-start md:justify-between">
          <p className="ff-en pointer-events-none text-[16px] leading-8 tracking-[0.2em]">
            pickup works
          </p>
          <div
            className="flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="作品の絞り込み"
          >
            {galleryFilters.map((item) => {
              const selected = filter === item;
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => selectFilter(item)}
                  className={`gallery-filter ${item === "ALL" ? "ff-en" : ""} text-[16px] ${
                    selected ? "is-on" : ""
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div className="absolute inset-0">
          <div className="pointer-events-none absolute top-[18%] right-[-20%] left-[-20%] h-[70%] rounded-[50%] border border-black/10" />
          {count === 0 ? (
            <p className="absolute inset-0 flex items-center justify-center px-8 text-center text-[16px] leading-8 tracking-[0.08em]">
              {allWorks.length === 0
                ? "作品画像がまだありません。public/image_card と original / funart にファイルを置いてください。"
                : "該当する作品はありません。"}
            </p>
          ) : (
            items.map(({ work, x, y, rotate, scale, z, opacity }) => (
              <button
                key={work.slug}
                type="button"
                onClick={() => setFrontSlug(work.slug)}
                className="gallery-card absolute top-1/2 left-1/2 h-[42vw] max-h-[416px] min-h-[208px] w-[30vw] max-w-[304px] min-w-[152px] origin-center cursor-pointer overflow-hidden bg-neutral-100 shadow-[0_16px_40px_rgba(0,0,0,0.12)] md:h-[46vh] md:w-[22vw]"
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
            ))
          )}
        </div>
      </div>

      {front ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-white/70 px-4 backdrop-blur-[2px]"
          onClick={() => setFrontSlug(null)}
        >
          <figure
            className="gallery-front relative w-full max-w-[520px]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 shadow-[0_24px_56px_rgba(0,0,0,0.18)]">
              <Image
                src={front.images[0] ?? front.image}
                alt={front.title}
                fill
                sizes="520px"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-[16px] leading-8 tracking-[0.16em]">
                  {[front.tag, front.date].filter(Boolean).join("　/　")}
                </p>
                <h2 className="mt-2 text-[16px] leading-8 tracking-[0.12em] md:text-[24px] md:leading-8">{front.title}</h2>
              </div>
              {showGalleryDetailPages ? (
                <Link
                  href={`/gallery/${front.slug}`}
                  className="ff-en text-[16px] leading-8 tracking-[0.16em] underline"
                >
                  view
                </Link>
              ) : null}
            </figcaption>
            {works.length > 1 ? (
              <div className="mt-8 flex items-center justify-between gap-8">
                <button
                  type="button"
                  className="ff-en h-8 text-[16px] leading-8 tracking-[0.18em]"
                  onClick={() => stepFront(-1)}
                  aria-label="前の作品"
                >
                  prev
                </button>
                <button
                  type="button"
                  className="ff-en h-8 text-[16px] leading-8 tracking-[0.18em]"
                  onClick={() => setFrontSlug(null)}
                >
                  close
                </button>
                <button
                  type="button"
                  className="ff-en h-8 text-[16px] leading-8 tracking-[0.18em]"
                  onClick={() => stepFront(1)}
                  aria-label="次の作品"
                >
                  next
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="ff-en mt-8 text-[16px] leading-8 tracking-[0.18em]"
                onClick={() => setFrontSlug(null)}
              >
                close
              </button>
            )}
          </figure>
        </div>
      ) : null}
    </div>
  );
}
