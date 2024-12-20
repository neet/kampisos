import { SearchQuery, SearchResponse } from "algoliasearch";

import { Entry } from "@/models/entry";

import { searchClient } from "../lib/search";
import { buildFiltersFromFacets, FacetFilters } from "./buildFiltersFromFacets";

type Facet = Record<string, number>;
type FacetValues = Record<string, Facet>;

export const fetchComplexFacets = async (
  query: string,
  facetFilters: FacetFilters,
  searchRequest: Promise<SearchResponse<Entry>>,
): Promise<FacetValues> => {
  const requests: SearchQuery[] = [];

  // ----------------------------------
  // facetがセットされているものを取得
  // ----------------------------------
  const facetsSet = Object.fromEntries(
    Object.entries(facetFilters).filter((entry) => entry[1].length > 0),
  );
  const facetsSetKeys = Object.keys(facetsSet);

  for (const key of facetsSetKeys) {
    const facetExcludingKey = Object.fromEntries(
      Object.entries(facetFilters).filter((entry) => entry[0] !== key),
    );

    // 自分だけを除外したフィルターを作成
    requests.push({
      query,
      indexName: "entries",
      hitsPerPage: 0,
      facets: [key],
      filters: buildFiltersFromFacets(facetExcludingKey),
    });
  }

  // ----------------------------------

  const base = await searchRequest;

  if (requests.length === 0) {
    return base.facets ?? {};
  }

  const responses = await searchClient.searchForHits(requests);

  return responses.results.reduce<FacetValues>(
    (acc, response) => Object.assign(acc, response.facets),
    base.facets ?? {},
  );
};
