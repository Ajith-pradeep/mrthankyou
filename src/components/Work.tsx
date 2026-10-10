"use client";

import Image from "next/image";
import { useRef } from "react";
import { projects } from "@/lib/data";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".work-head", {
        y: 40,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });

      gsap.utils.toArray<HTMLElement>(".work-item").forEach((item) => {
        gsap.from(item, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          scrollTrigger: { trigger: item, start: "top 85%" },
        });

        const media = item.querySelector(".work-media");
        const image = item.querySelector(".work-preview");

        item.addEventListener("mouseenter", () => {
          gsap.to(image, { scale: 1.06, duration: 0.8, ease: "power3.out" });
          gsap.to(media, { y: -4, duration: 0.5, ease: "power3.out" });
        });
        item.addEventListener("mouseleave", () => {
          gsap.to(image, { scale: 1, duration: 0.8, ease: "power3.out" });
          gsap.to(media, { y: 0, duration: 0.5, ease: "power3.out" });
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="work" ref={root} className="py-10 md:py-16">
      <div className="site-container">
        <div className="work-head mb-8 flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-end">
          <div>
            <p className="section-label">Selected work</p>
            <h2 className="display mt-3 text-4xl md:text-5xl">Case studies</h2>
          </div>
          <p className="max-w-sm text-ink-soft">
            A few recent collaborations. Each one shipped — not a concept deck.
          </p>
        </div>

        <ul>
          {projects.map((project, index) => (
            <li
              key={project.id}
              className="work-item grid items-center gap-6 border-b border-line py-8 md:grid-cols-[220px_1fr] md:gap-10 md:py-10"
            >
              <div
                className="work-media relative aspect-[16/10] w-full max-w-[220px] overflow-hidden rounded-2xl"
                style={{ background: project.accent }}
              >
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="220px"
                  className="work-preview object-cover"
                  priority={index === 0}
                />
              </div>

              <div className="work-copy">
                <p className="text-sm tracking-[0.14em] text-ink-soft uppercase">
                  {project.id} · {project.category} · {project.year}
                </p>
                <h3 className="display mt-2 text-3xl md:text-4xl">{project.title}</h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
                  {project.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 text-[11px] tracking-[0.12em] uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
