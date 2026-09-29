import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Narrato — KI-Erklärvideo Studio",
  description:
    "Vom Thema zum fertigen Erklärvideo: Mistral schreibt das Drehbuch, Pollinations generiert Bilder & Stimme, dein Browser schneidet den Film. Kostenlos.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${space.variable}`}>
      <body className="noise bg-ink text-bright antialiased">
        {/* Aurora-Hintergrund */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="animate-float-slow absolute -top-[30%] left-1/2 h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.16),transparent_60%)] blur-3xl" />
          <div className="absolute top-[40%] -left-[20%] h-[60vh] w-[50vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(217,70,239,0.08),transparent_60%)] blur-3xl" />
          <div className="absolute -right-[15%] bottom-[-10%] h-[55vh] w-[45vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.06),transparent_60%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_70%)]" />
        </div>
        {children}
      </body>
    </html>
  );
}
