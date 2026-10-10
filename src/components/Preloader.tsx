"use client";

import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { useEffect, useRef } from "react";

import { Mrs_Saint_Delafield } from "next/font/google";
import { site } from "@/lib/data";

registerGsap();

// Handwritten signature-style font
const script = Mrs_Saint_Delafield({ weight: "400", subsets: ["latin"] });

// Total time the preloader is on screen (seconds)
const TOTAL = 5;
const WRITE_START = 0.5;
const WRITE_TIME = 2.4;
const EXIT_TIME = 0.8;

// Dummy image – swap with your own file in /public (e.g. "/preloader.jpg")
const BG_IMAGE = "https://picsum.photos/id/1015/1800/1200";

type Props = {
  onComplete: () => void;
};

export default function Preloader({ onComplete }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const done = useRef(false);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    document.body.classList.remove("no-scroll");
    onComplete();
  };

  // Safety net: never trap the visitor on the loader
  useEffect(() => {
    document.body.classList.add("no-scroll");
    const fallback = window.setTimeout(finish, (TOTAL + 1) * 1000);
    return () => {
      window.clearTimeout(fallback);
      document.body.classList.remove("no-scroll");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGSAP(
    () => {
      if (!root.current) return;
      gsap.ticker.lagSmoothing(0);

      const counter = { n: 0 };
      const num = root.current.querySelector(".preloader-num");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Initial states
      gsap.set(".preloader-copy span", { yPercent: 110 });
      gsap.set(".preloader-sign-text", {
        strokeDasharray: 1600,
        strokeDashoffset: 1600,
        fillOpacity: 0,
      });
      gsap.set(".preloader-sub", { opacity: 0, y: 12 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: finish,
      });
      tlRef.current = tl;

      // Counter + progress bar run for the full 5s (minus exit)
      tl.to(
        counter,
        {
          n: 100,
          duration: TOTAL - EXIT_TIME,
          ease: "power1.inOut",
          onUpdate: () => {
            if (num) num.textContent = String(Math.round(counter.n)).padStart(3, "0");
          },
        },
        0,
      )
        .to(".preloader-bar", { scaleX: 1, duration: TOTAL - EXIT_TIME, ease: "power1.inOut" }, 0)

        // Background image: slow drift + gentle fade in
        .fromTo(
          ".preloader-bg",
          { opacity: 0, scale: 1.12 },
          { opacity: 0.22, scale: 1, duration: TOTAL, ease: "power1.out" },
          0,
        )

        // Top labels
        .to(".preloader-copy span", { yPercent: 0, duration: 0.7, stagger: 0.08 }, 0.15)

        // "Mr. Thankyou.." – pen draws the outline, then ink fills in
        .to(
          ".preloader-sign-text",
          { strokeDashoffset: 0, duration: WRITE_TIME, ease: "power1.inOut" },
          WRITE_START,
        )
        .to(
          ".preloader-sign-text",
          { fillOpacity: 1, duration: 0.9, ease: "power2.out" },
          WRITE_START + WRITE_TIME - 0.5,
        )
        .to(
          ".preloader-sign-text",
          { strokeOpacity: 0, duration: 0.6, ease: "power2.out" },
          WRITE_START + WRITE_TIME + 0.2,
        )

        // Tagline appears after the signature is written
        .to(
          ".preloader-sub",
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          WRITE_START + WRITE_TIME + 0.1,
        )

        // Exit: labels out, number out, curtain lifts – ends exactly at TOTAL
        .to(".preloader-copy span", { yPercent: -110, duration: 0.4, stagger: 0.03 }, TOTAL - EXIT_TIME - 0.1)
        .to(".preloader-num", { y: -24, opacity: 0, duration: 0.3 }, TOTAL - EXIT_TIME - 0.1)
        .to(root.current, { yPercent: -100, duration: EXIT_TIME, ease: "power4.inOut" }, TOTAL - EXIT_TIME);

      // Reduced motion: skip the long show, keep a short fade
      if (reduce) {
        tl.timeScale(3);
      }
    },
    { scope: root },
  );

  const skip = () => {
    // Jump to the exit curtain instead of cutting abruptly
    const tl = tlRef.current;
    if (!tl) return finish();
    tl.tweenTo(TOTAL - EXIT_TIME - 0.1, { duration: 0.3, ease: "power2.out" });
  };

  return (
    <div
      ref={root}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-ink px-6 py-8 text-bg md:px-12 md:py-10"
    >
      {/* Dummy background image – low opacity, desaturated */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BG_IMAGE}
        alt=""
        aria-hidden="true"
        className="preloader-bg pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 grayscale"
      />
      {/* Soft vignette so text stays readable */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.65)_100%)]" />

      {/* Top row */}
      <div className="relative z-10 flex items-start justify-between text-[11px] tracking-[0.22em] uppercase">
        <p className="preloader-copy overflow-hidden">
          <span className="inline-block">{site.name}</span>
        </p>
        <p className="preloader-copy overflow-hidden">
          <span className="inline-block">Portfolio 2026</span>
        </p>
      </div>

      {/* Center signature */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-4 text-center">
        <svg
          viewBox="0 0 900 260"
          className="h-auto w-[88vw] max-w-[820px]"
          role="img"
          aria-label="Mr. Thankyou.."
        >
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            className={`preloader-sign-text ${script.className}`}
            fontSize="190"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            Mr. Thankyou..
          </text>
        </svg>
        <p className="preloader-sub max-w-sm text-sm leading-relaxed text-bg/70 md:text-base">
          Thanks for stopping by. Your portfolio is almost ready.
        </p>
      </div>

      {/* Bottom row */}
      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex items-end justify-between">
          <button
            type="button"
            onClick={skip}
            className="text-xs tracking-wide text-bg/60 underline-offset-4 transition-colors hover:text-bg hover:underline focus-visible:text-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bg"
          >
            Skip intro
          </button>
          <p className="preloader-num font-serif text-[22vw] leading-none tracking-tight md:text-[8rem]">
            000
          </p>
        </div>
        <div className="preloader-bar h-px w-full origin-left scale-x-0 bg-bg" />
      </div>
    </div>
  );
}