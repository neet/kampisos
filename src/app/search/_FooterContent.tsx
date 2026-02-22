import { SearchResponse } from "algoliasearch";
import { FC, use } from "react";

import { Paginator } from "@/components/Paginator";
import { Entry } from "@/models/entry";
import { Section } from "@radix-ui/themes";

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

  return (
    <Section size="1">
      <footer>
        <Paginator page={page} totalPages={result.nbPages} />
      </footer>
    </Section>
  );
};
