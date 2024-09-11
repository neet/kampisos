/* eslint-disable @typescript-eslint/no-explicit-any */
import { searchClient } from "@/lib/search";
import { SearchResponse } from "algoliasearch";
import { Metadata } from "next";

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

export function generateMetadata(props: HomeProps): Metadata {
  const title = props.searchParams.q
    ? `「${props.searchParams.q}」の検索結果`
    : "アイヌ語コーパス横断検索";

  return {
    title,
  }
}

export default async function Home(props: HomeProps) {
  const { searchParams } = props;
  const { q } = searchParams;

  let result: SearchResponse<Entry> | null = null;

  if (q) {
    result = await searchClient.searchSingleIndex<Entry>({
      indexName: "entries",
      searchParams: {
        query: q,
        attributesToHighlight: ["text", "translation"],
      },
    });
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl font-bold">アイヌ語コーパス横断検索</h1>

      <form className="border p-4 rounded-lg mt-4" method="GET" action="/">
        <label>
          <span className="sr-only">キーワード</span>
          <input
            id="input"
            type="text"
            name="q"
            className="border border-zinc-200 p-2 rounded-lg"
            defaultValue={q}
          />
        </label>

        <button className="block mt-2 bg-zinc-200 p-2 rounded-lg" type="submit">
          検索
        </button>
      </form>

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
