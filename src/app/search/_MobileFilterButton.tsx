"use client";

import { FC, useRef } from "react";
import { FiFilter } from "react-icons/fi";

import { Button } from "@/components/Button";
import { Dialog, DialogContent, DialogHeader } from "@/components/Dialog";
import { Filters, FiltersProps } from "@/components/Filters";

export type MobileFilterButtonProps = {
  defaultValues: FiltersProps["defaultValues"];
  resultPromise: FiltersProps["resultPromise"];
};

export const MobileFilterButton: FC<MobileFilterButtonProps> = (props) => {
  const { defaultValues, resultPromise } = props;

  const ref = useRef<HTMLDialogElement>(null);

  const handleClick = () => {
    ref.current?.showModal();
  };

  return (
    <>
      <Button
        variant="primary"
        icon={<FiFilter />}
        className="md:hidden"
        onClick={handleClick}
      >
        絞り込み
      </Button>

      <Dialog id="filter-dialog" className="md:hidden" ref={ref}>
        <DialogHeader>
          <h2 className="text-lg font-bold">フィルターを設定</h2>
        </DialogHeader>

        <DialogContent>
          <Filters
            defaultValues={defaultValues}
            resultPromise={resultPromise}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
