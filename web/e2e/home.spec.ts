import { expect, test } from "@playwright/test";

test("トップページを表示できる", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Kampisos - アイヌ語コーパス検索");
});
