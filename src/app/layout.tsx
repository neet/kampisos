import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import clsx from "clsx";
import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";

import { Banner } from "@/components/Banner";
import { ContentInfo } from "@/components/ContentInfo";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-roboto",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: {
    default: "アイヌ語コーパス検索",
    template: "%s | アイヌ語コーパス検索",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    images: "/cover.png",
  },
};

type RootProps = {
  children: React.ReactNode;
};

export default async function RootLayout(props: RootProps) {
  const { children } = props;

  return (
    <html lang="ja" className={clsx(roboto.variable, robotoMono.variable)}>
      <body
        className={clsx(
          "font-sans antialiased",
          "text-zinc-950 bg-zinc-50 heropattern-banknote-zinc-100",
          "dark:text-zinc-50 dark:bg-zinc-900 dark:heropattern-banknote-zinc-950",
          "grid grid-rows-[auto,1fr,auto] grid-cols-[100%] min-h-[100svh]",
        )}
      >
        <Banner />
        {children}
        <ContentInfo />
      </body>
      <GoogleAnalytics gaId="G-RK31448XYB" />
    </html>
  );
}
