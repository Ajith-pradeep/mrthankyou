export const profile = {
  name: "Sergei Kosenko",
  alsoKnownAs: "Sergey Kosenko",
  brand: "Mr Thank You",
  handleHint: "@mr.thank.you / related accounts",
  roles: ["Actor", "Singer", "Influencer", "Entrepreneur"],
  origin: "Russian-born, widely associated with Moscow and later Dubai",
  officialHub: "https://link.me/mr.thank.youuu",
  facebook: "https://www.facebook.com/mr.thank.youu/",
};

export const sources = [
  {
    id: "linkme",
    label: "LinkMe profile",
    href: "https://link.me/mr.thank.youuu",
  },
  {
    id: "ndtv",
    label: "NDTV",
    href: "https://www.ndtv.com/offbeat/russian-influencer-makes-girlfriend-walk-on-carpet-of-cash-old-video-goes-viral-again-5979321",
  },
  {
    id: "toi",
    label: "Times of India",
    href: "https://timesofindia.indiatimes.com/business/international-business/mr-thank-you-becomes-one-of-the-200-most-influential-people-in-the-world/articleshow/111140069.cms",
  },
  {
    id: "et",
    label: "Economic Times",
    href: "https://economictimes.indiatimes.com/magazines/panache/stairs-made-of-cash-dubai-tycoon-wows-girlfriend-with-unusual-gift-vid-goes-viral/articleshow/111288721.cms",
  },
  {
    id: "news9",
    label: "News9Live",
    href: "https://www.news9live.com/viral-news/dubai-businessman-lays-stacks-of-cash-for-girlfriend-to-walk-on-netizens-call-it-fake-2593104",
  },
];

export const identityFacts = [
  {
    label: "Public name",
    value: "Sergei / Sergey Kosenko",
    note: "English-language sources use both spellings.",
  },
  {
    label: "Online identity",
    value: "Mr Thank You",
    note: "Verify any social handle directly; accounts can change.",
  },
  {
    label: "Public branding",
    value: "Actor, singer, influencer, entrepreneur",
    note: "From his public LinkMe hub.",
  },
  {
    label: "Origin",
    value: "Russian, associated with Moscow",
    note: "Early-life details are poorly documented and often conflicting.",
  },
];

export const photos = {
  cashLambo: "/mr-thank-you/cash-lambo.jpg",
  cashTable: "/mr-thank-you/cash-table.jpg",
  helicopter: "/mr-thank-you/helicopter.jpg",
  yacht: "/mr-thank-you/yacht-red-carpet.jpg",
  tuxedo: "/mr-thank-you/tuxedo-cash.jpg",
  prada: "/mr-thank-you/prada-street.jpg",
  mascots: "/mr-thank-you/mascots-cash.jpg",
} as const;

export const spectacleSlides = [
  {
    title: "Cash as theatre",
    copy: "Stacks of notes become a stage set — readable in a single frame.",
    image: photos.cashTable,
    alt: "Mr Thank You in a tuxedo at a table covered in cash stacks",
    kicker: "01 — MONEY",
  },
  {
    title: "Altitude luxury",
    copy: "Helicopters turn a greeting into a cinematic arrival.",
    image: photos.helicopter,
    alt: "Mr Thank You stepping out of a red helicopter",
    kicker: "02 — TRAVEL",
  },
  {
    title: "Harbor arrival",
    copy: "Yachts, red carpets, and Dubai light sell the fantasy of being everywhere at once.",
    image: photos.yacht,
    alt: "Mr Thank You on a red carpet beside a luxury yacht",
    kicker: "03 — PLACE",
  },
  {
    title: "The flex shot",
    copy: "Cash in the pocket becomes a punchline you can read without subtitles.",
    image: photos.tuxedo,
    alt: "Mr Thank You in a tuxedo with cash tucked in the breast pocket",
    kicker: "04 — FEELING",
  },
  {
    title: "Machine-made speed",
    copy: "Supercars are punctuation — visual proof that the scene is expensive.",
    image: photos.cashLambo,
    alt: "Mr Thank You holding cash stacks in front of a branded blue Lamborghini",
    kicker: "05 — OBJECT",
  },
  {
    title: "Crowd spectacle",
    copy: "Costumes, cash on the ground, and shareable chaos turn one clip into news.",
    image: photos.mascots,
    alt: "Mr Thank You with costume characters and cash scattered on the sidewalk",
    kicker: "06 — SPECTACLE",
  },
];

