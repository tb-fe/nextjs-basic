import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/styles/globals.css";
import { env } from "@/env.mjs";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
      {!!env.GOOGLE_GA_ID && <GoogleAnalytics gaId={env.GOOGLE_GA_ID} />}
    </html>
  );
}
