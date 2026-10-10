"use client";

import { useRef } from "react";
import { marquee } from "@/lib/data";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = root.current?.querySelector(".marquee-track");
      if (!track) return;
      gsap.to(track, {
        xPercent: -50,
        duration: 28,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: root },
  );

  const items = [...marquee, ...marquee];

  return (
    <div ref={root} className="overflow-hidden border-y border-line py-5">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10">
            <span className="display text-3xl text-ink md:text-5xl">{item}</span>
            <span className="h-2 w-2 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
