"use client";

import { useRef } from "react";
import { services } from "@/lib/data";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

export default function Expertise() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".skill-card", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <section id="expertise" ref={root} className="py-24 md:py-32">
      <div className="site-container">
        <p className="section-label">Expertise</p>
        <h2 className="display mt-3 max-w-[16ch] text-4xl md:text-6xl">
          Four ways I usually enter a project.
        </h2>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line md:grid-cols-2">
          {services.map((service, i) => (
            <article
              key={service.title}
              className="skill-card bg-bg-elevated p-8 md:p-12"
            >
              <span className="font-serif text-ink-soft">0{i + 1}</span>
              <h3 className="display mt-8 text-3xl md:text-4xl">{service.title}</h3>
              <p className="mt-4 max-w-sm text-ink-soft">{service.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
