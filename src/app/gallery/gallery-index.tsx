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
const OVERLAY_MS = 320;

type Filter = (typeof galleryFilters)[number];

function visibleWorksFor(allWorks: GalleryWork[], filter: Filter) {
  return allWorks.filter((work) => filter === "ALL" || work.tag === filter);
}

function wrapIndex(index: number, count: number) {
  if (count <= 0) return 0;
  return ((index % count) + count) % count;
}

function wrapDelta(t: number, count: number) {
  if (count <= 1) return t;
  return t - count * Math.round(t / count);
}

export function GalleryIndex({ works: allWorks }: { works: GalleryWork[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const touchYRef = useRef<number | null>(null);
  const overlayLock = useRef(false);
  const [filter, setFilter] = useState<Filter>("ALL");
  const [offset, setOffset] = useState(0);
  const [frontIndex, setFrontIndex] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);
  const [slideAnimate, setSlideAnimate] = useState(false);

  const works = useMemo(
    () => visibleWorksFor(allWorks, filter),
    [allWorks, filter],
  );
  const count = works.length;

  const nudgeOffset = useCallback(
    (dy: number) => {
      if (count <= 1) return;
      const unit = Math.max(window.innerHeight * 0.7, 1);
      setOffset((current) => {
        const next = current + dy / unit;
        return ((next % count) + count) % count;
      });
    },
    [count],
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onWheel = (event: WheelEvent) => {
      if (frontIndex != null || count <= 1) return;
      event.preventDefault();
      nudgeOffset(event.deltaY);
    };
    const onTouchStart = (event: TouchEvent) => {
      touchYRef.current = event.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (frontIndex != null || count <= 1) return;
      const y = event.touches[0]?.clientY;
      if (y == null || touchYRef.current == null) return;
      const dy = touchYRef.current - y;
      if (Math.abs(dy) < 2) return;
      event.preventDefault();
      nudgeOffset(dy);
      touchYRef.current = y;
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
    };
  }, [count, frontIndex, nudgeOffset]);

  const selectFilter = (next: Filter) => {
    setFilter(next);
    setFrontIndex(null);
    setOffset(0);
    setSlide(0);
    window.scrollTo(0, 0);
  };

  const openWork = (index: number) => {
    setFrontIndex(index);
    setSlide(0);
    setSlideAnimate(false);
  };

  const stepFront = useCallback(
    (delta: 1 | -1) => {
      if (count <= 1 || overlayLock.current || frontIndex == null) return;
      overlayLock.current = true;
      setSlideAnimate(true);
      setSlide(delta);
      window.setTimeout(() => {
        setFrontIndex((current) =>
          current == null ? current : wrapIndex(current + delta, count),
        );
        setSlideAnimate(false);
        setSlide(0);
        overlayLock.current = false;
      }, OVERLAY_MS);
    },
    [count, frontIndex],
  );

  useEffect(() => {
    if (frontIndex == null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFrontIndex(null);
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
  }, [frontIndex, stepFront]);

  const items = useMemo(() => {
    if (count === 0) return [];
    return works.map((work, index) => {
      const t = wrapDelta(index - offset, count);
      const x = t * SPACING;
      const y = t * t * 4.2;
      const rotate = t * 5.5;
      const depth = 1 - Math.min(Math.abs(t) / 3.2, 1);
      const scale = 0.72 + depth * 0.28;
      const z = Math.round(depth * 40);
      return { work, index, x, y, rotate, scale, z, opacity: 0.35 + depth * 0.65 };
    });
  }, [count, offset, works]);

  const overlaySlides =
    frontIndex == null || count === 0
      ? []
      : [
          works[wrapIndex(frontIndex - 1, count)],
          works[frontIndex],
          works[wrapIndex(frontIndex + 1, count)],
        ];

  const front = frontIndex == null ? null : works[frontIndex];

  return (
    <div
      ref={stageRef}
      className="relative h-[calc(100svh-72px)] overflow-hidden overscroll-contain md:h-[calc(100svh-88px)] lg:h-[calc(100svh-96px)]"
    >
      <div className="absolute inset-0">
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
            items.map(({ work, index, x, y, rotate, scale, z, opacity }) => (
              <button
                key={work.slug}
                type="button"
                onClick={() => openWork(index)}
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

      {front && overlaySlides.length === 3 ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-white/70 px-4 backdrop-blur-[2px]"
          onClick={() => setFrontIndex(null)}
        >
          <figure
            className="relative w-full max-w-[520px]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 shadow-[0_24px_56px_rgba(0,0,0,0.18)]">
              <div
                className="absolute inset-0 flex"
                style={{
                  width: "300%",
                  transform: `translateX(${(-1 + slide) * (100 / 3)}%)`,
                  transition: slideAnimate ? `transform ${OVERLAY_MS}ms ease` : "none",
                }}
              >
                {overlaySlides.map((work, slot) => (
                  <div key={`${work.slug}-${slot}`} className="relative h-full w-1/3 shrink-0">
                    <Image
                      src={work.images[0] ?? work.image}
                      alt={work.title}
                      fill
                      sizes="520px"
                      className="object-cover"
                      priority={slot === 1}
                    />
                  </div>
                ))}
              </div>
            </div>
            <figcaption className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-[16px] leading-8 tracking-[0.16em]">
                  {[front.tag, front.date].filter(Boolean).join("　/　")}
                </p>
                <h2 className="mt-2 text-[16px] leading-8 tracking-[0.12em] md:text-[24px] md:leading-8">
                  {front.title}
                </h2>
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
            {count > 1 ? (
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
                  onClick={() => setFrontIndex(null)}
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
                onClick={() => setFrontIndex(null)}
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
