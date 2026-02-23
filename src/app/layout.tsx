import "./globals.css";
import "@radix-ui/themes/styles.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Grid, Theme } from "@radix-ui/themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { clsx } from "clsx";
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
  metadataBase: new URL("https://kampisos.aynu.io"),
  title: {
    default: "Kampisos - アイヌ語コーパス検索",
    template: "%s | Kampisos - アイヌ語コーパス検索",
  },
  robots: {
    index: true,
    follow: false,
  },
  openGraph: {
    title: "Kampisos - アイヌ語コーパス検索",
    description:
      "アイヌ語・日本語のキーワードを入力して複数のコーパスを検索できます",
    images: "/cover.png",
  },
  icons: [
    {
      url: "/icon+light.svg",
      type: "image/svg+xml",
      media: "(prefers-color-scheme: light)",
    },
    {
      url: "/icon+dark.svg",
      type: "image/svg+xml",
      media: "(prefers-color-scheme: dark)",
    },
  ],
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
            <Grid
              className="gradient"
              columns="100%"
              rows="auto 1fr auto"
              minHeight="100vh"
            >
              <Banner />
              {children}
              <ContentInfo />
            </Grid>
          </Theme>
        </ThemeProvider>

        <GoogleAnalytics gaId="G-RK31448XYB" />
        <SpeedInsights />
      </body>
    </html>
  );
}
