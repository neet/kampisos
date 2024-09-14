/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchResponse } from "algoliasearch";
import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Entry } from "@/components/Entry";
import { Paginator } from "@/components/Paginator";
import { Search } from "@/components/Search/Search";
import { searchClient } from "@/lib/search";

type Entry = {
  objectID: string;
  book: string;
  title: string;
  pronoun: string;
  author: string;
  dialect: string;
  text: string;
  translation: string;
};

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

  const result: SearchResponse<Entry> =
    await searchClient.searchSingleIndex<Entry>({
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

        <search className="w-full md:w-2/3">
          <form method="GET" action="/search" className="max-w-screen-sm">
            <Search defaultValue={q} />
          </form>
        </search>

        <p className="text-zinc-500 flex gap-4">
          {result.nbHits}件中{result.hits.length}件を表示
        </p>
      </header>

      <article className="bg-white border-y border-zinc-200">
        <ul className="divide-y-2 divide-zinc-100 max-w-screen-lg mx-auto p-4">
          {result.hits.map((hit) => (
            <li key={hit.objectID} className="py-4">
              <Entry
                text={(hit._highlightResult?.text as any).value}
                translation={(hit._highlightResult?.translation as any).value}
                book={hit.book}
                title={hit.title}
                author={hit.author}
                dialect={hit.dialect}
              />
            </li>
          ))}
        </ul>
      </article>

      <footer className="max-w-screen-lg mx-auto p-4">
        <Paginator page={page} totalPages={result.nbPages} />
      </footer>
    </main>
  );
}
