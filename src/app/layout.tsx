import "./globals.css";

import clsx from "clsx";
import type { Metadata } from "next";

import { Banner } from "@/components/Banner";
import { ContentInfo } from "@/components/ContentInfo";

export const metadata: Metadata = {
  title: {
    default: "アイヌ語コーパス横断検索",
    template: "%s | アイヌ語コーパス横断検索",
  },
  robots: {
    index: false,
    follow: false,
  },
};

type RootProps = {
  children: React.ReactNode;
};

export default function RootLayout(props: RootProps) {
  const { children } = props;

  return (
    <html lang="ja">
      <body
        className={clsx(
          "antialiased",
          "bg-zinc-50 heropattern-banknote-zinc-100",
          "grid grid-rows-[auto,1fr,auto] grid-cols-[100%] min-h-[100svh]",
        )}
      >
        <Banner />
        {children}
        <ContentInfo />
      </body>
    </html>
  );
}
