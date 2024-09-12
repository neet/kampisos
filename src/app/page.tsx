/* eslint-disable @typescript-eslint/no-explicit-any */
import { searchClient } from "@/lib/search";
import { SearchResponse } from "algoliasearch";
import { Metadata } from "next";
import Link from "next/link";

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
  const title = props.searchParams.q
    ? `「${props.searchParams.q}」の検索結果 | kampisos`
    : "kampisos - アイヌ語コーパス横断検索";

  return {
    title,
  }
}

export default async function Home(props: HomeProps) {
  const { searchParams } = props;
  const { q } = searchParams;
  const page = Number(searchParams.page ?? 0);

  let result: SearchResponse<Entry> | null = null;

  if (q) {
    result = await searchClient.searchSingleIndex<Entry>({
      indexName: "entries",
      searchParams: {
        query: q,
        page,
        attributesToHighlight: ["text", "translation"],
      },
    });
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl font-bold">kampisos</h1>

      <form method="GET" action="/">
        <search className="flex max-w-screen-sm mx-auto">
          <input
            id="input"
            type="text"
            name="q"
            className="block flex-1 box-border border border-r-0 border-zinc-300 py-2 px-5 text-lg rounded-lg rounded-r-none"
            defaultValue={q}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck="false"
          />

          <button className="block text-lg px-5 py-2 rounded-lg rounded-l-none bg-blue-600 text-white" type="submit">
            検索
          </button>
        </search>
      </form>

      {result && (
        <div className="flex gap-2 text-zinc-500 justify-end text-sm">
          <span>
            {result.nbHits}件の検索結果
          </span>

          <span>
            {result.processingTimeMS}ミリ秒
          </span>
        </div>
      )}

      <ul className="divide-y divide-zinc-100">
        {result?.hits.map((hit) => (
          <li key={hit.objectID} className="py-4">
            <div className="flex gap-2 flex-col md:flex-row">
              <div
                className="flex-1"
                dangerouslySetInnerHTML={{
                  __html: (hit._highlightResult?.text as any).value ?? "",
                }}
              />
              <div
                className="flex-1"
                dangerouslySetInnerHTML={{
                  __html:
                    (hit._highlightResult?.translation as any).value ?? "",
                }}
              />
            </div>

            <div className="flex gap-4 flex-wrap mt-2 text-zinc-500 text-sm justify-end">
              {/* <div>{hit.book}</div>
              <div>{hit.title}</div> */}
              <div>{hit.pronoun}</div>
              <div>{hit.author}</div>
              <div>{hit.dialect}</div>
            </div>
          </li>
        ))}
      </ul>

      <div>
        <ul className="flex justify-center gap-2">
          {
            Array.from({ length: result?.nbPages ?? 0 }).map((_, i) => (
              <li key={i}>
                {
                  i === page ? (
                    <span>{i + 1}</span>
                  ): (
                    <Link href={`/?q=${q}&page=${i}`} className="underline text-blue-600">{i + 1}</Link>
                  )
                }
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}
