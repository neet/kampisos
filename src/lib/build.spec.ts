import { expect, test } from "vitest";

import { buildRequests } from "./build";

test("buildRequests", () => {
  expect(
    buildRequests({
      query: "test",
      page: 0,
      facets: {
        dialect: ["沙流", "千歳"],
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
          "author",
          "pronoun",
        ],
        "filters": "(dialect:"沙流" OR dialect:"千歳") AND (book:"アイヌタイムズ")",
        "hitsPerPage": 20,
        "indexName": "entries",
        "maxValuesPerFacet": 10,
        "page": 0,
        "query": "test",
      },
      {
        "facets": [
          "dialect",
        ],
        "filters": "(book:"アイヌタイムズ")",
        "hitsPerPage": 0,
        "indexName": "entries",
        "maxValuesPerFacet": 10,
        "query": "test",
      },
      {
        "facets": [
          "book",
        ],
        "filters": "(dialect:"沙流" OR dialect:"千歳")",
        "hitsPerPage": 0,
        "indexName": "entries",
        "maxValuesPerFacet": 10,
        "query": "test",
      },
    ]
  `);
});
