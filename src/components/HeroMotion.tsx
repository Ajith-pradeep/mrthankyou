"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease },
  },
};

const line = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.95, ease },
  },
};

export function HeroCopy({
  eyebrow,
  titleLines,
  description,
  ctaHref,
}: {
  eyebrow: ReactNode;
  titleLines: ReactNode[];
  description: ReactNode;
  ctaHref: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="hero-copy">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="hero-title">
          {titleLines.map((lineContent, i) => (
            <span className="hero-title-line" key={i}>
              {lineContent}
            </span>
          ))}
        </h1>
        <div className="hero-bottom">
          <p className="hero-description">{description}</p>
          <a className="round-link" href={ctaHref} aria-label="Read who he is">
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="hero-copy"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className="eyebrow" variants={item}>
        {eyebrow}
      </motion.div>
      <h1 className="hero-title">
        {titleLines.map((lineContent, i) => (
          <span className="hero-title-line" key={i}>
            <motion.span
              style={{ display: "block" }}
              variants={line}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.18 + i * 0.12 }}
            >
              {lineContent}
            </motion.span>
          </span>
        ))}
      </h1>
      <motion.div className="hero-bottom" variants={item}>
        <p className="hero-description">{description}</p>
        <motion.a
          className="round-link"
          href={ctaHref}
          aria-label="Read who he is"
          whileHover={{ y: 4, scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          <span aria-hidden="true">↓</span>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export function MotionNavLink({
  href,
  children,
  className,
  onClick,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  external?: boolean;
}) {
  return (
    <motion.a
      href={href}
      className={className}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      whileHover={{ y: -2, color: "var(--lime)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
    >
      {children}
    </motion.a>
  );
}
