import { Box, Card, Heading } from "@radix-ui/themes";
import { FC } from "react";
import { useTranslations } from "next-intl";

import * as t from "@/models/changelog";

import { Changelog } from "./Changelog";

type ChangelogsProps = {
  className?: string;
  changelogs: t.Changelog[];
};

export const Changelogs: FC<ChangelogsProps> = (props) => {
  const { className, changelogs } = props;

  const t = useTranslations("/components/Changelogs/Changelogs");

  return (
    <Card className={className} size="2">
      <Heading as="h2" size="3" weight="bold">
        {t("title")}
      </Heading>

      <Box mt="2">
        {changelogs.map((changelog) => (
          <Box my="1" asChild key={changelog.content}>
            <Changelog changelog={changelog} />
          </Box>
        ))}
      </Box>
    </Card>
  );
};
