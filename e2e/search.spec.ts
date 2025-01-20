import { expect, test } from "@playwright/test";

test("トップページからアイヌ語で検索できる", async ({ page }) => {
  await page.goto("/");
  const form = page.getByRole("textbox", { name: "キーワード" });
  await form.fill("pirka");
  await form.press("Enter");

  await expect(page).toHaveURL(/\/search\?q=pirka/);
  await expect(page).toHaveTitle(/pirka（ピㇼカ）の検索結果/);
});

test("トップページから日本語で検索できる", async ({ page }) => {
  await page.goto("/");
  const form = page.getByRole("textbox", { name: "キーワード" });
  await form.fill("良い");
  await form.press("Enter");

  await expect(page).toHaveURL(/\/search\?q=%E8%89%AF%E3%81%84/);
  await expect(page).toHaveTitle(/「良い」の検索結果/);
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

test("出典で絞り込み検索が行える", async ({ page }) => {
  await page.goto("/search?q=pirka");

  await page
    .getByRole("group", { name: "出典" })
    .getByRole("checkbox", { name: /アイヌ語アーカイブ （ [\d,]+ 件）/ })
    .check();
  await page.getByRole("button", { name: "適用" }).click();
  await page.waitForLoadState("networkidle");

  const url = new URL(page.url());

  expect(url.searchParams.get("q")).toBe("pirka");
  expect(url.searchParams.get("book")).toBe("アイヌ語アーカイブ");
});

test("方言で絞り込み検索が行える", async ({ page }) => {
  await page.goto("/search?q=pirka");
  await page
    .getByRole("group", { name: "方言" })
    .getByRole("checkbox", { name: /沙流 （ [\d,]+ 件）/ })
    .check();
  await page.getByRole("button", { name: "適用" }).click();
  await page.waitForLoadState("networkidle");

  const url = new URL(page.url());

  expect(url.searchParams.get("q")).toBe("pirka");
  expect(url.searchParams.get("dialect")).toBe("沙流");
});

test("著者で絞り込み検索が行える", async ({ page }) => {
  await page.goto("/search?q=pirka");
  await page
    .getByRole("group", { name: "著者" })
    .getByRole("checkbox", { name: /川上まつ子 （ [\d,]+ 件）/ })
    .check();
  await page.getByRole("button", { name: "適用" }).click();
  await page.waitForLoadState("networkidle");

  const url = new URL(page.url());

  expect(url.searchParams.get("q")).toBe("pirka");
  expect(url.searchParams.get("author")).toBe("川上まつ子");
});

test("人称で絞り込み検索が行える", async ({ page }) => {
  await page.goto("/search?q=pirka");
  await page
    .getByRole("group", { name: "人称" })
    .getByRole("checkbox", { name: /一人称 （ [\d,]+ 件）/ })
    .check();
  await page.getByRole("button", { name: "適用" }).click();
  await page.waitForLoadState("networkidle");

  const url = new URL(page.url());

  expect(url.searchParams.get("q")).toBe("pirka");
  expect(url.searchParams.get("pronoun")).toBe("first");
});
