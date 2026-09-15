"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "div" | "section";
};

export function Reveal({ children, className = "", id, as = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const classes = `view-slideup${visible ? " on" : ""} ${className}`.trim();
  const bind = (node: HTMLElement | null) => {
    ref.current = node;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (as === "section") {
    return (
      <section id={id} ref={bind} className={classes}>
        {children}
      </section>
    );
  }

  return (
    <div id={id} ref={bind} className={classes}>
      {children}
    </div>
  );
}
