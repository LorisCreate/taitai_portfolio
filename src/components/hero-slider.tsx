"use client";

import { Fredoka } from "next/font/google";
import { useEffect, useState } from "react";
import { heroImages, site } from "@/lib/site";

const rounded = Fredoka({
  subsets: ["latin"],
  weight: ["700"],
});

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroImages.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 1200 620"
        className={`${rounded.className} h-auto w-full overflow-visible`}
        role="img"
        aria-label="TAI"
      >
        <defs>
          <mask id="hero-tai-mask" maskUnits="userSpaceOnUse">
            <rect width="1200" height="620" fill="black" />
            <text
              x="600"
              y="338"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#fff"
              stroke="#fff"
              strokeLinejoin="round"
              strokeLinecap="round"
              paintOrder="stroke fill"
              style={{
                fontFamily: rounded.style.fontFamily,
                fontWeight: 700,
                fontSize: 460,
                letterSpacing: "-0.07em",
                strokeWidth: 36,
              }}
            >
              TAI
            </text>
          </mask>
        </defs>
        {heroImages.map((src, i) => (
          <image
            key={src}
            href={src}
            width="1200"
            height="620"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#hero-tai-mask)"
            className="origin-center transition-opacity duration-[1600ms] ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}
      </svg>
      <p className="ff-en mt-3 text-[11px] tracking-[0.16em] text-black md:text-[13px] whitespace-pre-line">
        {site.tagline}
      </p>
    </div>
  );
}
