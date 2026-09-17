"use client";

import { useEffect, useState } from "react";
import { heroImages, site } from "@/lib/site";

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
      <div
        className="hero-tai-mask relative w-full overflow-hidden"
        role="img"
        aria-label="TAI"
      >
        {heroImages.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1600ms] ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>
      <p className="ff-en mt-3 text-[11px] tracking-[0.16em] text-black md:text-[13px] whitespace-pre-line">
        {site.tagline}
      </p>
    </div>
  );
}
