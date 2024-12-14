import "./globals.css";
import "@radix-ui/themes/styles.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Grid, Theme } from "@radix-ui/themes";
import clsx from "clsx";
import type { Metadata } from "next";
import { Cookie, Roboto, Roboto_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";

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

const cookie = Cookie({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cookie",
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
    <html
      lang="ja"
      className={clsx(roboto.variable, robotoMono.variable, cookie.variable)}
      // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class">
          <Theme accentColor="teal" grayColor="sand">
            <Grid columns="100%" rows="auto 1fr auto" minHeight="100vh">
              <Banner />
              {children}
              <ContentInfo />
            </Grid>
          </Theme>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-RK31448XYB" />
    </html>
  );
}
