"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "article" | "li" | "a";
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function FadeUp({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay, ease }}
    >
      {children}
    </MotionTag>
  );
}
