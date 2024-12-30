import { Flex, Heading, Skeleton, Text } from "@radix-ui/themes";
import { SearchResponse } from "algoliasearch";
import { FC, ReactNode, use } from "react";

import { Entry } from "@/models/entry";

type SearchStatsRootProps = {
  id?: string;
  searchResponsePromise: Promise<SearchResponse<Entry>>;
  suffix?: ReactNode;
};

const SearchStatsRoot: FC<SearchStatsRootProps> = (props) => {
  const { id, searchResponsePromise, suffix } = props;

  const searchResponse = use(searchResponsePromise);
  const nbHits =
    searchResponse.nbHits &&
    Intl.NumberFormat("ja-JP").format(searchResponse.nbHits);

  return (
    <Flex align="center" justify="between">
      <Heading id={id} as="h3" size="4">
        {nbHits}件の検索結果
        <Text size="1" color="gray" weight="medium">
          （{searchResponse.processingTimeMS}ミリ秒）
        </Text>
      </Heading>

      {suffix}
    </Flex>
  );
};

const SearchStatsSkeleton: FC = () => {
  return (
    <Heading as="h3" size="4">
      <Skeleton>
        1,000件の検索結果
        <Text size="1" color="gray" weight="medium">
          （0ミリ秒）
        </Text>
      </Skeleton>
    </Heading>
  );
};

export const SearchStats = {
  Root: SearchStatsRoot,
  Skeleton: SearchStatsSkeleton,
};
