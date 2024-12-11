import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";

export const Banner: FC = () => {
  return (
    <header>
      <div
        className={clsx(
          "flex items-center gap-3",
          "p-4",
          "h-16",
          "border-b border-zinc-300 dark:border-zinc-600",
          "bg-white dark:bg-zinc-900",
        )}
      >
        <div className="flex grow gap-2 items-center justify-between h-full">
          <Link
            href="/"
            className="rounded-lg px-2 -mx-2 hover:bg-zinc-100 hover:dark:bg-black transition-colors"
          >
            <h1 className="text-3xl leading-none font-cookie">kampisos</h1>
          </Link>

          <Link
            href="/about"
            className="text-black-emerald-600 dark:text-emerald-400 underline"
          >
            使い方
          </Link>
        </div>
      </div>
    </header>
  );
};
