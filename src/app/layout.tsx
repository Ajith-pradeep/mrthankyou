import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const serif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const title = "Mr. Thank You — Sergei Kosenko, documented vs reported";
const description =
  "An informational profile of Sergei/Sergey Kosenko, known as Mr Thank You: identity, content model, reported businesses, controversies, and what remains unverified.";
const metaImage = {
  url: "/mr-thank-you/tuxedo-cash.jpg",
  width: 920,
  height: 736,
  alt: "Mr Thank You in a tuxedo",
};
const siteUrl = process.env.URL || process.env.DEPLOY_PRIME_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title,
  description,
  icons: {
    icon: [{ url: "/mr-thank-you/tuxedo-cash.jpg", type: "image/jpeg" }],
    apple: "/mr-thank-you/tuxedo-cash.jpg",
  },
  openGraph: {
    title,
    description,
    images: [metaImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [metaImage.url],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} motion-ready h-full antialiased`}
    >
      <body className="min-h-full bg-bg font-sans text-ink">{children}</body>
    </html>
  );
}
