"use client";

import { useRef } from "react";
import { experience } from "@/lib/data";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".exp-row", {
        x: -24,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="pb-24 md:pb-32">
      <div className="site-container">
        <div className="mb-10 flex items-end justify-between border-b border-line pb-6">
          <h2 className="display text-4xl md:text-5xl">Experience</h2>
          <p className="section-label hidden md:block">2017 — Present</p>
        </div>
        <ul>
          {experience.map((item) => (
            <li
              key={item.org}
              className="exp-row grid gap-2 border-b border-line py-8 md:grid-cols-[180px_1fr_1.2fr] md:gap-10"
            >
              <p className="text-sm tracking-[0.12em] text-ink-soft uppercase">
                {item.period}
              </p>
              <div>
                <p className="display text-2xl">{item.role}</p>
                <p className="mt-1 text-ink-soft">{item.org}</p>
              </div>
              <p className="text-ink-soft md:max-w-md">{item.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
