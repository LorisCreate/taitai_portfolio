"use client";

import { useEffect, useRef, useState } from "react";

const SCREEN_NAME = "taitai_pon";
const WIDGETS_SRC = "https://platform.twitter.com/widgets.js";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        createTimeline: (
          source: { sourceType: string; screenName: string },
          element: HTMLElement,
          options?: Record<string, string | number | boolean>,
        ) => Promise<HTMLElement | undefined>;
      };
      ready: (callback: () => void) => void;
    };
  }
}

function loadTwitterWidgets() {
  return new Promise<NonNullable<Window["twttr"]>>((resolve, reject) => {
    const finish = () => {
      if (window.twttr?.ready) {
        window.twttr.ready(() => {
          if (window.twttr) resolve(window.twttr);
        });
        return;
      }
      reject(new Error("Twitter widgets unavailable"));
    };

    if (window.twttr?.widgets) {
      finish();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${WIDGETS_SRC}"]`,
    );

    if (existing) {
      existing.addEventListener("load", finish, { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load widgets.js")),
        { once: true },
      );
      const poll = window.setInterval(() => {
        if (window.twttr?.widgets) {
          window.clearInterval(poll);
          finish();
        }
      }, 120);
      window.setTimeout(() => {
        window.clearInterval(poll);
        if (!window.twttr?.widgets) {
          reject(new Error("Twitter widgets timeout"));
        }
      }, 10000);
      return;
    }

    const script = document.createElement("script");
    script.src = WIDGETS_SRC;
    script.async = true;
    script.charset = "utf-8";
    script.addEventListener("load", finish, { once: true });
    script.addEventListener(
      "error",
      () => reject(new Error("Failed to load widgets.js")),
      { once: true },
    );
    document.head.appendChild(script);
  });
}

export function XTimeline() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle",
  );

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cancelled = false;
    let started = false;
    let startTimer: number | undefined;
    let mutations: MutationObserver | undefined;

    const start = () => {
      if (started || cancelled || !mountRef.current) return;
      started = true;
      setStatus("loading");

      void loadTwitterWidgets()
        .then((twttr) => {
          if (cancelled || !mountRef.current) return undefined;
          mountRef.current.replaceChildren();
          return twttr.widgets.createTimeline(
            { sourceType: "profile", screenName: SCREEN_NAME },
            mountRef.current,
            {
              height: 520,
              chrome: "nofooter transparent",
              lang: "ja",
              dnt: true,
            },
          );
        })
        .then((widget) => {
          if (cancelled) return;
          setStatus(widget ? "ready" : "error");
        })
        .catch(() => {
          if (!cancelled) setStatus("error");
        });
    };

    const afterSlideup = () => {
      const parent = mount.closest(".view-slideup");
      if (!parent || parent.classList.contains("on")) {
        startTimer = window.setTimeout(start, 240);
        return;
      }
      mutations = new MutationObserver(() => {
        if (parent.classList.contains("on")) {
          mutations?.disconnect();
          startTimer = window.setTimeout(start, 240);
        }
      });
      mutations.observe(parent, { attributes: true, attributeFilter: ["class"] });
    };

    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        visibility.disconnect();
        afterSlideup();
      },
      { threshold: 0.05, rootMargin: "160px 0px" },
    );
    visibility.observe(mount);

    return () => {
      cancelled = true;
      visibility.disconnect();
      mutations?.disconnect();
      if (startTimer) window.clearTimeout(startTimer);
      mount.replaceChildren();
    };
  }, []);

  return (
    <div className="w-full">
      {status !== "ready" ? (
        <p className="mb-3 text-[12px] tracking-[0.08em] text-neutral-500">
          {status === "error" ? (
            <>
              タイムラインを読み込めませんでした。
              <a
                className="ml-2 underline"
                href={`https://x.com/${SCREEN_NAME}`}
                target="_blank"
                rel="noreferrer"
              >
                @{SCREEN_NAME} をXで見る
              </a>
            </>
          ) : (
            "タイムラインを読み込み中…"
          )}
        </p>
      ) : null}
      <div
        ref={mountRef}
        className="min-h-[520px] w-full overflow-hidden"
        aria-label={`@${SCREEN_NAME} のXタイムライン`}
      />
    </div>
  );
}
