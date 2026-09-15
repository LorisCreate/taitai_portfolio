"use client";

import { useState } from "react";
import { works } from "@/lib/site";

export function WorksSlider() {
  const [index, setIndex] = useState(0);
  const work = works[index];

  return (
    <div className="relative">
      <div
        className="h-[260px] w-full bg-cover bg-center md:h-[400px]"
        style={{ backgroundImage: `url(${work.image})` }}
      />
      <div className="mt-6 md:mt-8">
        <p className="ff-en text-[42px] leading-none tracking-[0.2em] md:text-[70px]">
          {work.id}
        </p>
        <div className="mt-3 flex flex-col gap-1 md:mt-4 md:flex-row md:items-end md:justify-between">
          <p className="ff-en text-[22px] tracking-[0.18em] md:text-[32px]">
            {work.title}
          </p>
          <p className="ff-en text-[13px] tracking-[0.12em] md:text-[15px]">
            {work.meta}
          </p>
        </div>
        <p className="mt-4 max-w-3xl text-[13px] leading-[2.1] tracking-[0.08em] md:text-[14px]">
          {work.body}
        </p>
      </div>
      <div className="mt-8 hidden gap-8 md:flex">
        <button
          type="button"
          className="ff-en text-[13px] tracking-[0.16em]"
          onClick={() =>
            setIndex((current) => (current - 1 + works.length) % works.length)
          }
        >
          ← prev
        </button>
        <button
          type="button"
          className="ff-en text-[13px] tracking-[0.16em]"
          onClick={() => setIndex((current) => (current + 1) % works.length)}
        >
          next →
        </button>
      </div>
      <div className="mt-6 flex gap-2 md:hidden">
        {works.map((item, i) => (
          <button
            key={item.id}
            type="button"
            aria-label={`${item.title}を表示`}
            className={`h-1.5 flex-1 ${i === index ? "bg-black" : "bg-neutral-200"}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
