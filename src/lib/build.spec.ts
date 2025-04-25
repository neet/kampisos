import { expect, test } from "vitest";

import { buildRequests } from "./build";

test("buildRequests", () => {
  expect(
    buildRequests({
      query: "test",
      page: 0,
      facets: {
        dialect_lv1: [],
        dialect_lv2: [],
        dialect_lv3: ["北海道>南西>沙流", "北海道>南西>千歳"],
        book: ["アイヌタイムズ"],
        author: [],
        pronoun: [],
      },
    }),
  ).toMatchInlineSnapshot(`
    [
      {
        "attributesToHighlight": [
          "text",
          "translation",
        ],
        "facets": [
          "dialect_lv1",
          "dialect_lv2",
          "author",
          "pronoun",
        ],
        "filters": "(dialect_lv3:"北海道>南西>沙流" OR dialect_lv3:"北海道>南西>千歳") AND (book:"アイヌタイムズ")",
        "hitsPerPage": 20,
        "indexName": "entries",
        "page": 0,
        "query": "test",
      },
      {
        "facets": [
          "dialect_lv3",
        ],
        "filters": "(book:"アイヌタイムズ")",
        "hitsPerPage": 0,
        "indexName": "entries",
        "query": "test",
      },
      {
        "facets": [
          "book",
        ],
        "filters": "(dialect_lv3:"北海道>南西>沙流" OR dialect_lv3:"北海道>南西>千歳")",
        "hitsPerPage": 0,
        "indexName": "entries",
        "query": "test",
      },
    ]
  `);
});
