import { Box, Container, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { Metadata } from "next";

import { Changelogs } from "@/components/Changelogs";
import { Search } from "@/components/Search";
import { client } from "@/lib/microcms";
import { Changelog } from "@/models/changelog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "kampisos - アイヌ語コーパス検索",
  description:
    "アイヌ語・日本語のキーワードを入力して複数のコーパスを検索できます",
};

export default async function Home() {
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
        <Section size="2">
          <Flex direction="column" align="center" gap="1">
            <Heading
              as="h2"
              size={{ initial: "7", sm: "8" }}
              weight="bold"
              align="center"
              style={{ wordBreak: "keep-all", overflowWrap: "anywhere" }}
            >
              アイヌ語の世界を
              <wbr />
              探訪しよう
            </Heading>
            <Text
              asChild
              align="center"
              color="gray"
              style={{ wordBreak: "keep-all", overflowWrap: "anywhere" }}
            >
              <p>
                約15万語を収録した
                <wbr />
                日本語・アイヌ語対訳コーパス
              </p>
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
