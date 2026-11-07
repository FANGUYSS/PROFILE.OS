import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { DiscordProvider } from "@/context/DiscordContext";
import { MusicProvider } from "@/context/MusicContext";
import { TerminalProvider } from "@/context/TerminalContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://fanguyss.me"),
  title: "FANGUYSS — PROFILE.OS",
  description:
    "Developer, creator, and builder crafting web products, Discord bots, automation projects, and experimental tools.",
  alternates: {
    canonical: "https://fanguyss.me",
  },
  openGraph: {
    title: "FANGUYSS — PROFILE.OS",
    description:
      "Developer, creator, and builder crafting web products, Discord bots, automation projects, and experimental tools.",
    url: "https://fanguyss.me",
    siteName: "FANGUYSS — PROFILE.OS",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <ThemeProvider>
          <DiscordProvider>
            <MusicProvider>
              <TerminalProvider>{children}</TerminalProvider>
            </MusicProvider>
          </DiscordProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
