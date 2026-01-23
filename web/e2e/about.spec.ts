import { expect, test } from "@playwright/test";

test("使い方を表示できる", async ({ page }) => {
  await page.goto("/about");

  await expect(page.locator("body")).toMatchAriaSnapshot(`
    - banner:
      - link "Kampisos":
        - heading "Kampisos" [level=1]
      - link "使い方"
    - main:
      - heading "このサイトについて" [level=2]
      - article:
        - paragraph
    - paragraph: /Copyright © \\d+ Ryō Igarashi\\. All rights reserved\\./
  `);
});
