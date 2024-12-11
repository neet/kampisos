import { SearchQuery } from "algoliasearch";

import { searchClient } from "../lib/search";
import { buildFiltersFromFacets, FacetFilters } from "./buildFiltersFromFacets";

type Facet = Record<string, number>;
type FacetValues = Record<string, Facet>;

export const fetchComplexFacets = async (
  query: string,
  facetFilters: FacetFilters,
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
  // facetがセットされていない物を取得
  // ----------------------------------
  const facetsUnset = Object.fromEntries(
    Object.entries(facetFilters).filter((entry) => entry[1].length <= 0),
  );
  const facetsUnsetKeys = Object.keys(facetsUnset);

  requests.push({
    query,
    indexName: "entries",
    hitsPerPage: 0,
    facets: facetsUnsetKeys,
    filters: buildFiltersFromFacets(facetFilters),
  });

  // ----------------------------------

  const responses = await searchClient.searchForHits(requests);

  return responses.results.reduce<FacetValues>(
    (acc, response) => Object.assign(acc, response.facets),
    {},
  );
};
