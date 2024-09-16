"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

import { createPages } from "@/utils/pages";

export type PaginatorProps = {
  page: number;
  totalPages: number;
  maxPages?: number;
};

const DEFAULT_MAX_PAGES_TO_SHOW = 5;

export function Paginator(props: PaginatorProps) {
  const { page, totalPages, maxPages = DEFAULT_MAX_PAGES_TO_SHOW } = props;
  const pages = createPages(page, totalPages, maxPages);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createHref = (page: number): string => {
    if (page < 0) {
      return "";
    }
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return pathname + "?" + params.toString();
  };

  const itemClassName = clsx(
    "block",
    "box-border",
    "h-full",
    "leading-none",
    "text-center",
  );

  const ellipsisClassName = clsx(
    itemClassName,
    "py-3 px-1",
    "text-zinc-400 dark:text-zinc-600",
  );

  const linkClassName = (current: boolean = false) =>
    clsx(
      itemClassName,
      "px-4 py-3 rounded shadow-sm",
      current
        ? [
            "bg-black border border-zinc-700 text-white",
            "dark:bg-white dark:border-zinc-300 dark:text-zinc-800",
          ]
        : [
            "bg-white border border-zinc-300 bg-white hover:bg-zinc-100",
            "dark:bg-black dark:border-zinc-700 dark:hover:bg-zinc-800",
          ],
    );

  return (
    <nav className="mt-4" aria-label="ページネーション">
      <ul className="flex gap-1 justify-center">
        <li>
          <Link href={createHref(page - 1)} className={linkClassName()}>
            <BsCaretLeftFill title="前のページへ" className="size-3" />
          </Link>
        </li>

        {pages.hasMore.head && (
          <li>
            <a className={ellipsisClassName}>&#8230;</a>
          </li>
        )}

        {pages.value.map((value) => (
          <li key={value}>
            <Link
              href={createHref(value)}
              className={linkClassName(value === page)}
            >
              {value + 1}
              <span className="sr-only">ページ</span>
              {value === totalPages - 1 && (
                <span className="sr-only">（最後のページ）</span>
              )}
            </Link>
          </li>
        ))}

        {pages.hasMore.tail && (
          <li>
            <a className={ellipsisClassName}>&#8230;</a>
          </li>
        )}

        <li>
          <Link href={createHref(page + 1)} className={linkClassName()}>
            <BsCaretRightFill title="次のページへ" className="size-3" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
