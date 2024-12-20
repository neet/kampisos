import { describe, expect, it } from "vitest";

import { maximum } from "./array";

describe("maximum", () => {
  it("should return the maximum of two arrays", () => {
    expect(maximum([1, 2, 3], [2, 3, 4])).toEqual([2, 3, 4]);
  });
});
