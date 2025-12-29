import { FC, use } from "react";
import { SearchResponse } from "typesense/lib/Typesense/Documents";

import { Paginator } from "@/components/Paginator";
import { Entry } from "@/models/entry";

export type ResultProps = {
  page: number;
  resultPromise: Promise<SearchResponse<Entry>>;
};

export const FooterContent: FC<ResultProps> = (props) => {
  const { page, resultPromise } = props;

  const result = use(resultPromise);

  const hits = result.hits;
  if (!hits || hits.length <= 0) {
    return null;
  }

  const nbPages = result.request_params.per_page
    ? Math.ceil(result.found / result.request_params.per_page)
    : undefined;

  if (!nbPages || nbPages <= 1) {
    return null;
  }

  return <Paginator page={page} totalPages={nbPages} />;
};
