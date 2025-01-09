import { expect, test } from "@playwright/test";

test("トップページから検索できる", async ({ page }) => {
  await page.goto("/");
  const form = page.getByRole("textbox", { name: "キーワード" });
  await form.fill("pirka");
  await form.press("Enter");

  await expect(page).toHaveURL(/\/search\?q=pirka/);
});

test("詳細を押すとダイアログが開く", async ({ page }) => {
  await page.goto("/");

  const form = page.getByRole("textbox", { name: "キーワード" });
  await form.fill("pirka");
  await form.press("Enter");
  await expect(page).toHaveURL(/\/search\?q=pirka/);

  const detailButton = page.getByRole("button", { name: "詳細" }).first();
  await detailButton.click();

  await expect(page.getByRole("dialog", { name: "詳細" })).toBeVisible();
});
