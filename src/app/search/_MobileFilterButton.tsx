import { Button, Dialog, Text } from "@radix-ui/themes";
import { FC } from "react";

import { Filters, FiltersProps } from "@/components/Filters";

export type MobileFilterButtonProps = {
  className?: string;
  defaultValues: FiltersProps["defaultValues"];
  resultPromise: FiltersProps["resultPromise"];
};

export const MobileFilterButton: FC<MobileFilterButtonProps> = (props) => {
  const { className, defaultValues, resultPromise } = props;

  return (
    <Dialog.Root>
      <Dialog.Trigger className={className}>
        <Button variant="ghost">絞り込み</Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>
          <Text size="4" weight="bold">
            フィルターを設定
          </Text>
        </Dialog.Title>

        <Dialog.Description>
          検索結果を絞り込むための条件を設定してください。
        </Dialog.Description>

        <Filters defaultValues={defaultValues} resultPromise={resultPromise} />
      </Dialog.Content>
    </Dialog.Root>
  );
};
