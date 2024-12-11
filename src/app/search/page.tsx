/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
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
import { Result, ResultSkeleton } from "./_Result";
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
    <main>
      <header className="p-2">
        <div className="flex flex-col items-center my-8 w-full">
          <h2 className="font-bold text-2xl">「{query}」を含む資料</h2>
          <Search
            className="mt-2 w-full max-w-screen-sm"
            defaultValue={query}
          />
        </div>

        <div>
          <MobileFilterButton
            defaultValues={{
              dialect,
              author,
              book,
              pronoun,
            }}
            resultPromise={facets}
          />
        </div>
      </header>

      <div
        className={clsx(
          "text-zinc-900 bg-white",
          "dark:text-white dark:bg-zinc-900",
          "border-y border-zinc-300 dark:border-zinc-600",
          "md:flex",
        )}
      >
        <aside
          className={clsx(
            "w-72 grow-0 p-4",
            "border-r border-zinc-300 dark:border-zinc-600",
            "hidden md:block",
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
            resultPromise={facets}
          />
        </aside>

        <article className="flex-1 py-4 px-3 md:px-6">
          <header>
            <Suspense
              fallback={
                <div className="w-1/4 h-[1lh] bg-zinc-200 dark:bg-zinc-800 forced-colors:bg-[GrayText] rounded animate-pulse" />
              }
              key={searchParams.q}
            >
              <SearchStats resultPromise={hits} />
            </Suspense>
          </header>

          <div>
            <Suspense fallback={<ResultSkeleton />} key={searchParams.q}>
              <Result resultPromise={hits} />
            </Suspense>
          </div>

          <footer className="max-w-screen-lg mx-auto">
            <Suspense fallback={null} key={searchParams.q}>
              <FooterContent page={page} resultPromise={hits} />
            </Suspense>
          </footer>
        </article>
      </div>
    </main>
  );
}
