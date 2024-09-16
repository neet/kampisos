/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchResponse } from "algoliasearch";
import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Search } from "@/components/Search/Search";
import { searchClient } from "@/lib/search";
import { Entry as EntryType } from "@/models/entry";

import { FooterContent } from "./_FooterContent";
import { Result, ResultSkeleton } from "./_Result";
import { SearchStats } from "./_SearchStats";

export const revalidate = 86_400;

type HomeProps = {
  searchParams: {
    q?: string;
    page?: number;
  };
};

export function generateMetadata(props: HomeProps): Metadata {
  if (!props.searchParams.q) {
    throw new Error("q is required");
  }

  const title = `「${props.searchParams.q}」の検索結果`;

  return { title };
}

export default async function Home(props: HomeProps) {
  const { searchParams } = props;
  const { q } = searchParams;

  if (!q) {
    return notFound();
  }

  const page = Number(searchParams.page ?? 0);

  const result: Promise<SearchResponse<EntryType>> =
    searchClient.searchSingleIndex<EntryType>({
      indexName: "entries",
      searchParams: {
        query: q,
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
        <h2 className="block text-2xl font-bold">「{q}」の検索結果</h2>

        <search className="w-full md:w-2/3 max-w-screen-sm">
          <Search defaultValue={q} />
        </search>

        <Suspense
          fallback={
            <div className="w-1/4 h-[1lh] bg-zinc-100 rounded animate-pulse" />
          }
        >
          <SearchStats resultPromise={result} />
        </Suspense>
      </header>

      <article className="bg-white border-y border-zinc-200 ">
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
