import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

import LenisProvider from "@/components/LenisProvider";
import AudioPlayer from "@/components/AudioPlayer";

export const metadata: Metadata = {
  title: "Rashmi & Aditya - We're Getting Married",
  description: "Join us in celebrating our wedding.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body className="flex flex-col font-sans text-foreground bg-background">
        <LenisProvider>
          {children}
          <AudioPlayer />
        </LenisProvider>
      </body>
    </html>
  );
}
