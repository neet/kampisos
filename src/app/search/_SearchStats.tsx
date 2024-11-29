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
    <>
      <h2>
        <span className="text-lg font-bold">{result.nbHits}件の検索結果</span>
        <span className="text-zinc-600 dark:text-zinc-400">
          （{result.processingTimeMS / 1000}秒）
        </span>
      </h2>
    </>
  );
};
