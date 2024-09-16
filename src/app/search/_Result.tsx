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

  return (
    <ul className="divide-y-2 divide-zinc-100">
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
    <ul className="divide-y-2 divide-zinc-100">
      {[...Array(5)].map((_, index) => (
        <li key={index} className="py-4">
          <EntrySkeleton />
        </li>
      ))}
    </ul>
  );
};
