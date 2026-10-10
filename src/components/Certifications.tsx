"use client";

import Image from "next/image";
import { useRef } from "react";
import { certifications } from "@/lib/data";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

export default function Certifications() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".cert-head", {
        y: 36,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });

      gsap.from(".cert-card", {
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
    },
    { scope: root },
  );

  return (
    <section id="certifications" ref={root} className="py-24 md:py-32">
      <div className="site-container">
        <div className="cert-head mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="section-label">Credentials</p>
            <h2 className="display mt-3 max-w-[14ch] text-4xl md:text-5xl">
              Certifications
            </h2>
          </div>
          <p className="max-w-sm text-ink-soft">
            Formal training that supports the product, motion, and engineering
            work on this site.
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert) => (
            <li
              key={cert.id}
              className="cert-card overflow-hidden rounded-2xl border border-line bg-white"
            >
              <div className="relative aspect-[4/3] bg-[#f4f4f5]">
                <Image
                  src={cert.image}
                  alt={cert.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="border-t border-line px-5 py-5">
                <p className="section-label">{cert.issuer}</p>
                <h3 className="mt-2 text-lg font-medium leading-snug">
                  {cert.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">{cert.year}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {cert.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
