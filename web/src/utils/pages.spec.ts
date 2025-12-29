import { expect, test } from "vitest";
import { createPages } from "./pages";

test("few results", () => {
  const pages = createPages(1, 2, 5);

  expect(pages).toEqual({
    hasMore: {
      leading: false,
      trailing: false,
    },
    value: [1, 2],
  });
});

test("many results", () => {
  const pages = createPages(1, 10, 5);

  expect(pages).toEqual({
    hasMore: {
      leading: false,
      trailing: true,
    },
    value: [1, 2, 3, 4, 5],
  });
});
