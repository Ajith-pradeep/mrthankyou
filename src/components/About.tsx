"use client";

import Image from "next/image";
import { useRef } from "react";
import { site } from "@/lib/data";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-reveal", {
        y: 48,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
        },
      });

      gsap.to(".about-portrait", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className="py-24 md:py-36">
      <div className="site-container grid items-start gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        <div className="about-reveal overflow-hidden rounded-[28px] border border-line bg-white">
          <div className="about-portrait relative aspect-[4/5]">
            <Image
              src={site.portrait.src}
              alt={site.portrait.alt}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover object-[center_20%]"
            />
          </div>
        </div>

        <div>
          <p className="about-reveal section-label">About</p>
          <h2 className="about-reveal display mt-4 max-w-[14ch] text-4xl md:text-6xl">
            A practice built on restraint, not spectacle.
          </h2>
          <p className="about-reveal mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
            I partner with founders and product teams when the work has to feel
            premium and still convert. That means fewer effects, stronger type,
            and motion that earns its place — usually with GSAP, always with
            intention.
          </p>
          <p className="about-reveal mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Previously at North & Co. and Vanta Labs. Today I take a small
            number of projects a year so the craft stays high and the
            collaboration stays close.
          </p>

          <dl className="about-reveal mt-12 grid grid-cols-2 gap-8 border-t border-line pt-8">
            <div>
              <dt className="section-label">Focus</dt>
              <dd className="mt-2 text-lg">Web products, brand sites, systems</dd>
            </div>
            <div>
              <dt className="section-label">Currently</dt>
              <dd className="mt-2 text-lg">Booking Q4 2026</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
