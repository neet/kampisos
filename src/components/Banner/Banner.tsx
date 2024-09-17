import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";

export const Banner: FC = () => {
  return (
    <header
      className={clsx(
        "sticky top-0",
        "backdrop-blur",
        "bg-white/80",
        "dark:bg-black/80",
        "shadow-sm",
        "dark:shadow-none dark:border-b dark:border-zinc-700",
      )}
    >
      <div
        className={clsx(
          "flex",
          "box-border",
          "p-4",
          "lg:max-w-screen-lg mx-auto",
        )}
      >
        <div className="flex flex-1">
          <Link href="/">
            <h1 className="text-lg font-bold hover:underline">
              アイヌ語コーパス横断検索
            </h1>
          </Link>
        </div>

        <div className="flex justify-end text-blue-600 dark:text-blue-400 underline">
          <Link href="/about">利用方法</Link>
        </div>
      </div>
    </header>
  );
};
