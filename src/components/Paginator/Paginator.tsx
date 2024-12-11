"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";

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
    "flex items-center justify-center",
    "text-center",
    "size-9",
  );

  const ellipsisClassName = clsx(
    itemClassName,
    "text-zinc-400 dark:text-zinc-600",
  );

  const linkClassName = (current: boolean = false) =>
    clsx(
      itemClassName,
      "rounded-lg",
      "transition-colors",
      current
        ? ["bg-emerald-600 text-white", "dark:bg-emerald-400 dark:text-black"]
        : ["hover:bg-zinc-100 dark:hover:bg-zinc-800"],
    );

  return (
    <nav aria-label="ページネーション">
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
            <a className={ellipsisClassName}>
              <FiMoreHorizontal />
            </a>
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
