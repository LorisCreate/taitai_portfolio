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
    <div className="relative h-[280px] w-full overflow-hidden md:h-[500px] lg:h-[700px]">
      {heroImages.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1600ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      <p className="ff-en absolute bottom-[-6px] left-0 text-[11px] tracking-[0.16em] text-black md:bottom-[-10px] md:text-[13px] whitespace-pre-line">
        {site.tagline}
      </p>
    </div>
  );
}
