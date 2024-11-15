import { FC } from "react";

export type FilterFacetProps = {
  form: string;
  title: string;
  facet: Record<string, number>;
  facetFilter: string[] | undefined;
};

export const FilterFacet: FC<FilterFacetProps> = (props) => {
  const { form, title, facet, facetFilter } = props;

  return (
    <section>
      <h3 className="text-lg font-bold">{title}</h3>

      <ul className="mt-2 space-y-1">
        {Object.entries(facet).map(([facet, count]) => (
          <li key={facet}>
            <label>
              <input
                name={facet}
                form={form}
                type="checkbox"
                className="mr-1"
                defaultChecked={
                  facetFilter ? facetFilter.includes(facet) : true
                }
              />

              <span>
                {facet}
                <span className="ml-1 text-zinc-400">({count})</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
};
