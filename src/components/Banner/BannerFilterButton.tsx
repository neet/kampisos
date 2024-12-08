"use client";

import { FC } from "react";
import { FiFilter } from "react-icons/fi";

import { Button } from "@/components/Button";

export const BannerFilterButton: FC = () => {
  const handleClick = () => {
    const dialog = document.getElementById("filter-dialog");

    if (dialog instanceof HTMLDialogElement) {
      dialog.showModal();
    }
  };

  return (
    <Button
      className="h-full md:hidden"
      icon={
        <FiFilter
          className="text-zinc-600 dark:text-zinc-400"
          aria-label="フィルター"
        />
      }
      variant="secondary"
      onClick={handleClick}
    />
  );
};
