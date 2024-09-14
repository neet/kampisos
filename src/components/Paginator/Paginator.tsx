"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

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
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return pathname + "?" + params.toString();
  };

  return (
    <nav className="mt-4">
      <ul className="flex gap-1 justify-center">
        {pages.value.map((value) => (
          <li key={value}>
            <Link
              href={createHref(value)}
              className={clsx(
                "box-border",
                "px-4 py-3 border border-zinc-200 bg-white rounded leading-none shadow-sm",
                "hover:bg-zinc-100 transition",
                value === page && "bg-black text-white border-black",
              )}
            >
              {value + 1}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
