import { Button, Dialog, Text } from "@radix-ui/themes";
import { FC, Suspense } from "react";

import { Filter, FilterRootProps } from "@/components/Filter";
import { useTranslations } from "next-intl";

export type MobileFilterButtonProps = {
  className?: string;
  defaultValues: FilterRootProps["defaultValues"];
  facetsPromise: Promise<Record<string, Record<string, number>>>;
};

export const MobileFilterButton: FC<MobileFilterButtonProps> = (props) => {
  const { className, defaultValues, facetsPromise } = props;

  const t = useTranslations("/app/[locale]/search/MobileFilterButton");

  return (
    <Dialog.Root>
      <Dialog.Trigger className={className}>
        <Button variant="ghost">{t("title")}</Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>
          <Text size="4" weight="bold">
            {t("title")}
          </Text>
        </Dialog.Title>

        <Dialog.Description>{t("description")}</Dialog.Description>

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
