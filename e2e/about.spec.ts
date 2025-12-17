import { expect, test } from "vitest";
import { page } from "vitest/browser";

test("使い方を表示できる", async () => {
  await page.goto("/about");

  await expect(page.locator("body")).toMatchAriaSnapshot(`
    - banner:
      - link "kampisos":
        - heading "kampisos" [level=1]
      - link "使い方"
    - main:
      - heading "このサイトについて" [level=2]
      - article:
        - paragraph
    - paragraph: /Copyright © \\d+ Ryō Igarashi\\. All rights reserved\\./
  `);
});
