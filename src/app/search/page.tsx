/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchResponse } from "algoliasearch";
import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Banner } from "@/components/Banner";
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
  const filters: string[] = [];

  const dialect = normalizeArrayParam(searchParams.dialect);
  const author = normalizeArrayParam(searchParams.author);
  const book = normalizeArrayParam(searchParams.book);
  const pronoun = normalizeArrayParam(searchParams.pronoun);
  filters.push(dialect.map((value) => `dialect:${value}`).join(" OR "));
  filters.push(author.map((value) => `author:${value}`).join(" OR "));
  filters.push(book.map((value) => `book:${value}`).join(" OR "));
  filters.push(pronoun.map((value) => `pronoun:${value}`).join(" OR "));

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
          filters: filters.filter(Boolean).join(" AND "),
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
          maxValuesPerFacet: 5,
        },
      ],
    })
    .then((result) => result.results[0] as SearchResponse<EntryType>);

  return (
    <>
      <Banner q={searchParams.q} />

      <main className="flex divide-x divide-zinc-400 dark:divide-zinc-600">
        <aside className="w-72 grow-0 p-4">
          <h3 className="font-bold">絞り込み</h3>

          <Filters
            className="mt-2"
            defaultValues={{
              dialect,
              author,
              book,
              pronoun,
            }}
            resultPromise={facetOnlyResult}
          />
        </aside>

        <article className="flex-1 py-4 px-6">
          <header className={clsx("px-4 md:px-0")}>
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
    </>
  );
}
