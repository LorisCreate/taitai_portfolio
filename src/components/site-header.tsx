"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { InstagramIcon } from "@/components/instagram-icon";
import { navItems, site } from "@/lib/site";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.59l-5.16-6.74L5.2 22H1.93l8.02-9.16L1.5 2h6.76l4.66 6.18L18.244 2zm-1.16 18.12h1.83L7.01 3.78H5.05l12.034 16.34z" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 ${
          open || !isHome || scrolled ? "bg-washi" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6 md:h-[88px] md:px-8 lg:h-[96px]">
          <Link
            href="/"
            className="text-[16px] font-normal leading-8 tracking-[0.2em]"
            onClick={() => setOpen(false)}
          >
            {site.person}
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="ff-en group relative inline-block text-[16px] leading-8 tracking-[0.14em]"
                    >
                      {item.label}
                      <span
                        className={`absolute top-1/2 -right-4 h-2 w-2 -translate-y-1/2 bg-black transition-transform duration-300 ${
                          active
                            ? "scale-100"
                            : "scale-0 group-hover:scale-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-4 pl-2">
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-black transition-opacity hover:opacity-55"
              >
                <InstagramIcon className="h-6 w-6" />
              </a>
              <a
                href={site.x}
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="text-black transition-opacity hover:opacity-55"
              >
                <XIcon className="h-6 w-6" />
              </a>
            </div>
          </nav>

          <button
            type="button"
            className="relative z-[60] flex min-w-[40px] flex-col items-center justify-center gap-2 lg:hidden"
            aria-label={open ? "close" : "open"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <span className="relative block h-4 w-4" aria-hidden="true">
                <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 rotate-45 bg-black" />
                <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 -rotate-45 bg-black" />
              </span>
            ) : (
              <span className="flex h-4 w-4 flex-col justify-between" aria-hidden="true">
                <span className="h-[1.5px] w-full bg-black" />
                <span className="h-[1.5px] w-full bg-black" />
              </span>
            )}
            <span className="ff-en text-[8px] leading-none tracking-[0.18em]">
              {open ? "close" : "open"}
            </span>
          </button>
        </div>
      </header>

      {open ? (
        <div className="bg-washi fixed inset-0 z-40 pt-[72px] lg:hidden">
          <nav className="flex h-full flex-col items-center px-8 pt-10 text-center">
            <ul className="space-y-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="ff-en text-[24px] leading-8 tracking-[0.16em]"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-12 flex items-center justify-center gap-6">
              <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <InstagramIcon className="h-6 w-6" />
              </a>
              <a href={site.x} target="_blank" rel="noreferrer" aria-label="X">
                <XIcon className="h-6 w-6" />
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
