import {
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Separator,
  Section,
  Text,
  Inset,
} from "@radix-ui/themes";
import { to_kana } from "ainu-utils";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import { Filter } from "@/components/Filter";
import { Search } from "@/components/Search";
import { buildRequests, unwrapFacets, unwrapSearchResponse } from "@/lib/build";
import { searchClient } from "@/lib/search";
import { Entry as EntryType } from "@/models/entry";
import { toArraySearchParam } from "@/utils/toArraySearchParams";

import { FooterContent } from "./FooterContent";
import { MobileFilterButton } from "./MobileFilterButton";
import { Result } from "./Result";
import { SearchStats } from "./SearchStats";
import { DialectMaps } from "./DialectMaps";

export const revalidate = 86_400;

const isLatin = (str: string) => /^[a-zA-Z0-9\s]+$/.test(str);

export async function generateMetadata(
  props: PageProps<"/[locale]/search">,
): Promise<Metadata> {
  const t = await getTranslations("/app/[locale]/search/page");
  const searchParams = await props.searchParams;

  const query =
    typeof searchParams.q === "string" ? searchParams.q.trim() : undefined;
  if (!query) {
    redirect("/");
  }

  const page = Number(searchParams.page ?? 0);

  const createTitle = (query: string, page: number): string => {
    if (isLatin(query)) {
      if (page === 0) {
        return t("title_with_kana", { query, kana: to_kana(query) });
      } else {
        return t("title_with_kana_and_page_num", {
          query,
          kana: to_kana(query),
          page: page + 1,
        });
      }
    } else {
      if (page === 0) {
        return t("title", { query });
      } else {
        return t("title_with_page_num", { query, page: page + 1 });
      }
    }
  };

  const title = createTitle(query, page);
  const description = t("description", { query });

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
      images: "/cover.png",
    },
    twitter: {
      card: "summary",
    },
    alternates: {
      canonical: `/search?q=${encodeURIComponent(query)}`,
    },
  };
}

export default async function SearchPage(props: PageProps<"/[locale]/search">) {
  const searchParams = await props.searchParams;
  const forwardedFor = (await headers()).get("X-Forwarded-For") ?? "0.0.0.0";
  const t = await getTranslations("/app/[locale]/search/page");

  const query =
    typeof searchParams.q === "string" ? searchParams.q.trim() : undefined;
  const page = Number(searchParams.page ?? 0);
  const dialectLv1 = toArraySearchParam(searchParams.dialect_lv1);
  const dialectLv2 = toArraySearchParam(searchParams.dialect_lv2);
  const dialectLv3 = toArraySearchParam(searchParams.dialect_lv3);
  const author = toArraySearchParam(searchParams.author);
  const collectionLv1 = toArraySearchParam(searchParams.collection_lv1);
  const pronoun = toArraySearchParam(searchParams.pronoun);

  if (!query) {
    notFound();
  }

  const searchPromise = searchClient.searchForHits<EntryType>(
    {
      requests: buildRequests({
        query,
        page,
        facets: {
          author,
          collection_lv1: collectionLv1,
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
        <Card size="2" mb="3">
          <Flex gap="3" align="center">
            <Box flexGrow="1" flexShrink="0">
              nep ka isam
            </Box>

            <Box>
              <Separator orientation="vertical" size="3" />
            </Box>

            <Box flexGrow="1" flexShrink="0">
              <Inset>
                <DialectMaps facetsPromise={facetsPromise} />
              </Inset>
            </Box>
          </Flex>
        </Card>

        <Flex gap="3">
          {/* <Box */}
          {/*   asChild */}
          {/*   width="18rem" */}
          {/*   display={{ initial: "none", md: "block" }} */}
          {/*   flexGrow="0" */}
          {/*   flexShrink="0" */}
          {/*   style={{ */}
          {/*     height: "min-content", */}
          {/*     position: "sticky", */}
          {/*     top: "var(--space-3)", */}
          {/*   }} */}
          {/* > */}
          {/*   <Card asChild size="2"> */}
          {/*     <aside aria-labelledby="search-complementary-heading"> */}
          {/*       <Heading */}
          {/*         id="search-complementary-heading" */}
          {/*         as="h3" */}
          {/*         size="4" */}
          {/*         mb="4" */}
          {/*       > */}
          {/*         {t("filter")} */}
          {/*       </Heading> */}
          {/*       <Suspense fallback={<Filter.Skeleton />} key={query}> */}
          {/*         <Filter.Root */}
          {/*           facetsPromise={facetsPromise} */}
          {/*           defaultValues={{ */}
          {/*             dialectLv1, */}
          {/*             dialectLv2, */}
          {/*             dialectLv3, */}
          {/*             author, */}
          {/*             collectionLv1, */}
          {/*             pronoun, */}
          {/*           }} */}
          {/*         /> */}
          {/*       </Suspense> */}
          {/*     </aside> */}
          {/*   </Card> */}
          {/* </Box> */}
          <Box asChild flexGrow="1">
            <Card asChild size="2">
              <article aria-labelledby="search-stats">
                {/* <header> */}
                {/*   <Suspense fallback={<SearchStats.Skeleton />} key={query}> */}
                {/*     <SearchStats.Root */}
                {/*       id="search-stats" */}
                {/*       searchResponsePromise={searchResponsePromise} */}
                {/*       suffix={ */}
                {/*         <Box asChild display={{ initial: "block", md: "none" }}> */}
                {/*           <MobileFilterButton */}
                {/*             defaultValues={{ */}
                {/*               dialectLv1, */}
                {/*               dialectLv2, */}
                {/*               dialectLv3, */}
                {/*               author, */}
                {/*               collectionLv1, */}
                {/*               pronoun, */}
                {/*             }} */}
                {/*             facetsPromise={facetsPromise} */}
                {/*           /> */}
                {/*         </Box> */}
                {/*       } */}
                {/*     /> */}
                {/*   </Suspense> */}
                {/* </header> */}

                <Suspense
                  fallback={<Result.Skeleton />}
                  key={`result-${query}`}
                >
                  <Result.Root searchResponsePromise={searchResponsePromise} />
                </Suspense>

                <Suspense fallback={null} key={`footer-${query}`}>
                  <FooterContent
                    page={page}
                    resultPromise={searchResponsePromise}
                  />
                </Suspense>
              </article>
            </Card>
          </Box>
        </Flex>
      </main>
    </Container>
  );
}
