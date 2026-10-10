"use client";

import { useRef } from "react";
import Magnetic from "@/components/Magnetic";
import { site } from "@/lib/data";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

type Props = { ready: boolean };

function splitWords(text: string) {
  return text.split(" ").map((word, i) => (
    <span key={`${word}-${i}`} className="word mr-[0.18em]">
      <span className="char hero-char inline-block translate-y-[110%]">
        {word}
      </span>
    </span>
  ));
}

export default function Hero({ ready }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ready) return;
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(".hero-char", {
        y: "0%",
        duration: 1.15,
        stagger: 0.045,
      })
        .from(
          ".hero-meta",
          { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 },
          0.45,
        )
        .from(".hero-line", { scaleX: 0, duration: 1.1 }, 0.5);
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-end pb-14 pt-28"
    >
      <div className="site-container">
        <div className="mb-10 flex flex-col gap-3 text-[11px] tracking-[0.22em] uppercase md:flex-row md:items-center md:justify-between">
          <p className="hero-meta text-ink-soft">
            {site.name} · {site.role}
          </p>
          <p className="hero-meta text-ink-soft">{site.location}</p>
        </div>

        <h1 className="display max-w-[16ch] text-[16vw] text-ink sm:text-[12vw] md:text-[8.4vw]">
          {splitWords("Designing clarity into product.")}
        </h1>

        <div className="hero-line mt-10 h-px origin-left bg-line" />

        <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <p className="hero-meta max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
            I help ambitious teams ship interfaces that feel considered —
            editorial, precise, and quietly cinematic. Strategy, design, and
            motion in one practice.
          </p>

          <div className="hero-meta flex items-center justify-between gap-6 md:justify-end">
            <Magnetic>
              <a
                href="#work"
                className="flex h-28 w-28 items-center justify-center rounded-full border border-line text-center text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 hover:bg-ink hover:text-bg"
              >
                Selected
                <br />
                work
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
