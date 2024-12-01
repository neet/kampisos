/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchResponse } from "algoliasearch";
import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Banner } from "@/components/Banner";
import { ContentInfo } from "@/components/ContentInfo";
import { searchClient } from "@/lib/search";
import { Entry as EntryType } from "@/models/entry";

import { Filters } from "./_Filters";
import { FooterContent } from "./_FooterContent";
import { Result, ResultSkeleton } from "./_Result";
import { SearchStats } from "./_SearchStats";

export const revalidate = 86_400;

type SearchPageProps = {
  searchParams: {
    q?: string;

    dialect?: string | string[];
    author?: string | string[];
    book?: string | string[];
    pronoun?: string | string[];

    expand_books?: boolean;
    expand_dialects?: boolean;
    expand_authors?: boolean;

    page?: number;
  };
};

const normalizeArrayParam = (
  value: string | string[] | undefined,
): string[] => {
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

export function generateMetadata(props: SearchPageProps): Metadata {
  if (!props.searchParams.q) {
    throw new Error("q is required");
  }

  return {
    title: `「${props.searchParams.q}」の検索結果`,
    description:
      "アイヌ語・日本語のキーワードを入力して複数のコーパスを検索できます",
  };
}

export default function SearchPage(props: SearchPageProps) {
  const { searchParams } = props;

  if (!searchParams.q) {
    return notFound();
  }

  const page = Number(searchParams.page ?? 0);
  const dialect = normalizeArrayParam(searchParams.dialect);
  const author = normalizeArrayParam(searchParams.author);
  const book = normalizeArrayParam(searchParams.book);
  const pronoun = normalizeArrayParam(searchParams.pronoun);

  const filters = [
    dialect.map((value) => `dialect:${value}`).join(" OR "),
    author.map((value) => `author:${value}`).join(" OR "),
    book.map((value) => `book:${value}`).join(" OR "),
    pronoun.map((value) => `pronoun:${value}`).join(" OR "),
  ]
    .filter(Boolean)
    .join(" AND ");

  const maxValuesPerFacet = [
    searchParams.expand_books,
    searchParams.expand_dialects,
    searchParams.expand_authors,
  ].some(Boolean)
    ? undefined
    : 5;

  const query = searchParams.q.trim();
  if (!query) {
    return notFound();
  }

  const result: Promise<SearchResponse<EntryType>> = searchClient
    .search<EntryType>({
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
    .then((response) => response.results[0] as SearchResponse<EntryType>);

  const facetOnlyResult: Promise<SearchResponse<EntryType>> = searchClient
    .search<EntryType>({
      requests: [
        {
          query,
          indexName: "entries",
          hitsPerPage: 0,
          facets: ["dialect", "author", "book", "pronoun"],
          maxValuesPerFacet,
        },
      ],
    })
    .then((result) => result.results[0] as SearchResponse<EntryType>);

  return (
    <>
      <Banner q={searchParams.q} />

      <main className="flex">
        <aside
          className={clsx(
            "sticky top-0",
            "h-screen",
            "w-72 grow-0 p-4 border-r border-zinc-400 dark:border-zinc-600 hidden md:block",
            "overflow-y-auto",
          )}
        >
          <h3 className="font-bold">絞り込み</h3>

          <Filters
            className="mt-2"
            defaultValues={{
              dialect,
              author,
              book,
              pronoun,
            }}
            expanded={{
              dialect: searchParams.expand_dialects,
              book: searchParams.expand_books,
              author: searchParams.expand_authors,
            }}
            resultPromise={facetOnlyResult}
          />
        </aside>

        <article className="flex-1 py-4 px-6">
          <header>
            <Suspense
              fallback={
                <div className="w-1/4 h-[1lh] bg-zinc-100 dark:bg-zinc-900 forced-colors:bg-[GrayText] rounded animate-pulse" />
              }
              key={searchParams.q}
            >
              <SearchStats resultPromise={result} />
            </Suspense>
          </header>

          <div>
            <Suspense fallback={<ResultSkeleton />} key={searchParams.q}>
              <Result resultPromise={result} />
            </Suspense>
          </div>

          <footer className="max-w-screen-lg mx-auto">
            <Suspense fallback={null} key={searchParams.q}>
              <FooterContent page={page} resultPromise={result} />
            </Suspense>
          </footer>
        </article>
      </main>

      <ContentInfo />
    </>
  );
}
