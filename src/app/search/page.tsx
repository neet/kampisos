/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { searchClient } from "@/lib/search";
import { Entry as EntryType } from "@/models/entry";
import { buildFiltersFromFacets } from "@/utils/buildFiltersFromFacets";
import { fetchComplexFacets } from "@/utils/fetchComplexFacets";

import { FilterDialog } from "./_FilterDialog";
import { Filters } from "./_Filters";
import { FooterContent } from "./_FooterContent";
import { Result, ResultSkeleton } from "./_Result";
import { SearchStats } from "./_SearchStats";

export const revalidate = 86_400;

type SearchPageProps = {
  searchParams: {
    q?: string;
    page?: number;

    dialect?: string | string[];
    author?: string | string[];
    book?: string | string[];
    pronoun?: string | string[];
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

  const result = searchClient
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
    <main
      className={clsx(
        "flex",
        "text-zinc-900 bg-white",
        "dark:text-white dark:bg-zinc-900",
      )}
    >
      <aside
        className={clsx(
          "sticky top-0",
          "h-screen",
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

      <article className={clsx("flex-1 py-4 px-3 md:px-6")}>
        <header>
          <Suspense
            fallback={
              <div className="w-1/4 h-[1lh] bg-zinc-200 dark:bg-zinc-800 forced-colors:bg-[GrayText] rounded animate-pulse" />
            }
            key={searchParams.q}
          >
            <SearchStats resultPromise={result}>
              <FilterDialog
                className="md:hidden"
                defaultValues={{
                  dialect,
                  author,
                  book,
                  pronoun,
                }}
                resultPromise={facets}
              />
            </SearchStats>
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
  );
}
