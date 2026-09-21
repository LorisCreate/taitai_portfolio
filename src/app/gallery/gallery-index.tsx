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
const OVERLAY_MS = 460;
const SETTLE_MS = 480;
const AXIS_LOCK_PX = 8;
const FLING_VELOCITY = 0.0026;
const OVERLAY_COMMIT = 0.2;
const OVERLAY_FLING = 0.42;
const EASE_SOFT = "cubic-bezier(0.22, 1, 0.36, 1)";

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

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function easeSoft(t: number) {
  return 1 - (1 - t) ** 3.4;
}

function isGalleryChrome(target: EventTarget | null) {
  return (
    target instanceof Element &&
    Boolean(target.closest("[data-gallery-chrome], a"))
  );
}

function snapOffset(current: number, velocity: number) {
  if (Math.abs(velocity) > FLING_VELOCITY) {
    return velocity > 0
      ? Math.ceil(current + 0.04)
      : Math.floor(current - 0.04);
  }
  return Math.round(current);
}

function wheelUnit() {
  return Math.max(window.innerHeight * 0.7, 1);
}

function swipeUnit(axis: "x" | "y") {
  return axis === "x"
    ? Math.max(window.innerWidth * 0.34, 112)
    : Math.max(window.innerHeight * 0.4, 128);
}

