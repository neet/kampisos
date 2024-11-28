import React from "react";
import { Decorator } from "@storybook/react";
import { Roboto } from "next/font/google";
import clsx from "clsx";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-roboto",
});

export const withFonts: Decorator = (Story) => {
  return (
    <div className={clsx(roboto.variable)} style={{
      fontFamily: "var(--font-roboto)",
    }}>
      <Story />
    </div>
  );
};
