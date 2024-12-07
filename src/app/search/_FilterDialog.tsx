"use client";

import { FC, useRef } from "react";

import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";

import { Filters } from "./_Filters";

export type FiltersProps = {
  className?: string;
  defaultValues?: {
    book?: string[];
    dialect?: string[];
    author?: string[];
    pronoun?: string[];
  };
  resultPromise: Promise<Record<string, Record<string, number>>>;
};

export const FilterDialog: FC<FiltersProps> = (props) => {
  const ref = useRef<HTMLDialogElement>(null);

  const handleClick = () => {
    ref.current?.showModal();
  };

  return (
    <>
      <Button onClick={handleClick}>フィルター</Button>

      <Dialog ref={ref}>
        <h2 className="text-lg font-bold">詳細情報</h2>

        <Filters {...props} />
      </Dialog>
    </>
  );
};
