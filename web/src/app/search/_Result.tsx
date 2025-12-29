import { Box, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { FC, Fragment, use } from "react";
import { SearchResponse } from "typesense/lib/Typesense/Documents";

import { Entry as EntryType } from "@/models/entry";
import { Entry } from "@/components/Entry";

type ResultRootProps = {
  searchResponsePromise: Promise<SearchResponse<EntryType>>;
};

const ResultRoot: FC<ResultRootProps> = (props) => {
  const { searchResponsePromise } = props;

  const searchResponse = use(searchResponsePromise);
  const hits = searchResponse.hits;

  if (hits == null || hits.length <= 0) {
    return (
      <Flex py="8" direction="column" align="center">
        <Heading size="4">用例が見つかりませんでした</Heading>

        <p>
          <Text color="gray" mt="2">
            別のキーワードや、異なる検索条件で再度お試しください。
          </Text>
        </p>
      </Flex>
    );
  }

  return (
    <Box>
      {hits.map((hit, i) => {
        const last = i === hits.length - 1;
        const doc = hit.document;

        return (
          <Fragment key={doc.id}>
            <Entry.Root
              text={doc.text}
              textHTML={hit.highlight.text?.value ?? doc.text}
              translation={doc.translation}
              translationHTML={
                hit.highlight.translation?.value ?? doc.translation
              }
              book={doc.book}
              title={doc.title}
              url={doc.url}
              author={doc.author}
              dialect={doc.dialect}
            />

            {!last && (
              <Box my="3">
                <Separator size="4" />
              </Box>
            )}
          </Fragment>
        );
      })}
    </Box>
  );
};

const ResultSkeleton: FC = () => {
  return (
    <div>
      {[...Array(16)].map((_, index) => {
        const last = index === 7;
        return (
          <Fragment key={index}>
            <Entry.Skeleton />

            {!last && (
              <Box my="3">
                <Separator size="4" />
              </Box>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export const Result = {
  Root: ResultRoot,
  Skeleton: ResultSkeleton,
};
