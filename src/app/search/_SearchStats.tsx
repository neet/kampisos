import { SearchResponse } from "algoliasearch";
import { FC, ReactNode, use } from "react";

import { Entry } from "@/models/entry";

export type SearchStatsProps = {
  resultPromise: Promise<SearchResponse<Entry>>;
  children: ReactNode;
};

export const SearchStats: FC<SearchStatsProps> = (props) => {
  const { children, resultPromise } = props;

  const result = use(resultPromise);
  const nbHits = Intl.NumberFormat("ja-JP").format(result.nbHits);

  return (
    <div className="flex gap-2 justify-between">
      <h2>
        <span className="font-bold">{nbHits}件の検索結果</span>
        <span className="text-zinc-600 dark:text-zinc-400 text-xs">
          （{result.processingTimeMS}ミリ秒）
        </span>
      </h2>

      {children}
    </div>
  );
};
