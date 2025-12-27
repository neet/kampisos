import { Button, Dialog, Text } from "@radix-ui/themes";
import { FC, Suspense } from "react";

import { Filter, FilterRootProps } from "@/components/Filter";

export type MobileFilterButtonProps = {
  className?: string;
  defaultValues: FilterRootProps["defaultValues"];
  facetsPromise: Promise<Record<string, Record<string, number>>>;
};

export const MobileFilterButton: FC<MobileFilterButtonProps> = (props) => {
  const { className, defaultValues, facetsPromise } = props;

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

        <Suspense fallback={<Filter.Skeleton />}>
          <Filter.Root
            defaultValues={defaultValues}
            facetsPromise={facetsPromise}
          />
        </Suspense>
      </Dialog.Content>
    </Dialog.Root>
  );
};
