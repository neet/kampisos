import { Button, Flex } from "@radix-ui/themes";
import { FC, use } from "react";

import { FilterItemRoot, FilterItemSkeleton } from "./FilterItem";

export type FilterRootProps = {
  className?: string;
  defaultValues?: {
    book?: string[];
    dialect?: string[];
    author?: string[];
    pronoun?: string[];
  };
  resultPromise: Promise<Record<string, Record<string, number>>>;
};

const FilterRoot: FC<FilterRootProps> = (props) => {
  const { defaultValues, resultPromise } = props;

  const result = use(resultPromise);

  return (
    <Flex direction="column" gap="5">
      <Flex direction="column" gap="4">
        {result.book && (
          <FilterItemRoot
            form="search"
            label="出典"
            name="book"
            defaultValues={defaultValues?.book}
            options={Object.entries(result.book).map(([value, count]) => ({
              value,
              count,
            }))}
          />
        )}

        {result.dialect && (
          <FilterItemRoot
            form="search"
            label="方言"
            name="dialect"
            defaultValues={defaultValues?.dialect}
            options={Object.entries(result.dialect).map(([value, count]) => ({
              value,
              count,
            }))}
          />
        )}

        {result.author && (
          <FilterItemRoot
            form="search"
            label="著者"
            name="author"
            defaultValues={defaultValues?.author}
            options={Object.entries(result.author).map(([value, count]) => ({
              value,
              count,
            }))}
          />
        )}

        {result.pronoun && (
          <FilterItemRoot
            form="search"
            label="主な一人称"
            name="pronoun"
            defaultValues={defaultValues?.pronoun}
            options={Object.entries(result.pronoun).map(([value, count]) => ({
              label: value === "first" ? "一人称" : "四人称",
              value,
              count,
            }))}
          />
        )}
      </Flex>

      <Button form="search" type="submit">
        適用
      </Button>
    </Flex>
  );
};

// --------------------------------------------------

const FilterSkeleton: FC = () => {
  return (
    <Flex direction="column" gap="5">
      <Flex direction="column" gap="4">
        <FilterItemSkeleton />
        <FilterItemSkeleton />
        <FilterItemSkeleton />
        <FilterItemSkeleton />
      </Flex>

      <Button disabled>適用</Button>
    </Flex>
  );
};

// --------------------------------------------------

export const Filter = {
  Root: FilterRoot,
  Skeleton: FilterSkeleton,
};
