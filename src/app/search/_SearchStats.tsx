import { SearchResponse } from "algoliasearch";
import { FC, use } from "react";

import { Entry } from "@/models/entry";

export type SearchStatsProps = {
  resultPromise: Promise<SearchResponse<Entry>>;
};

export const SearchStats: FC<SearchStatsProps> = (props) => {
  const { resultPromise } = props;

  const result = use(resultPromise);
  const nbHits = Intl.NumberFormat("ja-JP").format(result.nbHits);

  return (
    <>
      <h2>
        <span className="font-bold">{nbHits}件の検索結果</span>
        <span className="text-zinc-600 dark:text-zinc-400 text-xs">
          （{result.processingTimeMS}ミリ秒）
        </span>
      </h2>
    </>
  );
};
