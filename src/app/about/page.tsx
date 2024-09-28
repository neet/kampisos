/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { Metadata } from "next";

export const revalidate = 86_400;

export function generateMetadata(): Metadata {
  return {
    title: "このサイトについて",
    description:
      "アイヌ語・日本語のキーワードを入力して複数のコーパスを検索できます",
  };
}

export default async function AboutPage() {
  const Content = (await import(`./about.mdx`)).default;

  return (
    <main>
      <header
        className={clsx(
          "max-w-screen-lg mx-auto my-12",
          "flex flex-col items-center gap-3",
          "px-4 md:px-0",
        )}
      >
        <h2 className="block text-2xl font-bold">このサイトについて</h2>
      </header>

      <article className="bg-white dark:bg-black border-y border-zinc-300 dark:border-zinc-700">
        <div className="max-w-screen-sm mx-auto p-4 prose prose-zinc dark:prose-invert prose-a:text-blue-600 dark:prose-a:text-blue-400">
          <Content />
        </div>
      </article>
    </main>
  );
}
