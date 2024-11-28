import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";

export const Banner: FC = () => {
  return (
    <header className={clsx("sticky top-0", "z-50")}>
      <div
        className={clsx(
          "flex items-center",
          "mt-3",
          "px-8 py-3",
          "lg:max-w-screen-md mx-auto",
          "bg-white/80 dark:bg-black/80",
          "shadow",
          "rounded-full",
          "dark:border dark:border-zinc-600",
          "backdrop-blur",
        )}
      >
        <div className="flex flex-1">
          <Link
            href="/"
            className="text-black dark:text-white no-underline hover:underline"
          >
            <h1 className="text-3xl leading-none font-cookie">kampisos</h1>
          </Link>
        </div>

        <div className="flex justify-end underline">
          <Link href="/about">使い方</Link>
        </div>
      </div>
    </header>
  );
};
