"use client";

import { useRef, useState } from "react";
import { navLinks, site } from "@/lib/data";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

type Props = { ready: boolean };

export default function Nav({ ready }: Props) {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      if (!ready) return;
      gsap.fromTo(
        ".nav-item",
        { y: -16, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.85, stagger: 0.07, overwrite: true },
      );
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <>
      <header
        ref={root}
        className={`fixed top-0 right-0 left-0 z-50 ${
          open ? "border-transparent bg-transparent" : "border-b border-line/60 bg-bg/90"
        }`}
      >
        <div className="site-container flex items-center justify-between py-5">
          <a
            href="#top"
            className={`nav-item font-sans text-sm font-semibold tracking-[0.28em] uppercase ${
              open ? "text-bg" : "text-ink"
            }`}
          >
            {site.initials}
          </a>

          <nav className="nav-item hidden items-center gap-8 text-[12px] font-medium tracking-[0.18em] text-ink uppercase md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-item hidden items-center gap-3 text-ink md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7dbe74]" />
            <span className="text-[11px] tracking-[0.16em] uppercase">
              {site.availability}
            </span>
          </div>

          <button
            type="button"
            className={`nav-item relative z-[60] text-[12px] tracking-[0.2em] uppercase md:hidden ${
              open ? "text-bg" : "text-ink"
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-ink px-6 pt-28 pb-10 md:hidden">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="display text-4xl text-bg sm:text-5xl"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
