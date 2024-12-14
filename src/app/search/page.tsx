import {
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Filters } from "@/components/Filters";
import { Search } from "@/components/Search";
import { searchClient } from "@/lib/search";
import { Entry as EntryType } from "@/models/entry";
import { buildFiltersFromFacets } from "@/utils/buildFiltersFromFacets";
import { fetchComplexFacets } from "@/utils/fetchComplexFacets";

import { FooterContent } from "./_FooterContent";
import { MobileFilterButton } from "./_MobileFilterButton";
import { Result } from "./_Result";
import { SearchStats } from "./_SearchStats";

export const revalidate = 86_400;

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    page?: number;

    dialect?: string | string[];
    author?: string | string[];
    book?: string | string[];
    pronoun?: string | string[];
  }>;
};

const normalizeArrayParam = (
  value: string | string[] | undefined,
): string[] => {
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

export async function generateMetadata(
  props: SearchPageProps,
): Promise<Metadata> {
  if (!(await props.searchParams).q) {
    throw new Error("q is required");
  }

  return {
    title: `「${(await props.searchParams).q}」の検索結果`,
    description:
      "アイヌ語・日本語のキーワードを入力して複数のコーパスを検索できます",
  };
}

export default async function SearchPage(props: SearchPageProps) {
  const searchParams = await props.searchParams;

  if (!searchParams.q) {
    return notFound();
  }

  const page = Number(searchParams.page ?? 0);

  const dialect = normalizeArrayParam(searchParams.dialect);
  const author = normalizeArrayParam(searchParams.author);
  const book = normalizeArrayParam(searchParams.book);
  const pronoun = normalizeArrayParam(searchParams.pronoun);

  const filters = buildFiltersFromFacets({
    dialect,
    author,
    book,
    pronoun,
  });

  const query = searchParams.q.trim();
  if (!query) {
    return notFound();
  }

  const facets = fetchComplexFacets(query, {
    dialect,
    author,
    book,
    pronoun,
  });

  const hits = searchClient
    .searchForHits<EntryType>({
      requests: [
        {
          query,
          indexName: "entries",
          filters,
          page,
          attributesToHighlight: ["text", "translation"],
        },
      ],
    })
    .then((response) => response.results[0]);

  return (
    <Container asChild m="3" size="4">
      <main>
        <header>
          <Section size="2">
            <Flex direction="column" gap="2" align="center">
              <Heading as="h2" size={{ initial: "8", sm: "9" }}>
                {query}
              </Heading>

              <Text asChild align="center" color="gray">
                <p>
                  アイヌ語・日本語コーパスからクエリ文字列を含む資料を表示しています
                </p>
              </Text>

              <Box
                width={{
                  initial: "100%",
                  sm: "36rem",
                }}
              >
                <Search defaultValue={query} />
              </Box>
            </Flex>
          </Section>
        </header>

        <Flex gap="3">
          <Box
            asChild
            width="18rem"
            display={{ initial: "none", md: "block" }}
            flexGrow="0"
            flexShrink="0"
            style={{
              height: "min-content",
              position: "sticky",
              top: "var(--space-3)",
            }}
          >
            <Card asChild size="2">
              <aside>
                <Heading as="h3" size="4" mb="4">
                  絞り込み
                </Heading>

                <Filters
                  defaultValues={{
                    dialect,
                    author,
                    book,
                    pronoun,
                  }}
                  resultPromise={facets}
                />
              </aside>
            </Card>
          </Box>

          <Box asChild flexGrow="1">
            <Card asChild size="2">
              <article>
                <header>
                  <Suspense
                    fallback={<SearchStats.Skeleton />}
                    key={searchParams.q}
                  >
                    <SearchStats.Root
                      resultPromise={hits}
                      suffix={
                        <Box asChild display={{ initial: "block", md: "none" }}>
                          <MobileFilterButton
                            defaultValues={{
                              dialect,
                              author,
                              book,
                              pronoun,
                            }}
                            resultPromise={facets}
                          />
                        </Box>
                      }
                    />
                  </Suspense>
                </header>

                <Box mt="3">
                  <Suspense fallback={<Result.Skeleton />} key={searchParams.q}>
                    <Result.Root resultPromise={hits} />
                  </Suspense>
                </Box>

                <Section size="1">
                  <footer>
                    <Suspense fallback={null} key={searchParams.q}>
                      <FooterContent page={page} resultPromise={hits} />
                    </Suspense>
                  </footer>
                </Section>
              </article>
            </Card>
          </Box>
        </Flex>
      </main>
    </Container>
  );
}
