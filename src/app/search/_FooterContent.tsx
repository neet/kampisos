import { SearchResponse } from "algoliasearch";
import { FC, use } from "react";

import { Paginator } from "@/components/Paginator";
import { Entry } from "@/models/entry";

export type ResultProps = {
  page: number;
  resultPromise: Promise<SearchResponse<Entry>>;
};

export const FooterContent: FC<ResultProps> = (props) => {
  const { page, resultPromise } = props;
  const result = use(resultPromise);

  if (result.hits.length <= 0) {
    return null;
  }

  if (!result.nbPages || result.nbPages <= 1) {
    return null;
  }

  return <Paginator page={page} totalPages={result.nbPages} />;
};
