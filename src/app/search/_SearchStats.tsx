import { Flex, Heading, Skeleton, Text } from "@radix-ui/themes";
import { SearchResponse } from "algoliasearch";
import { FC, ReactNode, use } from "react";

import { Entry } from "@/models/entry";

type SearchStatsRootProps = {
  id?: string;
  resultPromise: Promise<SearchResponse<Entry>>;
  suffix?: ReactNode;
};

const SearchStatsRoot: FC<SearchStatsRootProps> = (props) => {
  const { id, resultPromise, suffix } = props;

  const result = use(resultPromise);
  const nbHits =
    result.nbHits && Intl.NumberFormat("ja-JP").format(result.nbHits);

  return (
    <Flex align="center" justify="between">
      <Heading id={id} as="h3" size="4">
        {nbHits}件の検索結果
        <Text size="1" color="gray" weight="medium">
          （{result.processingTimeMS}ミリ秒）
        </Text>
      </Heading>

      {suffix}
    </Flex>
  );
};

const SearchStatsSkeleton: FC = () => {
  return (
    <Heading as="h3" size="3">
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
