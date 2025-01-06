import { describe, expect, it } from "vitest";

import { hstack, transpose, vstack } from "./matrix";

describe("hstack", () => {
  it("should stack matrices horizontally", () => {
    const matrices = [
      [
        [1, 2],
        [3, 4],
      ],
      [
        [5, 6],
        [7, 8],
      ],
    ];

    const result = hstack(matrices);

    expect(result).toEqual([
      [1, 2, 5, 6],
      [3, 4, 7, 8],
    ]);
  });
});

describe("vstack", () => {
  it("should stack matrices vertically", () => {
    const matrices = [
      [
        [1, 2],
        [3, 4],
      ],
      [
        [5, 6],
        [7, 8],
      ],
    ];

    const result = vstack(matrices);

    expect(result).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ]);
  });
});

describe("transpose", () => {
  it("should transpose a matrix", () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];

    const result = transpose(matrix);

    expect(result).toEqual([
      [1, 3],
      [2, 4],
    ]);
  });
});
