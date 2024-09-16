import { SearchResponse } from "algoliasearch";
import { FC, use } from "react";

import { Entry } from "@/models/entry";

export type SearchStatsProps = {
  resultPromise: Promise<SearchResponse<Entry>>;
};

export const SearchStats: FC<SearchStatsProps> = (props) => {
  const { resultPromise } = props;
  const result = use(resultPromise);

  return (
    <p className="text-zinc-600 dark:text-zinc-400 flex gap-4">
      {result.nbHits}件中{result.hits.length}件を表示
    </p>
  );
};
