/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchResponse } from "algoliasearch";
import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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

  const facetFilters: string[] = [];

  if (searchParams.dialect) {
    facetFilters.push(`dialect:${searchParams.dialect}`);
  }
  if (searchParams.author) {
    facetFilters.push(`author:${searchParams.author}`);
  }
  if (searchParams.book) {
    facetFilters.push(`book:${searchParams.book}`);
  }
  if (searchParams.title) {
    facetFilters.push(`title:${searchParams.title}`);
  }

  const query = searchParams.q.trim();
  if (!query) {
    return notFound();
  }

  const result: Promise<SearchResponse<EntryType>> =
    searchClient.searchSingleIndex<EntryType>({
      indexName: "entries",
      searchParams: {
        query,
        facetFilters,
        page,
        attributesToHighlight: ["text", "translation"],
      },
    });

  return (
    <main>
      <header
        className={clsx(
          "max-w-screen-lg mx-auto my-12",
          "flex flex-col items-center gap-3",
          "px-4 md:px-0",
        )}
      >
        <h2 className="block text-2xl font-bold">
          「{searchParams.q}」の検索結果
        </h2>

        <search className="w-full md:w-2/3 max-w-screen-sm">
          <Search defaultValue={searchParams.q} />
        </search>

        <Suspense
          fallback={
            <div className="w-1/4 h-[1lh] bg-zinc-100 dark:bg-zinc-900 forced-colors:bg-[GrayText] rounded animate-pulse" />
          }
        >
          <SearchStats resultPromise={result} />
        </Suspense>
      </header>

      <article className="bg-white dark:bg-black border-y border-zinc-300 dark:border-zinc-700">
        <div className="max-w-screen-lg mx-auto p-4">
          <Suspense fallback={<ResultSkeleton />}>
            <Result resultPromise={result} />
          </Suspense>
        </div>
      </article>

      <footer className="max-w-screen-lg mx-auto p-4">
        <Suspense fallback={null}>
          <FooterContent page={page} resultPromise={result} />
        </Suspense>
      </footer>
    </main>
  );
}
