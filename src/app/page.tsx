/* eslint-disable @typescript-eslint/no-explicit-any */
import { searchClient } from "@/lib/search";
import { SearchResponse } from "algoliasearch";

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
    book?: string;
    title?: string;
    pronoun?: string;
    author?: string;
    dialect?: string;
  };
};

export default async function Home(props: HomeProps) {
  const { searchParams } = props;
  const { q } = searchParams;

  let result: SearchResponse<Entry> | null = null;

  if (q) {
    const filters: string[] = []

    if (searchParams.book) {
      filters.push(`book:${searchParams.book}`)
    }

    if (searchParams.title) {
      filters.push(`title:${searchParams.title}`)
    }

    if (searchParams.pronoun) {
      filters.push(`pronoun:${searchParams.pronoun}`)
    }

    if (searchParams.author) {
      filters.push(`author:${searchParams.author}`)
    }

    if (searchParams.dialect) {
      filters.push(`dialect:${searchParams.dialect}`)
    }

    result = await searchClient.searchSingleIndex<Entry>({
      indexName: "entries",
      searchParams: {
        query: q,
        filters: filters.join(" AND "),
        attributesToHighlight: ["text", "translation"],
      },
    });
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl font-bold">Aynu Kampisos</h1>

      <form className="border p-4 rounded mt-4" method="GET" action="/">
        <label>
          <span className="sr-only">Query</span>
          <input
            id="input"
            type="text"
            name="q"
            className="border border-zinc-200 p-2 rounded-lg"
          />
        </label>

        <details>
          <summary className="cursor-pointer">Advanced Search</summary>

          <div className="bg-zinc-100 p-4 select-none">
            <label className="flex justify-between">
              資料名
              <input
                type="text"
                name="book"
                className="border border-zinc-200 p-2 rounded-lg"
                autoComplete="off"
              />
            </label>

            <label className="flex justify-between">
              タイトル
              <input
                type="text"
                name="title"
                className="border border-zinc-200 p-2 rounded-lg"
              />
            </label>

            <label className="flex justify-between">
              人称接辞
              <select
                name="pronoun"
                className="border border-zinc-200 p-2 rounded-lg"
              >
                <option value="first">一人称</option>
                <option value="fourth">四人称</option>
              </select>
            </label>

            <label className="flex justify-between">
              著者名
              <input
                type="text"
                name="author"
                className="border border-zinc-200 p-2 rounded-lg"
              />
            </label>

            <label className="flex justify-between">
              方言
              <select
                name="dialect"
                className="border border-zinc-200 p-2 rounded-lg"
              >
                <option value="沙流">沙流</option>
                <option value="千歳">千歳</option>
              </select>
            </label>
          </div>
        </details>

        <button className="block mt-2 bg-zinc-200 p-2 rounded-lg" type="submit">
          Search
        </button>
      </form>

      <h2 className="text-xl font-bold bg-zinc-100 py-2 mt-2">Results</h2>

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
              <div>{hit.book}</div>
              <div>{hit.title}</div>
              <div>{hit.pronoun}</div>
              <div>{hit.author}</div>
              <div>{hit.dialect}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
