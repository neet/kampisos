import { Badge, Box, Flex, Text } from "@radix-ui/themes";
import { FC } from "react";

import * as t from "../../models/changelog";

export type ChangelogProps = {
  className?: string;
  changelog: t.Changelog;
};

export const Changelog: FC<ChangelogProps> = (props) => {
  const { changelog, className } = props;

  const rtf = new Intl.RelativeTimeFormat("ja", { numeric: "auto" });
  const date = new Date(changelog.publishedAt);

  const diff = date.getTime() - Date.now();
  const formattedDate = rtf.format(
    Math.round(diff / 1000 / 60 / 60 / 24),
    "day",
  );

  return (
    <Flex asChild gap="4" align="center" className={className}>
      <div>
        <Box flexGrow="1" flexShrink="1" flexBasis="100%">
          <Text mt="1" asChild>
            <p>{changelog.content}</p>
          </Text>
        </Box>

        <Badge>
          <time dateTime={date.toISOString()}>{formattedDate}</time>
        </Badge>
      </div>
    </Flex>
  );
};
