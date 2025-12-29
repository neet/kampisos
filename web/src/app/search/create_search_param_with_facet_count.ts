import { MultiSearchRequestSchema } from "typesense/lib/Typesense/Types";
import { Entry } from "@/models/entry";
import { SearchResponse } from "typesense/lib/Typesense/Documents";

type SearchWithFacetCountParams = {
  /** 検索文字列 */
  query: string;
  /** ページ番号 */
  page: number;

  facets: {
    /** 方言 */
    dialect_lv1: string[];
    dialect_lv2: string[];
    dialect_lv3: string[];
    /** 本 */
    book: string[];
    /** 著者 */
    author: string[];
    /** 代名詞 */
    pronoun: string[];
  };
};

export const createSearchParamsWithFacetCount = (
  params: SearchWithFacetCountParams,
): MultiSearchRequestSchema<Entry, string>[] => {
  const { query, page, facets } = params;

  return [
    {
      collection: "entries",
      q: query,
      query_by: ["text", "translation"],
      highlight_full_fields: ["text", "translation"],
      page,
      per_page: 20,
      max_facet_values: 999,
      facet_by: Object.entries(facets)
        .filter(([, value]) => value.length <= 0)
        .map(([key]) => key),
      filter_by: createFilterBy(facets),
    },
    ...Object.entries(facets)
      .filter(([, value]) => value.length > 0)
      .map(([selfKey]) => {
        const facetExcludingSelf = Object.fromEntries(
          Object.entries(facets).filter(([key]) => key !== selfKey),
        );

        return {
          collection: "entries",
          q: query,
          per_page: 0,
          query_by: ["text", "translation"],
          max_facet_values: 999,
          facet_by: selfKey,
          filter_by: createFilterBy(facetExcludingSelf),
        };
      }),
  ];
};

export const unwrapSearchResponse = async (
  promise: Promise<{
    results: SearchResponse<Entry>[];
  }>,
) => {
  const { results } = await promise;
  return results[0];
};

export const unwrapFacets = async (
  promise: Promise<{
    results: SearchResponse<Entry>[];
  }>,
): Promise<Record<string, Record<string, number>>> => {
  const { results } = await promise;
  const facets: Record<string, Record<string, number>> = {};

  for (const result of results) {
    if (result.facet_counts == null) {
      continue;
    }

    for (const facetCount of result.facet_counts) {
      const facet: Record<string, number> = {};

      for (const count of facetCount.counts) {
        facet[count.value] = count.count;
      }

      facets[facetCount.field_name] = facet;
    }
  }

  return facets;
};

const createFilterBy = (valueList: Record<string, string[]>): string => {
  return Object.entries(valueList)
    .filter(([, value]) => value.length > 0)
    .map(([key, values]) =>
      values.length > 0
        ? values.map((value) => `${key}:\`${value}\``).join("||")
        : null,
    )
    .map((value) => `(${value})`)
    .join("&&");
};
