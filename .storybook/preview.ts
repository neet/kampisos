import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import { withFonts } from "./decorator";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withFonts]
};

export default preview;
