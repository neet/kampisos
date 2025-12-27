import { Badge, Box, Flex, Text } from "@radix-ui/themes";
import { FC } from "react";

import * as t from "../../models/changelog";
import { useRelativeTimeFormat } from "./useRelativeTimeFormat";

export type ChangelogProps = {
  className?: string;
  changelog: t.Changelog;
};

export const Changelog: FC<ChangelogProps> = (props) => {
  const { changelog, className } = props;

  const relativeDate = useRelativeTimeFormat(new Date(changelog.publishedAt));

  return (
    <Flex asChild gap="4" align="center" className={className}>
      <div>
        <Box flexGrow="1" flexShrink="1" flexBasis="100%">
          <Text mt="1" asChild>
            <p>{changelog.content}</p>
          </Text>
        </Box>

        <Badge>
          <time dateTime={changelog.publishedAt}>{relativeDate}</time>
        </Badge>
      </div>
    </Flex>
  );
};
