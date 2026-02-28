import { Box, Container, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Changelogs } from "@/components/Changelogs";
import { Search } from "@/components/Search";
import { client } from "@/lib/microcms";
import { Changelog } from "@/models/changelog";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("/app/[locale]/page");

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/",
    },
  };
}

export default async function Home() {
  const t = await getTranslations("/app/[locale]/page");

  const changelogs = await client.getList<Changelog>({
    endpoint: "changelogs",
    queries: {
      orders: "-publishedAt",
      limit: 8,
    },
  });

  return (
    <Container size="2" m="3">
      <main>
        <Section size="1">
          <Flex direction="column" align="center" gap="1">
            <Heading
              as="h2"
              size={{ initial: "7", sm: "8" }}
              weight="bold"
              align="center"
              style={{ wordBreak: "keep-all", overflowWrap: "anywhere" }}
            >
              {t.rich("heading", { wbr: () => <wbr /> })}
            </Heading>
            <Text
              asChild
              align="center"
              color="gray"
              style={{ wordBreak: "keep-all", overflowWrap: "anywhere" }}
            >
              <p>{t.rich("subtitle", { wbr: () => <wbr /> })}</p>
            </Text>
          </Flex>

          <Box mt="4" asChild>
            <search>
              <Search />
            </search>
          </Box>
        </Section>

        <Section size="1">
          <Changelogs changelogs={changelogs.contents} />
        </Section>
      </main>
    </Container>
  );
}
