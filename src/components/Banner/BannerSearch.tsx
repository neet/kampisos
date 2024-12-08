"use client";

import { useSearchParams } from "next/navigation";
import { FC } from "react";

import { Search } from "../Search";

export const BannerSearch: FC = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  if (!q) {
    return null;
  }

  return <Search size="sm" className="w-full h-full" defaultValue={q} />;
};
