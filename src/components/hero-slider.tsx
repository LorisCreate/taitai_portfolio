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
    <section className="hero-fv" aria-label="メインビジュアル">
      <div className="hero-fv__gutter" aria-hidden="true">
        <span className="hero-fv__mark ff-mi">{site.person}</span>
      </div>

      <div className="hero-fv__frame">
        {heroImages.map((src, i) => (
          <div
            key={src}
            className={`hero-fv__slide ${
              i === index ? "hero-slide-active" : "hero-slide-idle"
            }`}
            style={{ backgroundImage: `url(${src})`, zIndex: i === index ? 1 : 0 }}
          />
        ))}
        <div className="hero-fv__veil" />
      </div>

      <p className="hero-fv__tagline ff-en">{site.tagline}</p>
    </section>
  );
}
