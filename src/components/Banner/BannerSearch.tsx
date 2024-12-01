"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import { FiSearch } from "react-icons/fi";

export type BannerSearchProps = {
  className?: string;
};

export const BannerSearch: FC<BannerSearchProps> = (props) => {
  const { className } = props;
  const searchParams = useSearchParams();

  if (!searchParams.has("q")) {
    return null;
  }

  const q = searchParams.get("q") as string;

  return (
    <form
      id="search"
      method="GET"
      action="/search"
      className={clsx(
        "flex items-center",
        "rounded-lg",
        "border border-zinc-400",
        "dark:border-zinc-600",
        "dark:bg-black dark:text-white",
        "forced-colors:border forced-colors:border-[BannerBorder]",
        className,
      )}
    >
      <label htmlFor="search-input" className="block mx-2">
        <FiSearch className="text-zinc-600 dark:text-zinc-400" aria-hidden />
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
  );
};
