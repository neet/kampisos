import { Badge, Box, Flex, Text } from "@radix-ui/themes";
import { FC } from "react";
import { useLocale } from "next-intl";

import dayjs from "@/lib/dayjs";

import * as t from "../../models/changelog";

export type ChangelogsItemProps = {
  className?: string;
  changelog: t.Changelog;
};

export const ChangelogsItem: FC<ChangelogsItemProps> = (props) => {
  const { changelog, className } = props;

  const locale = useLocale();
  dayjs.locale(locale);

  const getContent = (changelog: t.Changelog) => {
    if (locale === "ain-Latn") {
      return changelog.contentAinLatn;
    }

    if (locale === "ain-Kana") {
      return changelog.contentAinKana;
    }

    return changelog.content;
  };

  const content = getContent(changelog);
  const publishedAt = dayjs(changelog.publishedAt);

  return (
    <Flex asChild gap="4" align="center" className={className}>
      <div>
        <Box flexGrow="1" flexShrink="1" flexBasis="100%">
          <Text mt="1" asChild>
            <p>{content}</p>
          </Text>
        </Box>

        <Badge>
          <time dateTime={changelog.publishedAt}>{publishedAt.fromNow()}</time>
        </Badge>
      </div>
    </Flex>
  );
};
