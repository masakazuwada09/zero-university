import type { Metadata, Viewport } from "next";
import { Inter, Syne, Newsreader, Space_Mono } from "next/font/google";
import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700", "800"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#06130d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Zero University — Reimagining the Architecture of Intellect",
  description:
    "An unaccredited, post-disciplinary sanctuary for autonomous thinkers, frontier researchers, and radical creators. Designed for deep curiosity.",
  keywords: [
    "Zero University",
    "Creative Tech",
    "Future of Education",
    "Autonomous Learning",
    "Post-disciplinary",
    "Interactive Portfolio",
    "Awwwards",
  ],
  openGraph: {
    title: "Zero University — Reimagining the Architecture of Intellect",
    description: "An unaccredited sanctuary for autonomous thinkers and creators.",
    type: "website",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={cn(
        inter.variable,
        syne.variable,
        newsreader.variable,
        spaceMono.variable,
        "bg-forest-950 text-offwhite antialiased selection:bg-forest-700 selection:text-mint-accent"
      )}
    >
      <body className="relative min-h-screen overflow-x-hidden bg-forest-950 font-sans">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
