"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function HeroSlider({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <section className="hero-fv" aria-label="メインビジュアル">
      <div className="hero-fv__gutter" aria-hidden="true">
        <span className="hero-fv__mark ff-mi">{site.person}</span>
      </div>

      <div className="hero-fv__frame">
        {images.map((src, i) => (
          <div
            key={src}
            className={`hero-fv__slide ${
              i === index ? "hero-slide-active" : "hero-slide-idle"
            }`}
            style={{ backgroundImage: `url(${src})`, zIndex: i === index ? 1 : 0 }}
          />
        ))}
      </div>

      <p className="hero-fv__tagline ff-en">{site.tagline}</p>
    </section>
  );
}
