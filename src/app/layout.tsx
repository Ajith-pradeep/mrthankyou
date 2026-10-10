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

export const metadata: Metadata = {
  title: "Mr. Thank You — Sergei Kosenko, documented vs reported",
  description:
    "An informational profile of Sergei/Sergey Kosenko, known as Mr Thank You: identity, content model, reported businesses, controversies, and what remains unverified.",
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
