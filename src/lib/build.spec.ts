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
        collection_lv1: ["アイヌタイムズ"],
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
        "filters": "(dialect_lv3:"北海道>南西>沙流" OR dialect_lv3:"北海道>南西>千歳") AND (collection_lv1:"アイヌタイムズ")",
        "hitsPerPage": 20,
        "indexName": "entries",
        "page": 0,
        "query": "test",
      },
      {
        "facets": [
          "dialect_lv3",
        ],
        "filters": "(collection_lv1:"アイヌタイムズ")",
        "hitsPerPage": 0,
        "indexName": "entries",
        "query": "test",
      },
      {
        "facets": [
          "collection_lv1",
        ],
        "filters": "(dialect_lv3:"北海道>南西>沙流" OR dialect_lv3:"北海道>南西>千歳")",
        "hitsPerPage": 0,
        "indexName": "entries",
        "query": "test",
      },
    ]
  `);
});
