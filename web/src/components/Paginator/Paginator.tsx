"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  Button,
  Flex,
  IconButton,
  Reset,
  VisuallyHidden,
} from "@radix-ui/themes";
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
    if (page < 0) {
      return "";
    }
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return pathname + "?" + params.toString();
  };

  return (
    <nav aria-label="ページネーション">
      <Reset>
        <Flex gap="1" asChild justify="center">
          <ul>
            {page > 1 && (
              <li>
                <IconButton asChild variant="outline" size="3">
                  <Link href={createHref(page - 1)} rel="prev">
                    <ChevronLeftIcon aria-label="前のページ" />
                  </Link>
                </IconButton>
              </li>
            )}

            {pages.hasMore.leading && (
              <Flex justify="center" align="center" asChild p="1">
                <li>
                  <DotsHorizontalIcon color="gray" />
                </li>
              </Flex>
            )}

            {pages.value.map((value) => {
              const current = value === page;
              const lastPage = value === totalPages;

              return (
                <li key={value}>
                  <Button
                    asChild
                    variant={current ? "solid" : "outline"}
                    size="3"
                  >
                    <Link href={createHref(value)}>
                      {value}
                      <VisuallyHidden>ページ</VisuallyHidden>
                      {lastPage && (
                        <VisuallyHidden>（最後のページ）</VisuallyHidden>
                      )}
                    </Link>
                  </Button>
                </li>
              );
            })}

            {pages.hasMore.trailing && (
              <Flex justify="center" align="center" asChild p="1">
                <li>
                  <DotsHorizontalIcon color="gray" />
                </li>
              </Flex>
            )}

            {page < totalPages && (
              <li>
                <IconButton asChild variant="outline" size="3">
                  <Link href={createHref(page + 1)} rel="next">
                    <ChevronRightIcon aria-label="次のページ" />
                  </Link>
                </IconButton>
              </li>
            )}
          </ul>
        </Flex>
      </Reset>
    </nav>
  );
}
