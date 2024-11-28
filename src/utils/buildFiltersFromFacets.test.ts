import { describe, expect, test } from "vitest";

import { buildFiltersFromFacets } from "./buildFiltersFromFacets";

describe("buildFiltersFromFacets", () => {
  test("空文字列を返す", () => {
    const filters = buildFiltersFromFacets({});
    expect(filters).toBe("");
  });

  test("フィルターが設定されてるとき", () => {
    const filters = buildFiltersFromFacets({ color: ["red"] });
    expect(filters).toBe("(color:red)");
  });

  test("フィルターが複数設定されているとき", () => {
    const filters = buildFiltersFromFacets({ color: ["red", "blue"] });
    expect(filters).toBe("(color:red OR color:blue)");
  });

  test("複数ファセットが設定されているとき", () => {
    const filters = buildFiltersFromFacets({ color: ["red"], size: ["small"] });
    expect(filters).toBe("(color:red) AND (size:small)");
  });

  test("複数ファセットに複数フィルターが設定されているとき", () => {
    const filters = buildFiltersFromFacets({
      color: ["red", "blue"],
      size: ["small", "medium"],
    });
    expect(filters).toBe(
      "(color:red OR color:blue) AND (size:small OR size:medium)",
    );
  });

  test("プロパティのみ設定されているとき", () => {
    const filters = buildFiltersFromFacets({ color: [] });
    expect(filters).toBe("");
  });
});
