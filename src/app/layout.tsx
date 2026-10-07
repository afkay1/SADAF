import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Pinyon_Script } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { TransitionProvider } from "@/components/TransitionProvider";
import Intro from "@/components/Intro";
import Chrome from "@/components/Chrome";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const script = Pinyon_Script({ subsets: ["latin"], weight: "400", variable: "--font-script", display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "SADAF Residences — Beachfront living on the Red Sea",
  description:
    "96 private residences between the palms and the Red Sea. Garden, courtyard, terrace and penthouse homes, from SAR 1.19 million.",
};

const introScript = `try{if(!sessionStorage.getItem('sadaf-intro'))document.documentElement.classList.add('intro')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${script.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <SmoothScroll />
        <TransitionProvider>
          <Intro />
          <Chrome />
          <main>{children}</main>
        </TransitionProvider>
      </body>
    </html>
  );
}
