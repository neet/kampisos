/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchResponse } from "algoliasearch";
import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Banner } from "@/components/Banner";
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
    <>
      <Banner q={searchParams.q} />

      <main className="grid grid-cols-6 divide-x divide-zinc-400 dark:divide-zinc-600">
        <aside className="col-span-1 p-4">
          <h3 className="font-bold">絞り込み</h3>
        </aside>

        <article className="col-span-5 py-4 px-6">
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
