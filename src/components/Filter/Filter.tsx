import { FC } from "react";

import { FilterFacet } from "./FilterFacet";

export type FilterProps = {
  form: string;
  facets: Record<string, Record<string, number>>;
  facetFilters: Record<string, string[] | undefined>;
};

export const Filter: FC<FilterProps> = (props) => {
  const { form, facets, facetFilters } = props;

  return (
    <div>
      <h2 className="text-xl font-bold">フィルター</h2>

      <div className="space-y-8">
        <FilterFacet
          form={form}
          title="出典"
          facet={facets.book}
          facetFilter={facetFilters.book}
        />
        <FilterFacet
          form={form}
          title="ドメイン"
          facet={facets.pronoun}
          facetFilter={facetFilters.pronoun}
        />
        <FilterFacet
          form={form}
          title="著者"
          facet={facets.author}
          facetFilter={facetFilters.author}
        />
        <FilterFacet
          form={form}
          title="方言"
          facet={facets.dialect}
          facetFilter={facetFilters.dialect}
        />
      </div>
    </div>
  );
};
