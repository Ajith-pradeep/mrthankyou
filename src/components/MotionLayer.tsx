"use client";

import { animate, inView, type AnimationPlaybackControls } from "framer-motion";
import { useEffect, type RefObject } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function MotionLayer({
  root,
}: {
  root: RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(
      scope.querySelectorAll<HTMLElement>(
        ".reveal-item, .hero-enter, .formula-step",
      ),
    );

    if (reduce) {
      nodes.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
      });
      return;
    }

    const stops: Array<() => void> = [];
    const playing: AnimationPlaybackControls[] = [];

    const byParent = new Map<Element, HTMLElement[]>();
    nodes.forEach((el) => {
      const parent = el.parentElement ?? scope;
      const list = byParent.get(parent) ?? [];
      list.push(el);
      byParent.set(parent, list);
    });

    nodes.forEach((el) => {
      const index = byParent.get(el.parentElement ?? scope)?.indexOf(el) ?? 0;
      const isHero = el.classList.contains("hero-enter");

      const stop = inView(
        el,
        () => {
          const controls = animate(
            el,
            {
              opacity: 1,
              transform: "translateY(0px) scale(1)",
              filter: "blur(0px)",
            },
            {
              duration: isHero ? 0.95 : 0.75,
              delay: Math.min(index, 7) * (isHero ? 0.12 : 0.07),
              ease,
            },
          );
          void controls.then(() => {
            el.style.transform = "";
            el.style.filter = "";
          });
          playing.push(controls);
        },
        { amount: isHero ? 0.05 : 0.18 },
      );
      stops.push(stop);
    });

    return () => {
      stops.forEach((stop) => stop());
      playing.forEach((controls) => controls.stop());
    };
  }, [root]);

  return null;
}
