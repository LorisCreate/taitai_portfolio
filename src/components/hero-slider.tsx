"use client";

import { useEffect, useState } from "react";
import { heroImages, site } from "@/lib/site";

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroImages.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative h-[280px] w-full overflow-hidden md:h-[500px] lg:h-[700px]">
      {heroImages.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center ${
            i === index ? "hero-slide-active" : "hero-slide-idle"
          }`}
          style={{ backgroundImage: `url(${src})`, zIndex: i === index ? 1 : 0 }}
        />
      ))}
      <p className="ff-en absolute bottom-[-6px] left-0 z-10 text-[11px] tracking-[0.16em] text-black md:bottom-[-10px] md:text-[13px] whitespace-pre-line">
        {site.tagline}
      </p>
    </div>
  );
}
