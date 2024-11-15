/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchResponse } from "algoliasearch";
import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FiHelpCircle } from "react-icons/fi";

import { Search } from "@/components/Search";
import { searchClient } from "@/lib/search";
import { Entry as EntryType } from "@/models/entry";

import { FooterContent } from "./_FooterContent";
import { Result, ResultSkeleton } from "./_Result";
import { SearchStats } from "./_SearchStats";

export const revalidate = 86_400;

type SearchPageProps = {
  searchParams: {
    q?: string;

    dialect?: string;
    author?: string;
    book?: string;
    title?: string;
    pronoun?: string;

    page?: number;
  };
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
  if (searchParams.dialect) {
    filters.push(`dialect:${searchParams.dialect}`);
  }
  if (searchParams.author) {
    filters.push(`author:${searchParams.author}`);
  }
  if (searchParams.book) {
    filters.push(`book:${searchParams.book}`);
  }
  if (searchParams.title) {
    filters.push(`title:${searchParams.title}`);
  }
  if (searchParams.pronoun) {
    filters.push(`pronoun:${searchParams.pronoun}`);
  }

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
          filters: filters.join(" AND "),
          page,
          facets: ["dialect", "author", "book", "pronoun"],
          maxValuesPerFacet: 10,
          attributesToHighlight: ["text", "translation"],
          // responseFields: ["hits", "nbHits", "facets", "facets_stats"],
        },
      ],
    })
    .then((response) => response.results[0] as SearchResponse<EntryType>);

  return (
    <main>
      <header
        className={clsx(
          "max-w-screen-xl mx-auto my-12",
          "flex flex-col items-center gap-3",
          "px-4 md:px-0",
        )}
      >
        <h2 className="block text-2xl font-bold">
          「{searchParams.q}」の検索結果
        </h2>

        <search className="w-full md:w-2/3 max-w-screen-sm">
          <Search id="search" defaultValue={searchParams.q} />
        </search>

        <div className="flex items-center gap-4">
          <Suspense
            fallback={
              <div className="w-1/4 h-[1lh] bg-zinc-100 dark:bg-zinc-900 forced-colors:bg-[GrayText] rounded animate-pulse" />
            }
            key={searchParams.q}
          >
            <SearchStats resultPromise={result} />
            <a
              href="https://www.algolia.com/doc/api-reference/api-parameters/advancedSyntax/"
              hrefLang="en"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400"
            >
              <FiHelpCircle className="inline-block mr-1" />
              クエリ構文について
            </a>
          </Suspense>
        </div>
      </header>

      <article className="bg-white dark:bg-black border-y border-zinc-300 dark:border-zinc-700">
        <div className="max-w-screen-xl mx-auto p-4">
          <Suspense fallback={<ResultSkeleton />} key={searchParams.q}>
            <Result form="search" resultPromise={result} />
          </Suspense>
        </div>
      </article>

      <footer className="max-w-screen-xl mx-auto p-4">
        <Suspense fallback={null} key={searchParams.q}>
          <FooterContent page={page} resultPromise={result} />
        </Suspense>
      </footer>
    </main>
  );
}
