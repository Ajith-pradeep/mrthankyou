"use client";

import { ScrollTrigger, gsap, registerGsap, useGSAP } from "@/lib/gsap";
import {
  businesses,
  channels,
  controversies,
  identityFacts,
  moments,
  playbook,
  photos,
  profile,
  revenueIdeas,
  sources,
  spectacleSlides,
  themes,
  timeline,
  verification,
} from "@/lib/data";
import { useEffect, useRef, useState } from "react";

import HeroScene from "@/components/HeroScene";
import { HeroCopy, MotionNavLink } from "@/components/HeroMotion";
import Image from "next/image";
import MotionLayer from "@/components/MotionLayer";
import AudienceSize from "@/components/AudienceSize";
import PrimarySource from "@/components/PrimarySource";
import ContentStyle from "@/components/ContentStyle";
import ShortsRail from "@/components/ShortsRail";
import SlideGallery from "@/components/SlideGallery";
import { motion } from "framer-motion";

registerGsap();

function sourceById(id: string) {
  return sources.find((item) => item.id === id);
}

export default function Home() {
  const main = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(".hero-enter, .reveal-item", { autoAlpha: 1, y: 0 });
        gsap.utils.toArray<HTMLElement>(".audience-count").forEach((el) => {
          const target = el.dataset.count ?? "0";
          const prefix = el.dataset.prefix ?? "";
          const suffix = el.dataset.suffix ?? "";
          el.textContent = `${prefix}${target}${suffix}`;
        });
        gsap.set(".audience-bar", { scaleX: 1 });
        return;
      }

      gsap.utils.toArray<HTMLElement>(".parallax-image").forEach((image) => {
        gsap.fromTo(
          image,
          { yPercent: -8, scale: 1.08 },
          {
            yPercent: 8,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: image.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      gsap.utils
        .toArray<HTMLElement>(
          ".fact-card, .business-card, .playbook-card, .revenue-card, .media-card, .moment-card",
        )
        .forEach((card) => {
          const image = card.querySelector("img");
          const onMove = (event: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            gsap.to(card, {
              rotateY: x * 7,
              rotateX: -y * 6,
              duration: 0.4,
              transformPerspective: 800,
              ease: "power2.out",
            });
            if (image) {
              gsap.to(image, { x: x * 10, y: y * 8, scale: 1.05, duration: 0.45 });
            }
          };
          const onLeave = () => {
            gsap.to(card, {
              rotateY: 0,
              rotateX: 0,
              duration: 0.65,
              ease: "power3.out",
            });
            if (image) gsap.to(image, { x: 0, y: 0, scale: 1, duration: 0.65 });
          };
          card.addEventListener("mousemove", onMove);
          card.addEventListener("mouseleave", onLeave);
        });

      const audience = document.querySelector(".audience-section");
      if (audience) {
        const runAudienceMotion = () => {
          gsap.fromTo(
            ".audience-bar",
            { scaleX: 0 },
            { scaleX: 1, duration: 1.4, ease: "power3.out" },
          );

          gsap.utils.toArray<HTMLElement>(".audience-count").forEach((el) => {
            const target = Number(el.dataset.count ?? 0);
            const prefix = el.dataset.prefix ?? "";
            const suffix = el.dataset.suffix ?? "";
            const proxy = { value: 0 };

            gsap.to(proxy, {
              value: target,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                const decimals = String(target).includes(".") ? 1 : 0;
                el.textContent = `${prefix}${proxy.value.toFixed(decimals)}${suffix}`;
              },
            });
          });
        };

        ScrollTrigger.create({
          trigger: ".audience-stage",
          start: "top 80%",
          once: true,
          onEnter: runAudienceMotion,
        });
      }
    },
    { scope: main },
  );

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        className={`site-header${scrolled ? " is-scrolled" : ""}`}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.a
          className="brand-lockup"
          href="#top"
          aria-label="Mr. Thank You home"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          <span className="brand-name">MR. THANK YOU</span>
        </motion.a>
        <nav
          className={`site-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
        >
          <MotionNavLink href="#who" onClick={closeMenu}>
            Identity
          </MotionNavLink>
          <MotionNavLink href="#content" onClick={closeMenu}>
            Themes
          </MotionNavLink>
          <MotionNavLink href="#audience" onClick={closeMenu}>
            Audience
          </MotionNavLink>
          {/* <MotionNavLink href="#business" onClick={closeMenu}>
            Ventures
          </MotionNavLink> */}
          <MotionNavLink href="#giveaway" onClick={closeMenu}>
            Sources
          </MotionNavLink>
          <MotionNavLink
            href={profile.officialHub}
            className="nav-cta"
            onClick={closeMenu}
            external
          >
            Official hub <span aria-hidden="true">↗</span>
          </MotionNavLink>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </motion.header>

      <main ref={main}>
        <MotionLayer root={main} />
        <section className="hero" id="top">
          <Image
            src={photos.tuxedo}
            alt=""
            fill
            priority
            sizes="100vw"
            aria-hidden="true"
            className="hero-background-image"
          />
          <div className="hero-background-wash" aria-hidden="true" />
          {/* <HeroScene /> */}
          <HeroCopy
            eyebrow={
              <>
                <span className="status-dot" />
                EDITORIAL PROFILE · FACTS · REPORTS 
              </>
            }
            titleLines={[
              profile.brand,
              // <span className="serif-italic" key="brand">
              //   is a brand,
              // </span>,

            ]}
            description={
              <>
                {profile.name} ({profile.alsoKnownAs}) — Russian-born creator
                and entrepreneur. This page maps what is documented and what media
                reported.
              </>
            }
            ctaHref="#who"
          />
          <motion.div
            className="hero-foot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <span>{profile.roles.join(" · ").toUpperCase()}</span>
            <a href="#who">
              START WITH IDENTITY <span aria-hidden="true">↓</span>
            </a>
          </motion.div>
        </section>

        {/* <SlideGallery items={spectacleSlides} /> */}

        <section className="story-section who-section" id="who">
          <div className="who-bg" aria-hidden="true">
            <Image
              src={photos.prada}
              alt=""
              fill
              sizes="100vw"
              className="who-bg-image"
            />
            <div className="who-bg-wash" />
          </div>
          <div className="section-kicker reveal-item">
            <span>IDENTITY</span>
            <span>REAL NAME, PUBLIC BRAND, WHAT IS STILL UNCLEAR</span>
          </div>
          <div className="story-grid who-intro">
            <h2 className="story-title reveal-item">
              Sergei Kosenko —
              <br />
              known online as
              <br />
              <span className="serif-italic">Mr Thank You.</span>
            </h2>
            <div className="story-aside reveal-item">
              <p>
                His public identity spans creator, entrepreneur, influencer,
                singer, podcast host, philanthropy and giveaway personality,
                and luxury-lifestyle figure. His current branding lists him as
                “Actor, singer, influencer, entrepreneur.”
              </p>
              <a
                className="text-link"
                href={profile.officialHub}
                target="_blank"
                rel="noreferrer"
              >
                PUBLIC LINK HUB <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <p className="lede who-note reveal-item">
            Early-life details are limited and sometimes conflicting. Claims
            about his birthplace, childhood, education, and early career should
            be treated as unverified. His later work across business, social
            media, and personal branding is better documented.
          </p>
          <div className="who-facts">
            {identityFacts.map((fact) => (
              <article className="who-fact reveal-item" key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
                <p>{fact.note}</p>
              </article>
            ))}
          </div>
        </section>

        {/* <section className="split-visual story-section">
          <div className="split-image reveal-item">
            <Image
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85"
              alt="Luxury sports car as a stand-in for the visual language of his content"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="parallax-image"
            />
          </div>
          <div className="split-copy">
            <div className="section-kicker reveal-item">
              <span>02 — HOW FAME ARRIVED</span>
              <span>INTERNET ATTENTION, NOT HOLLYWOOD</span>
            </div>
            <h2 className="section-title reveal-item">
              Not a movie star.
              <br />
              A <span className="serif-italic">distribution</span> machine.
            </h2>
            <p className="reveal-item">
              He did not become famous through cinema, sport, politics, or
              television. The pattern is: create something visually extreme,
              make people react, generate shares, reach millions, then turn
              attention into business opportunities.
            </p>
            <p className="reveal-item">
              One of the most widely reported videos showed his girlfriend
              arriving by helicopter and walking over stacks of cash arranged
              like a carpet. It went viral again in 2024.
            </p>
            <a
              className="text-link reveal-item"
              href={sourceById("ndtv")?.href}
              target="_blank"
              rel="noreferrer"
            >
              NDTV ON THE CASH-CARPET VIDEO <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section> */}

        <ContentStyle items={themes} />

        <ShortsRail />

        {/* <section className="moments-section story-section">
          <div className="section-kicker reveal-item">
            <span>HOW ATTENTION CONVERTS</span>
            <span>SCENE · REACTION · DISTRIBUTION → BUSINESS</span>
          </div>
          <div className="moments-heading">
            <h2 className="section-title reveal-item">
              Spectacle first.
              <br />
              Business <span className="serif-italic">follows.</span>
            </h2>
            <p className="reveal-item">
              Extreme visuals stop the scroll. A reaction makes it a story.
              Shares and news coverage turn one clip into search traffic — and
              that audience becomes the business asset.
            </p>
          </div>
          <div className="moment-grid">
            {moments.map((moment) => (
              <article
                className={`moment-card ${moment.className} reveal-item`}
                key={moment.number}
              >
                <div className="moment-image-wrap">
                  <Image
                    src={moment.image}
                    alt={moment.alt}
                    fill
                    sizes="(max-width: 760px) 90vw, (max-width: 1100px) 45vw, 30vw"
                    className="moment-image"
                  />
                  <span className="moment-tag">{moment.tag}</span>
                  <span className="moment-number">{moment.number}</span>
                </div>
                <div className="moment-copy">
                  <h3>{moment.title}</h3>
                  <p>{moment.copy}</p>
                  <span aria-hidden="true" className="moment-arrow">
                    ↗
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section> */}

        <AudienceSize />

        {/* <section className="story-section" id="business">
          <div className="section-kicker reveal-item">
            <span>07 — REPORTED VENTURES</span>
            <span>PUBLIC CLAIMS · UNEVEN INDEPENDENT CHECKS</span>
          </div>
          <h2 className="section-title reveal-item">
            From apparel
            <br />
            to a <span className="serif-italic">creator economy.</span>
          </h2>
          <p className="lede reveal-item">
            Reports connect him to retail, apps, crypto-adjacent products,
            Dubai real estate, and a podcast/media brand. Some of that is
            clearly public. Some of it still rests on secondary reporting.
          </p>
          <div className="business-grid">
            {businesses.map((item) => (
              <article className="business-card reveal-item" key={item.title}>
                <span>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <small>Source: {item.source}</small>
              </article>
            ))}
          </div>
        </section> */}

        {/* <section className="split-visual story-section reverse-split">
          <div className="split-image reveal-item">
            <Image
              src={photos.yacht}
              alt="Mr Thank You beside a yacht on a red carpet — luxury lifestyle imagery"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="parallax-image"
            />
          </div>
          <div className="split-copy">
            <div className="section-kicker reveal-item">
              <span>08 — NET WORTH CLAIMS</span>
              <span>HEADLINES ARE NOT FINANCIAL AUDITS</span>
            </div>
            <h2 className="section-title reveal-item">
              Online you will see
              <br />
              <span className="serif-italic">$500 million.</span>
            </h2>
            <p className="reveal-item">
              Online figures range from several million dollars to tens or
              hundreds of millions. Some articles have claimed a net worth
              approaching $500 million. There is no strong public financial
              documentation establishing that exact figure.
            </p>
            <p className="reveal-item">
              A reported $50 million property portfolio is also not personal
              net worth. Controlling or representing property is not the same
              as owning it. A luxury car, yacht, helicopter, or hotel suite in
              a video can be rented, borrowed, leased, or provided by a
              partner.
            </p>
            <p className="callout reveal-item">
              Responsible summary: he appears to have built significant
              businesses and a very large social-media presence. Exact personal
              net worth is not publicly verified. Video cash is not proof of
              ownership.
            </p>
          </div>
        </section> */}

        {/* <section className="story-section">
          <div className="section-kicker reveal-item">
            <span>09 — PLAUSIBLE REVENUE PATHS</span>
            <span>A MODEL OF HOW MONEY CAN MOVE — NOT A STATEMENT</span>
          </div>
          <div className="revenue-grid">
            {revenueIdeas.map((item) => (
              <article className="revenue-card reveal-item" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section> */}



        <section className="story-section media-section">
          <div className="media-grid">
            <article className="media-card reveal-item">
              <div className="media-image-wrap">
                <Image
                  src="/shorts/let-it-fly.jpg"
                  alt="Mr Thank You singing into a microphone during a performance"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="media-image-singer"
                />
              </div>
              <h3>Singer / artist</h3>
              <p>
                Public profiles describe him as a singer as well as an
                influencer. Music has been distributed through platforms
                including Apple Music and Spotify according to his public link
                hub.
              </p>
            </article>
            <article className="media-card reveal-item">
              <div className="media-image-wrap">
                <Image
                  src={photos.cashTable}
                  alt="Mr Thank You in formal wear representing his media and public brand"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <h3>Podcast / media company</h3>
              <p>
                Mr. Thank You Podcast lists interviews with entrepreneurs and
                public figures. That changes the model from influencer →
                audience to influencer → media company: clips, YouTube, Shorts,
                sponsors, and authority.
              </p>
            </article>
          </div>
        </section>




        <section className="story-section timeline-section">
          <div className="section-kicker reveal-item">
            <span>CAREER TIMELINE</span>
            <span>DOCUMENTED ARC · NOT A WEALTH SCORECARD</span>
          </div>
          <ol className="timeline">
            {timeline.map((item) => (
              <li className="reveal-item" key={item.year}>
                <span>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* <section className="story-section sources-section">
          <div className="section-kicker reveal-item">
            <span>14 — PRESS &amp; SECONDARY SOURCES</span>
            <span>NEWS COVERAGE AMPLIFIES CLAIMS — IT DOES NOT PROVE THEM</span>
          </div>
          <h2 className="section-title reveal-item">
            Media repeats the story.
            <br />
            <span className="serif-italic">You still verify.</span>
          </h2>
          <p className="lede reveal-item">
            Outlets including NDTV, Hindustan Times, Economic Times, Times of
            India, News9Live, and Bollywood Hungama covered viral episodes.
            That creates a loop: Instagram → article → Google → more Instagram.
            Influence rankings based on Social Blade are third-party metrics,
            not audited awards.
          </p>
          <div className="source-list">
            {sources.map((source) => (
              <a
                className="source-chip reveal-item"
                href={source.href}
                key={source.id}
                target="_blank"
                rel="noreferrer"
              >
                {source.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section> */}

        <PrimarySource />

        {/* <section className="community story-section">
          <div className="section-kicker reveal-item">
            <span>OFFICIAL CHANNELS</span>
            <span>CHECK THESE BEFORE THIRD-PARTY BIOS</span>
          </div>
          <h2 className="section-title reveal-item">
            Start with the
            <br />
            <span className="serif-italic">primary links.</span>
          </h2>
          <div className="social-list">
            {channels.map((channel) => (
              <a
                className={`social-row ${channel.className} reveal-item`}
                href={channel.href}
                key={channel.name}
                target="_blank"
                rel="noreferrer"
              >
                <span className="social-platform">{channel.name}</span>
                <span className="social-handle">{channel.handle}</span>
                <span className="social-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </section> */}
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="#top">
          MR. THANK YOU
        </a>
        <span>Editorial profile</span>
        <a href={profile.facebook} target="_blank" rel="noreferrer">
          Facebook <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </>
  );
}
