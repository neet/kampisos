import { expect, test } from "@playwright/test";

test("トップページを表示できる", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("kampisos - アイヌ語コーパス検索");
});
