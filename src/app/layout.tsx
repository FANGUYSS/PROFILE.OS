import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PROFILE.OS — FANGUYSS",
  description: "A personal operating system by FANGUYSS.",
  applicationName: "PROFILE.OS",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "PROFILE.OS" },
};
export const viewport: Viewport = {
  width: "device-width", initialScale: 1, maximumScale: 1, userScalable: false,
  viewportFit: "cover", themeColor: "#08090d"
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