export const themes = [
  {
    title: "Money",
    copy: "Large amounts of cash are one of the strongest visual themes in his videos.",
    image: photos.cashLambo,
    alt: "Mr Thank You holding stacks of cash in front of his branded Lamborghini",
  },
  {
    title: "Luxury",
    copy: "Helicopters, cars, yachts, hotels, and high-end locations appear again and again.",
    image: photos.helicopter,
    alt: "Mr Thank You exiting a luxury helicopter on a helipad",
  },
  {
    title: "Gifts",
    copy: "Surprise gifts and money-based gestures are designed to produce a reaction.",
    image: photos.tuxedo,
    alt: "Mr Thank You posing with cash as a pocket square",
  },
  {
    title: "Travel",
    copy: "International locations and luxury experiences make the content feel larger than one city.",
    image: photos.yacht,
    alt: "Mr Thank You at a marina event with yacht and skyline behind him",
  },
  {
    title: "Style",
    copy: "Bold fashion and branded cars turn every street into a set.",
    image: photos.prada,
    alt: "Mr Thank You in luxury streetwear adjusting sunglasses",
  },
  {
    title: "Giveaways",
    copy: "Prizes invite the audience into the brand instead of leaving them as spectators.",
    image: photos.mascots,
    alt: "Mr Thank You with mascot characters and cash on the ground",
  },
];

export const businesses = [
  {
    title: "Apparel / retail",
    year: "Reported from ~2014",
    copy: "Some reports say he started in apparel and retail, then moved toward blogging and social media after supply-chain difficulties.",
    source: "Economic Times",
  },
  {
    title: "Amazy",
    year: "Reported 2022",
    copy: "Described as a lifestyle/fitness app that connected physical activity with cryptocurrency rewards, reportedly launched with Artem Nikolaev.",
    source: "Economic Times",
  },
  {
    title: "Habibi Real Estate",
    year: "Reported 2023, Dubai",
    copy: "Media reports associate him with founding a Dubai real-estate company. One article claimed a property portfolio worth more than $50 million — a portfolio value is not the same as personal net worth.",
    source: "Economic Times",
  },
  {
    title: "Media & podcast",
    year: "Public today",
    copy: "His public hub promotes Mr. Thank You Podcast, music, and interviews with entrepreneurs and public figures — a shift from influencer to media company.",
    source: "LinkMe",
  },
];

export const revenueIdeas = [
  {
    title: "Private businesses",
    copy: "Apparel, digital products, and other companies can generate profit independent of follower counts.",
  },
  {
    title: "Real estate",
    copy: "Investment, development, commissions, rental income, or appreciation — if the reported Dubai activity is accurate.",
  },
  {
    title: "Sponsorships & ads",
    copy: "A large short-form audience can attract brand deals and platform advertising, depending on the deal.",
  },
  {
    title: "Partnerships",
    copy: "Creators at this scale can receive equity, media partnerships, or distribution deals.",
  },
  {
    title: "Giveaways as marketing",
    copy: "A $10,000 giveaway can look like a loss. If it produces millions of views and business leads, it can function as a marketing expense.",
  },
];

export const controversies = [
  {
    year: "2021",
    title: "Bentley stunt",
    copy: "Reports described a video in which his girlfriend was tied to the roof of a Bentley, with hands restrained and mouth taped. Viewers called the stunt dangerous and inappropriate.",
    sourceId: "ndtv",
  },
  {
    year: "2021",
    title: "Bali expulsion",
    copy: "He was reportedly expelled from Bali after a party that authorities said violated COVID-era restrictions — an example of lifestyle content colliding with local law.",
    sourceId: "ndtv",
  },
  {
    year: "2024",
    title: "Cash carpet / cash stairs",
    copy: "A widely reported video showed his girlfriend arriving by helicopter and walking over stacks of cash. It went viral again in 2024. Some viewers called the display excessive; others questioned whether the notes were genuine.",
    sourceId: "ndtv",
  },
  {
    year: "2024",
    title: "Child / snow video",
    copy: "A video involving his young child being thrown into a snowbank generated major backlash. Reports said Russian authorities and lawmakers discussed possible legal consequences. This is more serious than ordinary influencer criticism because it involved child-safety allegations.",
    sourceId: "et",
  },
];

