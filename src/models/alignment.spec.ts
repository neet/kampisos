import { describe, expect, test } from "vitest";

import { TokenAlignment } from "./alignment";

describe("TokenAlignment", () => {
  test("toCharAlignment", () => {
    const alignment = new TokenAlignment({
      s: [
        [1, 2],
        [3, 4],
        [5, 6],
      ],
      a: [1, 2, 3],
      j: [1, 2],
    });

    const charAlignment = alignment.toCharAlignment();

    expect(charAlignment.scores).toEqual([
      [1, 2, 2],
      [3, 4, 4],
      [3, 4, 4],
      [5, 6, 6],
      [5, 6, 6],
      [5, 6, 6],
    ]);
  });
});
