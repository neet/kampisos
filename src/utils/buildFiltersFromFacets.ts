export type FacetFilters = Record<string, string[]>;

export const buildFiltersFromFacets = (facets: FacetFilters): string => {
  const filters = [
    ...Object.entries(facets).map(([facet, values]) => {
      if (values.length === 0) {
        return null;
      }
      const filter = values.map((value) => `${facet}:${value}`).join(" OR ");
      return `(${filter})`;
    }),
  ]
    .filter((filter) => filter !== null)
    .join(" AND ");

  return filters;
};
