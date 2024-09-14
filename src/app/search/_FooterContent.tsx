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

  return <Paginator page={page} totalPages={result.nbPages} />;
};
