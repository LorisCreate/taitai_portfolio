import Link from "next/link";
import { navItems, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 pb-16 md:mt-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <div className="hidden items-end justify-between border-t border-black pt-10 md:flex">
          <Link href="/" className="ff-en text-[13px] leading-[1.85] tracking-[0.12em]">
            <span className="block">{site.name}</span>
            <span className="block">{site.person}</span>
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
          <p className="ff-en hidden md:block">instagram　/　x</p>
        </div>
      </div>
    </footer>
  );
}
