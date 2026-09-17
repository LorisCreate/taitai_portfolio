"use client";

import Script from "next/script";
import { useEffect } from "react";
import { site } from "@/lib/site";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (el?: HTMLElement) => void;
      };
    };
  }
}

export function XTimeline() {
  useEffect(() => {
    window.twttr?.widgets.load();
  }, []);

  return (
    <div className="min-h-[420px] overflow-hidden">
      <a
        className="twitter-timeline"
        data-height="520"
        data-theme="light"
        data-chrome="nofooter transparent"
        href={site.x}
      >
        @taitai_pon
      </a>
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
        onLoad={() => window.twttr?.widgets.load()}
      />
    </div>
  );
}
