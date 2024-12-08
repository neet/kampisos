import clsx from "clsx";
import Link from "next/link";
import { FC, Suspense } from "react";

import { BannerSearch } from "./BannerSearch";

export const Banner: FC = () => {
  return (
    <header>
      <div
        className={clsx(
          "flex items-center gap-3",
          "p-4",
          "h-16",
          "border-b border-zinc-300 dark:border-zinc-600",
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

          <Suspense fallback={null}>
            <BannerSearch />
          </Suspense>
        </div>

        <div className="flex justify-end underline">
          <Link href="/about">使い方</Link>
        </div>
      </div>
    </header>
  );
};
