import clsx from "clsx";
import { FC, use } from "react";

import { Filter } from "../../components/Filters/Filter";

export type FiltersProps = {
  className?: string;
  defaultValues?: {
    book?: string[];
    dialect?: string[];
    author?: string[];
    pronoun?: string[];
  };
  resultPromise: Promise<Record<string, Record<string, number>>>;
};

export const Filters: FC<FiltersProps> = (props) => {
  const { className, defaultValues, resultPromise } = props;

  const result = use(resultPromise);

  return (
    <div>
      <div className={clsx("space-y-2", className)}>
        {result.book && (
          <Filter
            form="search"
            label="出典"
            name="book"
            defaultValues={defaultValues?.book}
            options={Object.entries(result.book).map(([value, count]) => ({
              value,
              count,
            }))}
          />
        )}

        {result.dialect && (
          <Filter
            form="search"
            label="方言"
            name="dialect"
            defaultValues={defaultValues?.dialect}
            options={Object.entries(result.dialect).map(([value, count]) => ({
              value,
              count,
            }))}
          />
        )}

        {result.author && (
          <Filter
            form="search"
            label="著者"
            name="author"
            defaultValues={defaultValues?.author}
            options={Object.entries(result.author).map(([value, count]) => ({
              value,
              count,
            }))}
          />
        )}

        {result.pronoun && (
          <Filter
            form="search"
            label="主な一人称"
            name="pronoun"
            defaultValues={defaultValues?.pronoun}
            options={Object.entries(result.pronoun).map(([value, count]) => ({
              label: value === "first" ? "一人称" : "四人称",
              value,
              count,
            }))}
          />
        )}
      </div>

      <hr className="border-zinc-400 dark:border-zinc-600 my-5" />

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
