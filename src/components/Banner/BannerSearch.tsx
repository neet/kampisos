"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { FC } from "react";

import { Search } from "../Search";
import { BannerFilterButton } from "./BannerFilterButton";

export type BannerSearchProps = {
  className?: string;
};

export const BannerSearch: FC<BannerSearchProps> = (props) => {
  const { className } = props;

  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  if (!q) {
    return null;
  }

  return (
    <div className={clsx("flex gap-2 justify-end", className)}>
      <Search size="sm" className="w-full h-full" defaultValue={q} />
      <BannerFilterButton />
    </div>
  );
};
