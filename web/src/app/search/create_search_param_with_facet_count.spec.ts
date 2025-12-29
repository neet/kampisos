import { expect, test } from "vitest";
import { createSearchParamsWithFacetCount } from "./create_search_param_with_facet_count";

test("createSearchParamsWithFacetCount", () => {
  expect(
    createSearchParamsWithFacetCount({
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
        "collection": "entries",
        "facet_by": [
          "dialect_lv1",
          "dialect_lv2",
          "author",
          "pronoun",
        ],
        "filter_by": "(dialect_lv3:\`北海道>南西>沙流\`||dialect_lv3:\`北海道>南西>千歳\`)&&(book:\`アイヌタイムズ\`)",
        "highlight_full_fields": [
          "text",
          "translation",
        ],
        "max_facet_values": 999,
        "page": 0,
        "per_page": 20,
        "q": "test",
        "query_by": [
          "text",
          "translation",
        ],
      },
      {
        "collection": "entries",
        "facet_by": "dialect_lv3",
        "filter_by": "(book:\`アイヌタイムズ\`)",
        "max_facet_values": 999,
        "per_page": 0,
        "q": "test",
        "query_by": [
          "text",
          "translation",
        ],
      },
      {
        "collection": "entries",
        "facet_by": "book",
        "filter_by": "(dialect_lv3:\`北海道>南西>沙流\`||dialect_lv3:\`北海道>南西>千歳\`)",
        "max_facet_values": 999,
        "per_page": 0,
        "q": "test",
        "query_by": [
          "text",
          "translation",
        ],
      },
    ]
  `);
});
