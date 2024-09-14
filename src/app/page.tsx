import { Metadata } from "next";

import { Search } from "@/components/Search";

export const metadata: Metadata = {
  title: "アイヌ語コーパス横断検索",
};

export default async function Home() {
  return (
    <main className="max-w-screen-lg mx-auto p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold leading-tight">
          アイヌ語コーパス横断検索
        </h2>
        <p className="leading-relaxed mt-1">
          アイヌ語・日本語のキーワードを入力してコーパスを全文検索できます
        </p>
      </div>

      <search>
        <form
          method="GET"
          action="/search"
          className="mt-4 max-w-screen-sm mx-auto"
        >
          <Search defaultValue="" />
        </form>
      </search>
    </main>
  );
}
