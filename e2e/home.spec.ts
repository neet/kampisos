import { expect, test } from "@playwright/test";

test("トップページを表示できる", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("body")).toMatchAriaSnapshot(`
    - banner:
      - link "kampisos":
        - heading "kampisos" [level=1]
      - link "使い方"
    - main:
      - heading "アイヌ語の世界を探訪しよう" [level=2]
      - paragraph: /約\\d+万語を収録した日本語・アイヌ語対訳コーパス/
      - text: キーワード
      - textbox "キーワード"
      - img
      - heading "最近の更新" [level=2]
    - paragraph: /Copyright © \\d+ Ryō Igarashi\\. All rights reserved\\./
  `);
});
