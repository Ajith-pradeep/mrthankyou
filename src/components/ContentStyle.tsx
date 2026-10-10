"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Theme = {
  title: string;
  copy: string;
  image: string;
  alt: string;
};

const stats = [
  {
    value: "1.5B+",
    label: "Views",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
        <path
          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    value: "174M",
    label: "Top Reel",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
        <rect x="4" y="5" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 9.5v5l5-2.5-5-2.5Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    value: "1s",
    label: "Read time",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
        <path
          d="M12 20.5c4.2 0 7.5-2.6 7.5-6.2 0-4.4-4.2-6.3-7.5-9.8-3.3 3.5-7.5 5.4-7.5 9.8 0 3.6 3.3 6.2 7.5 6.2Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function ContentStyle({ items }: { items: Theme[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const total = items.length;
  const current = items[active] ?? items[0];

  const go = (dir: -1 | 1) => {
    setActive((prev) => (prev + dir + total) % total);
  };

  useEffect(() => {
    if (reduce || total < 2) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduce, total]);

  const visible = [0, 1, 2].map((offset) => items[(active + offset) % total]);

  return (
    <section className="content-style story-section" id="content">
      <div className="content-style-bg" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.image}
            className="content-style-bg-image"
            initial={reduce ? false : { opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            <Image
              src={current.image}
              alt=""
              fill
              sizes="100vw"
              className="content-style-bg-img"
              priority={active === 0}
            />
          </motion.div>
        </AnimatePresence>
        <div className="content-style-wash" />
      </div>

      <motion.div
        className="section-kicker"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease }}
      >
        <span>CONTENT THEMES</span>
        <span>REPEATING MOTIFS THAT BUILD THE BRAND</span>
      </motion.div>

      <div className="content-style-stage">
        <div className="content-style-copy">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease }}
            >
              <h2 className="content-style-title">{current.title}</h2>
              <p className="content-style-lede">{current.copy}</p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="content-style-stats"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, delay: 0.1, ease }}
          >
            {stats.map((stat) => (
              <div className="content-style-stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>
                  {stat.icon}
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="content-style-gallery">
          <div className="content-style-cards">
            {visible.map((item, index) => (
              <motion.article
                key={`${item.title}-${active}-${index}`}
                className={`content-style-card${index === 0 ? " is-active" : ""}`}
                initial={reduce ? false : { opacity: 0, x: 40, scale: 0.96 }}
                animate={{ opacity: index === 0 ? 1 : 0.55, x: 0, scale: 1 }}
                transition={{ duration: 0.55, delay: index * 0.05, ease }}
                onClick={() => {
                  if (index > 0) setActive((active + index) % total);
                }}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 900px) 42vw, 18vw"
                  className="content-style-card-image"
                />
                <div className="content-style-card-label">
                  <span>{String(((active + index) % total) + 1).padStart(2, "0")}</span>
                  <strong>{item.title}</strong>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="content-style-controls">
            <div className="content-style-arrows">
              <motion.button
                type="button"
                className="content-style-arrow"
                aria-label="Previous theme"
                onClick={() => go(-1)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                ←
              </motion.button>
              <motion.button
                type="button"
                className="content-style-arrow"
                aria-label="Next theme"
                onClick={() => go(1)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                →
              </motion.button>
            </div>
            <div className="content-style-progress" role="tablist" aria-label="Content themes">
              {items.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  className={`content-style-progress-seg${index === active ? " is-active" : ""}`}
                  onClick={() => setActive(index)}
                  aria-label={`Show ${item.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
