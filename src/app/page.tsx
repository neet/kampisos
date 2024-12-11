import { Metadata } from "next";

import { Changelogs } from "@/components/Changelogs";
import { Search } from "@/components/Search";
import { client } from "@/lib/microcms";
import { Changelog } from "@/models/changelog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "アイヌ語コーパス検索",
  description:
    "アイヌ語・日本語のキーワードを入力して複数のコーパスを検索できます",
};

export default async function Home() {
  const changelogs = await client.getList<Changelog>({
    endpoint: "changelogs",
    queries: {
      orders: "-publishedAt",
      limit: 5,
    },
  });

  return (
    <main className="flex items-center justify-center p-4">
      <div>
        <div className="text-center">
          <h2 className="leading-tight">
            <span className="text-7xl font-cookie">kampisos</span>
          </h2>
          <p className="leading-relaxed mt-1">
            アイヌ語例文対訳コーパス検索サイト
          </p>
        </div>

        <search className="mt-4 max-w-screen-sm mx-auto">
          <Search />
          <Changelogs className="mt-6" changelogs={changelogs.contents} />
        </search>
      </div>
    </main>
  );
}