export function GalleryIndex({ works: allWorks }: { works: GalleryWork[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const overlayLock = useRef(false);
  const [overlayFrame, setOverlayFrame] = useState<HTMLElement | null>(null);
  const overlaySlideRef = useRef(0);
  const displayRef = useRef(0);
  const targetRef = useRef(0);
  const draggingRef = useRef(false);
  const skipClickRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const animRef = useRef<{
    from: number;
    to: number;
    start: number;
    duration: number;
  } | null>(null);
  const gestureRef = useRef({
    active: false,
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    lastT: 0,
    axis: null as "x" | "y" | null,
    velocity: 0,
    moved: 0,
  });
  const overlayGestureRef = useRef({
    active: false,
    x: 0,
    y: 0,
    lastT: 0,
    axis: null as "x" | "y" | null,
    vx: 0,
  });

  const [filter, setFilter] = useState<Filter>("ALL");
  const [offset, setOffset] = useState(0);
  const [frontIndex, setFrontIndex] = useState<number | null>(null);
  const [slide, setSlideState] = useState(0);
  const [slideAnimate, setSlideAnimate] = useState(false);

  const setSlide = useCallback((value: number) => {
    overlaySlideRef.current = value;
    setSlideState(value);
  }, []);

  const works = useMemo(
    () => visibleWorksFor(allWorks, filter),
    [allWorks, filter],
  );
  const count = works.length;

  const setDisplay = useCallback((value: number) => {
    displayRef.current = value;
    setOffset(value);
  }, []);

  const stopSettle = useCallback(() => {
    animRef.current = null;
  }, []);

  const kickSettle = useCallback(() => {
    if (rafRef.current != null) return;
    const step = (now: number) => {
      rafRef.current = null;
      const anim = animRef.current;
      if (!anim || draggingRef.current) return;
      const t = Math.min((now - anim.start) / anim.duration, 1);
      const value = anim.from + (anim.to - anim.from) * easeSoft(t);
      setDisplay(t < 1 ? value : anim.to);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        animRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, [setDisplay]);

  const settleTo = useCallback(
    (next: number) => {
      targetRef.current = next;
      if (prefersReducedMotion()) {
        stopSettle();
        setDisplay(next);
        return;
      }
      animRef.current = {
        from: displayRef.current,
        to: next,
        start: performance.now(),
        duration: SETTLE_MS,
      };
      kickSettle();
    },
    [kickSettle, setDisplay, stopSettle],
  );

  const nudgeLive = useCallback(
    (delta: number) => {
      if (count <= 1) return;
      stopSettle();
      const next = displayRef.current + delta;
      targetRef.current = next;
      setDisplay(next);
    },
    [count, setDisplay, stopSettle],
  );

  const stepList = useCallback(
    (delta: 1 | -1) => {
      if (count <= 1) return;
      settleTo(Math.round(targetRef.current) + delta);
    },
    [count, settleTo],
  );

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onWheel = (event: WheelEvent) => {
      if (frontIndex != null || count <= 1) return;
      event.preventDefault();
      const useX = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      nudgeLive((useX ? event.deltaX : event.deltaY) / wheelUnit());
    };

    const onTouchStart = (event: TouchEvent) => {
      if (frontIndex != null || count <= 1) return;
      if (isGalleryChrome(event.target)) return;
      const touch = event.touches[0];
      if (!touch) return;
      draggingRef.current = true;
      skipClickRef.current = false;
      stopSettle();
      gestureRef.current = {
        active: true,
        x: touch.clientX,
        y: touch.clientY,
        lastX: touch.clientX,
        lastY: touch.clientY,
        lastT: performance.now(),
        axis: null,
        velocity: 0,
        moved: 0,
      };
    };

    const onTouchMove = (event: TouchEvent) => {
      const gesture = gestureRef.current;
      if (!gesture.active || frontIndex != null || count <= 1) return;
      const touch = event.touches[0];
      if (!touch) return;
      const x = touch.clientX;
      const y = touch.clientY;
      const dx = x - gesture.lastX;
      const dy = y - gesture.lastY;
      if (gesture.axis == null) {
        const totalX = x - gesture.x;
        const totalY = y - gesture.y;
        if (Math.hypot(totalX, totalY) < AXIS_LOCK_PX) return;
        gesture.axis = Math.abs(totalX) > Math.abs(totalY) ? "x" : "y";
      }
      event.preventDefault();
      const now = performance.now();
      const dt = Math.max(now - gesture.lastT, 1);
      const pixel = gesture.axis === "x" ? -dx : -dy;
      const delta = pixel / swipeUnit(gesture.axis);
      gesture.velocity = gesture.velocity * 0.62 + (delta / dt) * 0.38;
      gesture.moved += Math.abs(pixel);
      gesture.lastX = x;
      gesture.lastY = y;
      gesture.lastT = now;
      if (gesture.moved > 10) skipClickRef.current = true;
      nudgeLive(delta);
    };

    const onTouchEnd = () => {
      const gesture = gestureRef.current;
      if (!gesture.active) return;
      gesture.active = false;
      draggingRef.current = false;
      if (count <= 1) return;
      settleTo(snapOffset(displayRef.current, gesture.velocity));
      if (gesture.moved > 10) {
        skipClickRef.current = true;
        window.setTimeout(() => {
          skipClickRef.current = false;
        }, 400);
      }
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchmove", onTouchMove, { passive: false });
    stage.addEventListener("touchend", onTouchEnd);
    stage.addEventListener("touchcancel", onTouchEnd);
    return () => {
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
      stage.removeEventListener("touchend", onTouchEnd);
      stage.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [count, frontIndex, nudgeLive, settleTo, stopSettle]);

  const selectFilter = (next: Filter) => {
    setFilter(next);
    setFrontIndex(null);
    stopSettle();
    draggingRef.current = false;
    targetRef.current = 0;
    setDisplay(0);
    setSlide(0);
    window.scrollTo(0, 0);
  };

  const openWork = (index: number) => {
    if (skipClickRef.current) {
      skipClickRef.current = false;
      return;
    }
    setFrontIndex(index);
    setSlide(0);
    setSlideAnimate(false);
  };

  const stepFront = useCallback(
    (delta: 1 | -1) => {
      if (count <= 1 || overlayLock.current || frontIndex == null) return;
      overlayLock.current = true;
      setSlideAnimate(true);
      setSlide(-delta);
      window.setTimeout(() => {
        setFrontIndex((current) =>
          current == null ? current : wrapIndex(current + delta, count),
        );
        setSlideAnimate(false);
        setSlide(0);
        overlayLock.current = false;
      }, prefersReducedMotion() ? 0 : OVERLAY_MS);
    },
    [count, frontIndex, setSlide],
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

  useEffect(() => {
    if (frontIndex == null || count <= 1) return;
    const frame = overlayFrame;
    if (!frame) return;

    const onStart = (event: TouchEvent) => {
      if (overlayLock.current) return;
      if (event.target instanceof Element && event.target.closest("button, a")) {
        return;
      }
      const touch = event.touches[0];
      if (!touch) return;
      overlayGestureRef.current = {
        active: true,
        x: touch.clientX,
        y: touch.clientY,
        lastT: performance.now(),
        axis: null,
        vx: 0,
      };
    };

    const onMove = (event: TouchEvent) => {
      const gesture = overlayGestureRef.current;
      if (!gesture.active || overlayLock.current) return;
      const touch = event.touches[0];
      if (!touch) return;
      const dx = touch.clientX - gesture.x;
      const dy = touch.clientY - gesture.y;
      if (gesture.axis == null) {
        if (Math.hypot(dx, dy) < AXIS_LOCK_PX) return;
        gesture.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }
      if (gesture.axis !== "x") return;
      event.preventDefault();
      const width = Math.max(frame.getBoundingClientRect().width, 1);
      const now = performance.now();
      const dt = Math.max(now - gesture.lastT, 1);
      gesture.vx = gesture.vx * 0.62 + (dx / dt) * 0.38;
      gesture.lastT = now;
      setSlideAnimate(false);
      setSlide(Math.max(-1, Math.min(1, dx / width)));
    };

    const onEnd = () => {
      const gesture = overlayGestureRef.current;
      if (!gesture.active) return;
      gesture.active = false;
      if (overlayLock.current) return;
      const currentSlide = overlaySlideRef.current;
      const shouldStep =
        Math.abs(currentSlide) >= OVERLAY_COMMIT ||
        Math.abs(gesture.vx) >= OVERLAY_FLING;
      if (shouldStep && (currentSlide !== 0 || gesture.vx !== 0)) {
        const dir =
          Math.abs(gesture.vx) >= OVERLAY_FLING
            ? -Math.sign(gesture.vx)
            : -Math.sign(currentSlide);
        if (dir === 1 || dir === -1) {
          stepFront(dir);
          return;
        }
      }
      setSlideAnimate(true);
      setSlide(0);
    };

    frame.addEventListener("touchstart", onStart, { passive: true });
    frame.addEventListener("touchmove", onMove, { passive: false });
    frame.addEventListener("touchend", onEnd);
    frame.addEventListener("touchcancel", onEnd);
    return () => {
      frame.removeEventListener("touchstart", onStart);
      frame.removeEventListener("touchmove", onMove);
      frame.removeEventListener("touchend", onEnd);
      frame.removeEventListener("touchcancel", onEnd);
    };
  }, [count, frontIndex, overlayFrame, setSlide, stepFront]);

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
  const currentNo = count ? wrapIndex(Math.round(offset), count) + 1 : 0;

  return (
    <div
      ref={stageRef}
      className="gallery-stage relative h-[calc(100svh-72px)] overflow-hidden overscroll-contain md:h-[calc(100svh-88px)] lg:h-[calc(100svh-96px)]"
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
            data-gallery-chrome
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

      {count > 0 ? (
        <div className="gallery-pager" role="group" aria-label="作品送り" data-gallery-chrome>
          <button
            type="button"
            className="gallery-pager__btn"
            onClick={() => stepList(-1)}
            aria-label="前の作品"
            disabled={count <= 1}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M10 3 5 8l5 5" />
            </svg>
          </button>
          <p className="gallery-pager__count ff-en text-[16px]" aria-live="polite">
            {currentNo} / {count}
          </p>
          <button
            type="button"
            className="gallery-pager__btn"
            onClick={() => stepList(1)}
            aria-label="次の作品"
            disabled={count <= 1}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path fill="none" stroke="currentColor" strokeWidth="1.5" d="m6 3 5 5-5 5" />
            </svg>
          </button>
        </div>
      ) : null}

      {front && overlaySlides.length === 3 ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-white/70 px-4 backdrop-blur-[2px]"
          onClick={() => setFrontIndex(null)}
        >
          <figure
            ref={setOverlayFrame}
            className="gallery-overlay-frame relative w-full max-w-[520px]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 shadow-[0_24px_56px_rgba(0,0,0,0.18)]">
              <div
                className="absolute inset-0 flex"
                style={{
                  width: "300%",
                  transform: `translateX(${(-1 + slide) * (100 / 3)}%)`,
                  transition: slideAnimate
                    ? `transform ${OVERLAY_MS}ms ${EASE_SOFT}`
                    : "none",
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
              <div className="mt-8 flex items-center justify-between gap-8" data-gallery-chrome>
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
