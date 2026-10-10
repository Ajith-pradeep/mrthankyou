"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export type SlideCard = {
  title: string;
  copy: string;
  image: string;
  alt: string;
  kicker?: string;
};

type Props = {
  items: SlideCard[];
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function SlideGallery({ items }: Props) {
  const reduce = useReducedMotion();

  return (
    <section className="mosaic-gallery story-section" aria-label="Visual language of the feed">
      <div className="section-kicker reveal-item">
        <span>02 — VISUAL LANGUAGE</span>
        <span>WHAT THE FEED COMMUNICATES IN ONE FRAME</span>
      </div>
      <div className="mosaic-heading">
        <h2 className="section-title reveal-item">
          Luxury as
          <br />
          <span className="serif-italic">readable theatre.</span>
        </h2>
        <p className="reveal-item">
          Cash stacks, helicopters, yachts, and reaction shots — images that
          sell status without needing subtitles.
        </p>
      </div>
      <div className="mosaic-grid">
        {items.map((item, index) => (
          <motion.article
            className={`mosaic-tile mosaic-tile-${index + 1}`}
            key={item.title}
            initial={reduce ? false : { opacity: 0, y: 36, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={reduce ? undefined : { y: -10, transition: { type: "spring", stiffness: 280, damping: 20 } }}
            transition={{ duration: 0.75, delay: index * 0.06, ease }}
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 900px) 92vw, 60vw"
              className="mosaic-image"
            />
            <div className="mosaic-copy">
              <span>{item.kicker ?? String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              {index === 0 ? <p>{item.copy}</p> : null}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
