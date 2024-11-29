import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";
import { FiSearch } from "react-icons/fi";

export type BannerProps = {
  q?: string;
};

export const Banner: FC<BannerProps> = (props) => {
  const { q } = props;

  return (
    <header className={clsx("sticky top-0", "z-50")}>
      <div
        className={clsx(
          "flex items-center gap-3",
          "p-4",
          "h-16",
          "border-b border-zinc-400 dark:border-zinc-600",
          "bg-zinc-100 dark:bg-black",
        )}
      >
        <div className="flex grow gap-2 items-center h-full">
          <Link
            href="/"
            className="text-black dark:text-white no-underline hover:underline"
          >
            <h1 className="text-3xl leading-none font-cookie">kampisos</h1>
          </Link>

          <form
            method="GET"
            action="/search"
            className={clsx(
              "flex-1",
              "h-full",
              "flex items-center",
              "rounded-lg",
              "border border-zinc-400",
              "dark:border-zinc-600",
              "dark:bg-black dark:text-white",
              "forced-colors:border forced-colors:border-[BannerBorder]",
            )}
          >
            <label htmlFor="search-input" className="block mx-2">
              <FiSearch
                className="text-zinc-600 dark:text-zinc-400"
                aria-hidden
              />
              <span className="sr-only">キーワード</span>
            </label>

            <input
              id="search-input"
              type="text"
              name="q"
              defaultValue={q}
              className={clsx(
                "h-full",
                "w-full bg-transparent",
                "text-zinc-600 focus:text-black dark:text-zinc-400 dark:focus:text-zinc-400",
              )}
              required
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              spellCheck="false"
            />
          </form>
        </div>

        <div className="flex justify-end underline">
          <Link href="/about">使い方</Link>
        </div>
      </div>
    </header>
  );
};
