/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { SearchResponse } from "algoliasearch";
import { FC, Fragment, use } from "react";

import { Entry } from "@/components/Entry";
import { Entry as EntryType } from "@/models/entry";

type ResultRootProps = {
  searchResponsePromise: Promise<SearchResponse<EntryType>>;
};

const ResultRoot: FC<ResultRootProps> = (props) => {
  const { searchResponsePromise } = props;

  const searchResponse = use(searchResponsePromise);

  if (searchResponse.hits.length <= 0) {
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
      {searchResponse.hits.map((hit, i) => {
        const last = i === searchResponse.hits.length - 1;

        return (
          <Fragment key={hit.objectID}>
            <Entry.Root
              objectID={hit.objectID}
              text={hit.text}
              textHTML={(hit._highlightResult?.text as any).value}
              translation={hit.translation}
              translationHTML={(hit._highlightResult?.translation as any).value}
              collectionLv1={hit.collection_lv1}
              collectionLv2={hit.collection_lv2}
              collectionLv3={hit.collection_lv3}
              document={hit.document}
              url={hit.url}
              author={hit.author}
              dialect={hit.dialect}
              dialectLv1={hit.dialect_lv1}
              dialectLv2={hit.dialect_lv2}
              dialectLv3={hit.dialect_lv3}
              publishedAt={hit.published_at}
              recordedAt={hit.recorded_at}
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
