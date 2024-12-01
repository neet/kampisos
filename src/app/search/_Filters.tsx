"use client";

import { SearchResponse } from "algoliasearch";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import { FC, use } from "react";

import { Entry } from "@/models/entry";

import { Filter } from "../../components/Filters/Filter";

export type FiltersProps = {
  className?: string;
  defaultValues?: {
    book?: string[];
    dialect?: string[];
    author?: string[];
    pronoun?: string[];
  };
  expanded: {
    book?: boolean;
    dialect?: boolean;
    author?: boolean;
  };
  resultPromise: Promise<SearchResponse<Entry>>;
};

export const Filters: FC<FiltersProps> = (props) => {
  const { className, defaultValues, resultPromise, expanded } = props;

  const result = use(resultPromise);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getExpandUrl = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(`expand_${key}`, "true");
    return `${pathname}?${params.toString()}`;
  };

  const getCollapseUrl = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(`expand_${key}`);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className={clsx("space-y-2", className)}>
      {result.facets?.book && (
        <Filter
          form="search"
          label="出典"
          name="book"
          defaultValues={defaultValues?.book}
          options={Object.entries(result.facets.book).map(([value, count]) => ({
            value,
            count,
          }))}
          expanded={expanded.book}
          expandedHref={getExpandUrl("books")}
          collapsedHref={getCollapseUrl("books")}
        />
      )}

      {result.facets?.dialect && (
        <Filter
          form="search"
          label="方言"
          name="dialect"
          defaultValues={defaultValues?.dialect}
          options={Object.entries(result.facets.dialect).map(
            ([value, count]) => ({
              value,
              count,
            }),
          )}
          expanded={expanded.dialect}
          expandedHref={getExpandUrl("dialects")}
          collapsedHref={getCollapseUrl("dialects")}
        />
      )}

      {result.facets?.author && (
        <Filter
          form="search"
          label="著者"
          name="author"
          defaultValues={defaultValues?.author}
          options={Object.entries(result.facets.author).map(
            ([value, count]) => ({
              value,
              count,
            }),
          )}
          expanded={expanded.author}
          expandedHref={getExpandUrl("authors")}
          collapsedHref={getCollapseUrl("authors")}
        />
      )}

      {result.facets?.pronoun && (
        <Filter
          form="search"
          label="主な一人称"
          name="pronoun"
          defaultValues={defaultValues?.pronoun}
          options={Object.entries(result.facets.pronoun).map(
            ([value, count]) => ({
              label: value === "first" ? "一人称" : "四人称",
              value,
              count,
            }),
          )}
        />
      )}

      <button
        form="search"
        type="submit"
        className="bg-blue-600 dark:bg-blue-400 dark:text-black p-1 rounded text-center w-full"
      >
        適用
      </button>
    </div>
  );
};
