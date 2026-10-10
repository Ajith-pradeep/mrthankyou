"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

registerGsap();

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Magnetic({ children, className }: Props) {
  const root = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = root.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.28, y: y * 0.28, duration: 0.4, ease: "power3.out" });
  };

  const onLeave = () => {
    gsap.to(root.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <div ref={root} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}
