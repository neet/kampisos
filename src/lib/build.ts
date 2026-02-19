import { SearchQuery, SearchResponse } from "algoliasearch/lite";

import { Entry } from "@/models/entry";

export type SearchPromise = Promise<{
  results: SearchResponse<Entry>[];
}>;
export type FacetFilters = Record<string, string[]>;
export type Facet = Record<string, number>;
export type FacetValues = Record<string, Facet>;

export type BuildRequestsParams = {
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
    group: string[];
    /** 著者 */
    author: string[];
    /** 代名詞 */
    pronoun: string[];
  };
};

const buildFilters = (facets: FacetFilters): string => {
  const filters = [
    ...Object.entries(facets).map(([facet, values]) => {
      if (values.length === 0) {
        return null;
      }
      const filter = values.map((value) => `${facet}:"${value}"`).join(" OR ");
      return `(${filter})`;
    }),
  ]
    .filter((filter) => filter !== null)
    .join(" AND ");

  return filters;
};

export const buildRequests = (params: BuildRequestsParams): SearchQuery[] => {
  const { query, page, facets } = params;
  const facetEntries = Object.entries(facets);

  const requests: SearchQuery[] = [
    {
      query: query,
      indexName: "entries",
      page: page,
      hitsPerPage: 20,
      filters: buildFilters({
        dialect_lv1: facets.dialect_lv1,
        dialect_lv2: facets.dialect_lv2,
        dialect_lv3: facets.dialect_lv3,
        group: facets.group,
        author: facets.author,
        pronoun: facets.pronoun,
      }),
      facets: facetEntries
        .filter(([, values]) => values.length <= 0)
        .map(([key]) => key),
      attributesToHighlight: ["text", "translation"],
    },
    ...facetEntries
      .filter(([, values]) => {
        return values.length > 0;
      })
      .map(([selfKey]): SearchQuery => {
        const facetExcludingSelf = Object.fromEntries(
          facetEntries.filter((entry) => entry[0] !== selfKey),
        );

        return {
          query,
          indexName: "entries",
          hitsPerPage: 0,
          facets: [selfKey],
          filters: buildFilters(facetExcludingSelf),
        };
      }),
  ];

  return requests;
};

export const unwrapSearchResponse = async (
  promise: SearchPromise,
): Promise<SearchResponse<Entry>> => {
  const { results } = await promise;
  return results[0];
};

export const unwrapFacets = async (
  promise: SearchPromise,
): Promise<Record<string, Record<string, number>>> => {
  const { results } = await promise;

  return results.reduce<FacetValues>(
    (acc, response) => Object.assign(acc, response.facets),
    {},
  );
};