export const verification = [
  { topic: "Real identity", status: "Established", detail: "Sergei / Sergey Kosenko" },
  { topic: "Mr Thank You brand", status: "Established", detail: "Public personal brand" },
  { topic: "Russian background", status: "Widely reported", detail: "Associated with Moscow" },
  { topic: "Social-media career", status: "Established", detail: "Viral short-form creator" },
  { topic: "Entrepreneurial activity", status: "Established / mixed", detail: "Reported companies; verification varies" },
  { topic: "Large online audience", status: "Historically documented", detail: "54.1M Instagram followers" },
  { topic: "Music & podcast", status: "Established", detail: "Promoted on his public link hub" },
  { topic: "Dubai association", status: "Widely reported", detail: "Lifestyle and business reporting" },
  { topic: "Real-estate involvement", status: "Reported", detail: "Not independently audited here" },
  { topic: "Amazy involvement", status: "Reported", detail: "Fitness + crypto app claims" },
  { topic: "Exact net worth", status: "Not verified", detail: "Online figures range from millions to ~$500m" },
  { topic: "Cash in videos / luxury ownership", status: "Not established", detail: "Props, rentals, and partnerships are common" },
];

export const timeline = [
  {
    year: "~2014",
    title: "Reported retail start",
    copy: "Publications describe an early move into apparel/retail before the international influencer era.",
  },
  {
    year: "2021",
    title: "Shock-value virality",
    copy: "The Bentley stunt and Bali expulsion put his name into news coverage beyond social media.",
  },
  {
    year: "2022",
    title: "Amazy (reported)",
    copy: "A lifestyle/fitness app combining activity tracking with crypto rewards is associated with this period.",
  },
  {
    year: "2023",
    title: "Dubai real estate (reported)",
    copy: "Habibi Real Estate is described in media as a Dubai property venture.",
  },
  {
    year: "2024",
    title: "Global news loop",
    copy: "Cash-carpet imagery, large follower claims, and the child/snow video all circulated through mainstream outlets.",
  },
  {
    year: "Now",
    title: "Creator-led ecosystem",
    copy: "The public brand spans Reels, giveaways, music, a podcast, and entrepreneurial ventures. Exact finances remain unverified.",
  },
];

export const playbook = [
  {
    title: "Personal branding",
    copy: "A memorable name — gratitude instead of “Mr Money” — changes the emotional frame.",
  },
  {
    title: "Visual storytelling",
    copy: "Helicopter + cash + reaction can be understood without language or subtitles.",
  },
  {
    title: "Emotional triggers",
    copy: "Surprise, gratitude, curiosity, and shock all increase comments and shares.",
  },
  {
    title: "Production value",
    copy: "Luxury environments make ordinary actions look extraordinary.",
  },
  {
    title: "Short-form distribution",
    copy: "Reels, TikTok, and Shorts reward instant comprehension.",
  },
  {
    title: "Media amplification",
    copy: "News sites turn a Reel into Google searches and more Instagram traffic.",
  },
  {
    title: "Business diversification",
    copy: "Attention is routed into companies, real estate, apps, and media.",
  },
  {
    title: "Community",
    copy: "Giveaways turn spectators into participants.",
  },
];

export const moments = [
  {
    number: "01",
    title: "Set the scene",
    copy: "Extreme visuals — Cash, luxury rooms — make the story stop the scroll before anyone speaks.",
    image: photos.helicopter,
    alt: "Mr Thank You stepping from a helicopter as spectacle-first content",
    className: "moment-lilac",
    tag: "THE SPECTACLE",
  },
  {
    number: "02",
    title: "Make it a moment",
    copy: "A generous or shocking gesture is incomplete until someone reacts on camera.",
    image: photos.cashTable,
    alt: "Mr Thank You at a cash-covered table overlooking the water",
    className: "moment-peach",
    tag: "THE GESTURE",
  },
  {
    number: "03",
    title: "Pass it around",
    copy: "Giveaways, clips, and news coverage turn one video into a distribution machine.",
    image: photos.mascots,
    alt: "Mr Thank You staging a public cash spectacle with mascot characters",
    className: "moment-blue",
    tag: "THE GIVEAWAY",
  },
];

export const channels = [
  {
    name: "Official hub",
    handle: "All current links via LinkMe",
    href: "https://link.me/mr.thank.youuu",
    className: "social-instagram",
  },
  {
    name: "Podcast / music",
    handle: "Mr. Thank You Podcast & artist pages",
    href: "https://link.me/mr.thank.youuu",
    className: "social-tiktok",
  },
  {
    name: "Facebook",
    handle: "Mr. Thank You",
    href: "https://www.facebook.com/mr.thank.youu/",
    className: "social-facebook",
  },
];
