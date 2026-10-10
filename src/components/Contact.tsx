"use client";

import { FormEvent, useRef, useState } from "react";
import { site, socials } from "@/lib/data";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      gsap.from(".contact-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.95,
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root },
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" ref={root} className="pb-10">
      <div className="site-container overflow-hidden rounded-[32px] bg-ink px-6 py-14 text-bg md:px-14 md:py-20">
        <p className="contact-reveal text-[11px] tracking-[0.22em] uppercase opacity-70">
          Contact
        </p>
        <h2 className="contact-reveal display mt-4 max-w-[12ch] text-5xl md:text-7xl">
          Let’s make something quiet and excellent.
        </h2>
        <p className="contact-reveal mt-6 max-w-lg text-lg text-bg/70">
          New collaborations start with a short note. Share the product, the
          timeline, and what “done well” looks like.
        </p>

        <div className="mt-12 grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <form className="contact-reveal space-y-6" onSubmit={onSubmit}>
            <label className="block">
              <span className="text-[11px] tracking-[0.18em] uppercase opacity-60">
                Name
              </span>
              <input
                required
                name="name"
                className="mt-2 w-full border-b border-bg/20 bg-transparent py-3 outline-none placeholder:text-bg/30"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="text-[11px] tracking-[0.18em] uppercase opacity-60">
                Email
              </span>
              <input
                required
                type="email"
                name="email"
                className="mt-2 w-full border-b border-bg/20 bg-transparent py-3 outline-none placeholder:text-bg/30"
                placeholder="you@studio.com"
              />
            </label>
            <label className="block">
              <span className="text-[11px] tracking-[0.18em] uppercase opacity-60">
                Project
              </span>
              <textarea
                required
                name="message"
                rows={3}
                className="mt-2 w-full resize-none border-b border-bg/20 bg-transparent py-3 outline-none placeholder:text-bg/30"
                placeholder="What are we making?"
              />
            </label>
            <button
              type="submit"
              className="mt-4 rounded-full bg-bg px-8 py-4 text-[12px] tracking-[0.18em] text-ink uppercase"
            >
              {sent ? "Received — thank you" : "Send inquiry"}
            </button>
          </form>

          <div className="contact-reveal flex flex-col justify-between gap-10">
            <div>
              <p className="text-[11px] tracking-[0.18em] uppercase opacity-60">
                Direct
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 block display text-2xl md:text-3xl"
              >
                {site.email}
              </a>
              <p className="mt-6 text-bg/70">{site.location}</p>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[12px] tracking-[0.16em] uppercase">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <footer className="site-container flex flex-col gap-3 py-8 text-[11px] tracking-[0.16em] text-ink-soft uppercase md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p>Built with Next.js + GSAP</p>
      </footer>
    </section>
  );
}
