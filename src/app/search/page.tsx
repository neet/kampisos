import {
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import { to_kana } from "ainu-utils";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { Filter } from "@/components/Filter";
import { Search } from "@/components/Search";
import { buildRequests, unwrapFacets, unwrapSearchResponse } from "@/lib/build";
import { searchClient } from "@/lib/search";
import { Entry as EntryType } from "@/models/entry";
import { toArraySearchParam } from "@/utils/toArraySearchParams";

import { FooterContent } from "./_FooterContent";
import { MobileFilterButton } from "./_MobileFilterButton";
import { Result } from "./_Result";
import { SearchStats } from "./_SearchStats";

export const revalidate = 86_400;

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    page?: number;
    dialect_lv1?: string | string[];
    dialect_lv2?: string | string[];
    dialect_lv3?: string | string[];
    author?: string | string[];
    group?: string | string[];
    pronoun?: string | string[];
  }>;
};

export async function generateMetadata(
  props: SearchPageProps,
): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const query = searchParams.q?.trim();
  const page = Number(searchParams.page ?? 0);

  if (!query) {
    redirect("/");
  }

  let title = "";
  if (/^[a-zA-Z0-9\s]+$/.test(query)) {
    title += `${query}（${to_kana(query)}）の検索結果`;
  } else {
    title += `「${query}」の検索結果`;
  }
  if (page > 0) {
    title += `（${page + 1}ページ目）`;
  }

  const description = `「${query}」に関連するアイヌ語の資料の検索結果です。意味や使い方などを、実際の例文から探してみましょう。`;

  return {
    title,
    description,
    robots: {
      index: page === 0,
      follow: true,
    },
    openGraph: {
      title,
      description,
      images: "/ogp.png",
    },
    twitter: {
      card: "summary",
    },
    alternates: {
      canonical: `/search?q=${encodeURIComponent(query)}`,
    },
  };
}

export default async function SearchPage(props: SearchPageProps) {
  const searchParams = await props.searchParams;
  const forwardedFor = (await headers()).get("X-Forwarded-For") ?? "0.0.0.0";

  const query = searchParams.q?.trim() as string;
  const page = Number(searchParams.page ?? 0);
  const dialectLv1 = toArraySearchParam(searchParams.dialect_lv1);
  const dialectLv2 = toArraySearchParam(searchParams.dialect_lv2);
  const dialectLv3 = toArraySearchParam(searchParams.dialect_lv3);
  const author = toArraySearchParam(searchParams.author);
  const group = toArraySearchParam(searchParams.group);
  const pronoun = toArraySearchParam(searchParams.pronoun);

  const searchPromise = searchClient.searchForHits<EntryType>(
    {
      requests: buildRequests({
        query,
        page,
        facets: {
          author,
          group,
          pronoun,
          dialect_lv1: dialectLv1,
          dialect_lv2: dialectLv2,
          dialect_lv3: dialectLv3,
        },
      }),
    },
    {
      headers: {
        "X-Forwarded-For": forwardedFor,
      },
    },
  );

  const searchResponsePromise = unwrapSearchResponse(searchPromise);
  const facetsPromise = unwrapFacets(searchPromise);

  return (
    <Container asChild m="3" size="4">
      <main aria-labelledby="search-heading search-stats">
        <header aria-labelledby="search-heading">
          <Section size="2">
            <Flex direction="column" gap="2" align="center">
              <Heading
                id="search-heading"
                as="h2"
                size={{ initial: "8", sm: "9" }}
              >
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
              <aside aria-labelledby="search-complementary-heading">
                <Heading
                  id="search-complementary-heading"
                  as="h3"
                  size="4"
                  mb="4"
                >
                  絞り込み
                </Heading>
                <Suspense fallback={<Filter.Skeleton />} key={searchParams.q}>
                  <Filter.Root
                    facetsPromise={facetsPromise}
                    defaultValues={{
                      dialectLv1,
                      dialectLv2,
                      dialectLv3,
                      author,
                      group,
                      pronoun,
                    }}
                  />
                </Suspense>
              </aside>
            </Card>
          </Box>
          <Box asChild flexGrow="1">
            <Card asChild size="2">
              <article aria-labelledby="search-stats">
                <header>
                  <Suspense
                    fallback={<SearchStats.Skeleton />}
                    key={searchParams.q}
                  >
                    <SearchStats.Root
                      id="search-stats"
                      searchResponsePromise={searchResponsePromise}
                      suffix={
                        <Box asChild display={{ initial: "block", md: "none" }}>
                          <MobileFilterButton
                            defaultValues={{
                              dialectLv1,
                              dialectLv2,
                              dialectLv3,
                              author,
                              group,
                              pronoun,
                            }}
                            facetsPromise={facetsPromise}
                          />
                        </Box>
                      }
                    />
                  </Suspense>
                </header>
                <Box mt="3">
                  <Suspense fallback={<Result.Skeleton />} key={searchParams.q}>
                    <Result.Root
                      searchResponsePromise={searchResponsePromise}
                    />
                  </Suspense>
                </Box>
                <Section size="1">
                  <footer>
                    <Suspense fallback={null} key={searchParams.q}>
                      <FooterContent
                        page={page}
                        resultPromise={searchResponsePromise}
                      />
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
