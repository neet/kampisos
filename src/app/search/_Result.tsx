/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchResponse } from "algoliasearch";
import { FC, use } from "react";

import { Entry, EntrySkeleton } from "@/components/Entry";
import { Entry as EntryType } from "@/models/entry";

export type ResultProps = {
  resultPromise: Promise<SearchResponse<EntryType>>;
};

export const Result: FC<ResultProps> = (props) => {
  const { resultPromise } = props;

  const result = use(resultPromise);

  if (result.hits.length <= 0) {
    return (
      <div className="py-8 text-center">
        <h2 className="font-bold text-lg">用例が見つかりませんでした</h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          別のキーワードや、異なる検索条件で再度お試しください。
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y-2 divide-zinc-100 dark:divide-zinc-900 -my-4">
      {result.hits.map((hit) => (
        <li key={hit.objectID} className="py-4">
          <Entry
            text={(hit._highlightResult?.text as any).value}
            translation={(hit._highlightResult?.translation as any).value}
            book={hit.book}
            title={hit.title}
            url={hit.url}
            author={hit.author}
            dialect={hit.dialect}
          />
        </li>
      ))}
    </ul>
  );
};

export const ResultSkeleton: FC = () => {
  return (
    <ul className="divide-y-2 divide-zinc-100 dark:divide-zinc-900">
      {[...Array(8)].map((_, index) => (
        <li key={index} className="py-4">
          <EntrySkeleton />
        </li>
      ))}
    </ul>
  );
};
