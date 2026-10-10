"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { photos, profile } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="audience-ig-mark">
      <path
        fill="currentColor"
        d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3zm9 1.8h-9A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7zM12 8.1A3.9 3.9 0 1 1 8.1 12 3.9 3.9 0 0 1 12 8.1zm0 1.8A2.1 2.1 0 1 0 14.1 12 2.1 2.1 0 0 0 12 9.9zM17.15 6.7a1.05 1.05 0 1 1-1.05 1.05 1.05 1.05 0 0 1 1.05-1.05z"
      />
    </svg>
  );
}

export default function AudienceSize() {
  const reduce = useReducedMotion();

  return (
    <section className="audience-section story-section" id="audience">
      <div className="audience-bg" aria-hidden="true">
        <Image
          src={photos.yacht}
          alt=""
          fill
          sizes="100vw"
          className="audience-bg-image"
        />
        <div className="audience-bg-wash" />
        <div className="audience-bg-glow" />
      </div>

      <motion.div
        className="section-kicker"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease }}
      >
        <span>AUDIENCE REPORTS</span>
        <span>INSTAGRAM · FOLLOWERS</span>
      </motion.div>

      <div className="audience-heading">
        <motion.h2
          className="section-title"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease }}
        >
          Instagram
          <br />
          <span className="serif-italic">followers.</span>
        </motion.h2>
        <motion.p
          className="audience-lede"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
        >
          One profile. One public count — 54.1 million people following
          the account behind the brand.
        </motion.p>
      </div>

      <motion.article
        className="audience-card audience-stage"
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, ease }}
      >
        <div className="audience-card-media">
          <Image
            src={photos.tuxedo}
            alt="Mr Thank You in a tuxedo"
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
            className="audience-card-image"
          />
          <div className="audience-card-shade" />
          <span className="audience-card-index">06</span>
        </div>

        <div className="audience-card-body">
          <div className="audience-ig-row">
            <span className="audience-ig-avatar" aria-hidden="true">
              <Image src={photos.tuxedo} alt="" width={44} height={44} />
            </span>
            <span className="audience-ig-meta">
              <strong>@mr.thank.you</strong>
              <em>Instagram</em>
            </span>
            <span className="audience-badge">
              <InstagramMark />
              Followers
            </span>
          </div>

          <strong className="audience-figure">
            <span className="audience-count" data-count="54.1">
              0
            </span>
            <span className="audience-unit">M</span>
          </strong>
          <span className="audience-figure-label">Instagram followers</span>

          <p>
            The live-style figure for the Mr Thank You Instagram account —
            the audience that carries the brand.
          </p>

          <div className="audience-bar-track" aria-hidden="true">
            <span className="audience-bar audience-bar-high" />
          </div>

          <motion.a
            className="audience-verify-btn"
            href={profile.officialHub}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            Open official hub <span aria-hidden="true">↗</span>
          </motion.a>
        </div>
      </motion.article>
    </section>
  );
}
