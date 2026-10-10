"use client";

import Image from "next/image";

const shorts = [
  {
    src: "/shorts/car-glasses.jpg",
    title: "On the road",
    alt: "Mr Thank You in glasses, looking out from the driver's seat",
  },
  {
    src: "/shorts/cash-chair.jpg",
    title: "Terrace",
    alt: "Mr Thank You seated on a chair of cash stacks on a rooftop terrace",
  },
  {
    src: "/shorts/wow-cover.jpg",
    title: "Cover story",
    alt: "Mr Thank You on a magazine cover in a black suit",
  },
  {
    src: "/shorts/pool-dart.jpg",
    title: "Poolside",
    alt: "Mr Thank You by a pool holding a dart, with cash on the table",
  },
  {
    src: "/shorts/cash-villa.jpg",
    title: "Villa",
    alt: "Mr Thank You sitting among stacks of cash outside a villa",
  },
  {
    src: "/shorts/dubai-people.jpg",
    title: "Dubai",
    alt: "Mr Thank You smiling outdoors with palm trees behind him",
  },
  {
    src: "/shorts/pink-suit.jpg",
    title: "Set day",
    alt: "Mr Thank You in a bright pink suit seated in a director's chair",
  },
];

type ShortItem = (typeof shorts)[number];

function ShortCard({ item }: { item: ShortItem }) {
  return (
    <article className="shorts-card">
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 900px) 46vw, 220px"
        className="shorts-card-image"
      />
      <div className="shorts-card-shade" />
      <div className="shorts-card-meta">
        <strong>{item.title}</strong>
      </div>
    </article>
  );
}

function ShortsTrack({
  items,
  reverse,
}: {
  items: ShortItem[];
  reverse?: boolean;
}) {
  const loop = [...items, ...items];

  return (
    <div className={`shorts-row${reverse ? " is-reverse" : ""}`}>
      <div className="shorts-track">
        {loop.map((item, index) => (
          <ShortCard key={`${item.src}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function ShortsRail() {
  const rowTwo = [...shorts].reverse();

  return (
    <section className="shorts-section" aria-label="Shorts feed">
      <div className="story-section shorts-heading">
        <div className="section-kicker reveal-item">
          <span>SHORTS FEED</span>
          <span>ALWAYS MOVING</span>
        </div>
        <div className="shorts-heading-row">
          <h2 className="section-title reveal-item">
            Shorts from the
            <br />
            <span className="serif-italic">feed.</span>
          </h2>
        </div>
      </div>

      <div className="shorts-rail">
        <ShortsTrack items={shorts} />
        <ShortsTrack items={rowTwo} reverse />
        <div className="shorts-fade shorts-fade-left" aria-hidden="true" />
        <div className="shorts-fade shorts-fade-right" aria-hidden="true" />
      </div>
    </section>
  );
}
