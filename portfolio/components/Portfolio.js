"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/* ───────── EDIT YOUR CONTENT HERE ───────── */
const ME = {
  first: "Anika",
  last: "Nair",
  email: "hello@anikanair.dev",
  intro: "Creative developer building interfaces that move with intent.",
  about:
    "I design and build websites where motion carries the story: fast, accessible, and a little unexpected. Seven years across studios, startups and cultural clients.",
  facts: [
    ["Based in", "Thiruvananthapuram, working worldwide"],
    ["Toolbox", "Next.js, GSAP, WebGL, Figma, Node"],
    ["Open to", "Freelance builds and long-term product work"],
  ],
};

const PROJECTS = [
  { title: "Monsoon Atlas", note: "Scroll-driven map of Kerala's rainfall, built for a climate newsroom.", tag: "Next.js · GSAP · D3", year: "2026",
    bg: "linear-gradient(135deg,#1F2BFF,#6A5CFF)", blobs: ["#FFD23F", "#FF7A59"] },
  { title: "Lumen", note: "Product site for a smart-lighting startup with a pinned 3D walkthrough.", tag: "Three.js · GSAP", year: "2025",
    bg: "linear-gradient(135deg,#FF7A59,#FFB36B)", blobs: ["#0B0D2E", "#FFD23F"] },
  { title: "Kala Studio", note: "Portfolio and booking platform for a Kochi dance collective.", tag: "Next.js · Sanity", year: "2025",
    bg: "linear-gradient(135deg,#0E8F6B,#7CF3C2)", blobs: ["#EFEBE3", "#1F2BFF"] },
  { title: "Fieldnote", note: "Writing app with a calm, keyboard-first interface and offline sync.", tag: "React · IndexedDB", year: "2024",
    bg: "linear-gradient(135deg,#EFEBE3,#CFC6B4)", blobs: ["#FF7A59", "#1F2BFF"] },
];
/* ─────────────────────────────────────────── */

const split = (s) => s.split("").map((c, i) => <span className="char" key={i}>{c}</span>);

export default function Portfolio() {
  const root = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({ lerp: 0.09 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onAnchor = (e) => {
      const a = e.target.closest("a[href^='#']");
      if (!a) return;
      e.preventDefault();
      lenis.scrollTo(a.getAttribute("href"));
    };
    document.addEventListener("click", onAnchor);

    const ctx = gsap.context(() => {
      if (!reduce) {
        // 1 · The signature moment: hero name rises letter by letter
        gsap.timeline({ defaults: { ease: "expo.out" } })
          .from(".hero-title .char", { yPercent: 115, rotate: 8, duration: 1.4, stagger: 0.06 })
          .from(".hero-intro", { opacity: 0, y: 24, duration: 1 }, "-=0.8")
          .from(".nav", { opacity: 0, duration: 1 }, "<");

        // hero title drifts away as you scroll
        gsap.to(".hero-title", {
          yPercent: -18, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        });

        // 2 · About words light up as you read
        gsap.to(".word", {
          opacity: 1, stagger: 0.1, ease: "none",
          scrollTrigger: { trigger: ".about p", start: "top 80%", end: "bottom 45%", scrub: true },
        });
      }

      // 3 · Work: pinned horizontal scroll on desktop only
      const mm = gsap.matchMedia();
      mm.add("(min-width: 801px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current.querySelector(".track");
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ".work", pin: true, scrub: 1, invalidateOnRefresh: true,
            end: () => "+=" + (track.scrollWidth - window.innerWidth),
          },
        });
      });

      // 4 · Cursor + magnetic email
      const cur = root.current.querySelector(".cursor");
      const cx = gsap.quickTo(cur, "x", { duration: 0.35, ease: "power3" });
      const cy = gsap.quickTo(cur, "y", { duration: 0.35, ease: "power3" });
      const move = (e) => { cx(e.clientX); cy(e.clientY); };
      window.addEventListener("pointermove", move);
      root.current.querySelectorAll("a").forEach((el) => {
        el.addEventListener("pointerenter", () => gsap.to(cur, { scale: 3.2, duration: 0.3 }));
        el.addEventListener("pointerleave", () => gsap.to(cur, { scale: 1, duration: 0.3 }));
      });

      const mail = root.current.querySelector(".mail");
      const mx = gsap.quickTo(mail, "x", { duration: 0.6, ease: "elastic.out(1,.5)" });
      const my = gsap.quickTo(mail, "y", { duration: 0.6, ease: "elastic.out(1,.5)" });
      const mag = (e) => {
        const r = mail.getBoundingClientRect();
        mx((e.clientX - (r.left + r.width / 2)) * 0.08);
        my((e.clientY - (r.top + r.height / 2)) * 0.12);
      };
      const reset = () => { mx(0); my(0); };
      if (!reduce) { mail.addEventListener("pointermove", mag); mail.addEventListener("pointerleave", reset); }

      return () => window.removeEventListener("pointermove", move);
    }, root);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      document.removeEventListener("click", onAnchor);
      lenis.destroy();
    };
  }, []);

  const marquee = ["Interaction design", "Creative development", "Motion systems", "Next.js builds", "Accessible by default"];

  return (
    <main ref={root}>
      <div className="cursor" aria-hidden="true" />

      <header className="nav">
        <a href="#top">{ME.first} {ME.last}</a>
        <nav>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <p className="hero-intro">{ME.intro}</p>
        <h1 className="hero-title" aria-label={`${ME.first} ${ME.last}`}>
          <span className="line" aria-hidden="true">{split(ME.first)}</span>
          <span className="line" aria-hidden="true">{split(ME.last)}</span>
        </h1>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((t, i) => <span key={i}>{t}</span>)}
          {[...marquee, ...marquee].map((t, i) => <span key={"b" + i}>{t}</span>)}
        </div>
      </div>

      <section className="about" id="about">
        <p aria-label={ME.about}>
          {ME.about.split(" ").map((w, i) => <span className="word" key={i}>{w} </span>)}
        </p>
        <dl className="facts">
          {ME.facts.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </section>

      <section className="work" id="work">
        <div className="work-pin">
          <div className="work-head"><h2>Selected work</h2><span>{PROJECTS.length} projects</span></div>
          <div className="track">
            {PROJECTS.map((p) => (
              <a className="card" href="#contact" key={p.title}>
                <div className="card-art" style={{ background: p.bg }}>
                  <i style={{ width: "46%", aspectRatio: "1", background: p.blobs[0], right: "-6%", top: "-12%" }} />
                  <i style={{ width: "30%", aspectRatio: "1", background: p.blobs[1], left: "42%", bottom: "-10%" }} />
                  <b>{p.title}</b>
                </div>
                <div className="card-meta">
                  <div><h3>{p.title}</h3><p>{p.note}</p></div>
                  <small>{p.tag}<br />{p.year}</small>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <h2>Have a project that should feel alive? Tell me about it.</h2>
        <a className="mail" href={`mailto:${ME.email}`}>{ME.email}</a>
        <footer className="foot">
          <span>© {new Date().getFullYear()} {ME.first} {ME.last}</span>
          <span><a href="https://github.com">GitHub</a> &nbsp; <a href="https://linkedin.com">LinkedIn</a> &nbsp; <a href="https://instagram.com">Instagram</a></span>
        </footer>
      </section>
    </main>
  );
}
