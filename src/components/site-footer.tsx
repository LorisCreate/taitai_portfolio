import Link from "next/link";
import { navItems, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="section-veil mt-24 pb-16 md:mt-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <div className="hidden items-end justify-between border-t border-black pt-10 md:flex">
          <Link href="/" className="text-[14px] font-normal tracking-[0.2em]">
            {site.person}
          </Link>
          <ul className="flex gap-8 text-[13px] tracking-[0.12em]">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="ff-en hover:opacity-55">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-black pt-8 text-[11px] tracking-[0.08em] text-black md:flex-row md:items-center md:justify-between">
          <p className="ff-en">
            Copyright © {site.person}, All rights reserved.
          </p>
          <p className="ff-en hidden md:block">
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-55"
            >
              instagram
            </a>
            　/　
            <a href={site.x} target="_blank" rel="noreferrer" className="hover:opacity-55">
              x
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
