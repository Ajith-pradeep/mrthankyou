"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/data";

const backdropLine = "MR THANK YOU  ·  MR THANK YOU  ·  MR THANK YOU  ·  ";

export default function PrimarySource() {
  const reduce = useReducedMotion();

  return (
    <section className="giveaway story-section" id="giveaway">
      <div className="giveaway-shape giveaway-shape-one" aria-hidden="true" />
      <div className="giveaway-shape giveaway-shape-two" aria-hidden="true" />
      <div className="section-kicker reveal-item">
        <span>PRIMARY SOURCE</span>
        <span>OFFICIAL HUB · NOT THE HEADLINES</span>
      </div>

      <div className="giveaway-layout">
        <div className="source-stage reveal-item">
          <div className="source-glow" aria-hidden="true" />
          <div className="source-ring" aria-hidden="true" />

          <div className="source-backdrop" aria-hidden="true">
            <motion.p
              animate={reduce ? undefined : { x: ["0%", "-50%"] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
              {backdropLine}
              {backdropLine}
            </motion.p>
            <motion.p
              animate={reduce ? undefined : { x: ["-50%", "0%"] }}
              transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            >
              {backdropLine}
              {backdropLine}
            </motion.p>
          </div>

          <div className="source-portrait">
            <Image
              src="/mr-thank-you/portrait-cutout.png"
              alt="Mr Thank You in a black tuxedo, sunglasses on, with cash tucked in the breast pocket"
              width={655}
              height={819}
              className="source-portrait-img"
            />
          </div>

          <aside className="source-dash" aria-label="Official hub">
            <a
              className="source-dash-link"
              href={profile.officialHub}
              target="_blank"
              rel="noreferrer"
            >
              <span className="source-live">
                <i />
                Official
              </span>
              <span className="source-dash-url">link.me/mr.thank.youuu</span>
              <span className="source-dash-go">
                Open <span aria-hidden="true">↗</span>
              </span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
