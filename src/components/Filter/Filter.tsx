import { Button, Flex } from "@radix-ui/themes";
import { FC, use } from "react";

import {
  DialectSelectorRoot,
  DialectSelectorSkeleton,
} from "../DialectSelector";
import { FilterItemRoot, FilterItemSkeleton } from "./FilterItem";

export type FilterRootProps = {
  className?: string;
  defaultValues?: {
    group?: string[];
    author?: string[];
    pronoun?: string[];
    dialectLv1?: string[];
    dialectLv2?: string[];
    dialectLv3?: string[];
  };
  facetsPromise: Promise<Record<string, Record<string, number>>>;
};

const FilterRoot: FC<FilterRootProps> = (props) => {
  const { defaultValues, facetsPromise } = props;

  const facets = use(facetsPromise);

  return (
    <Flex direction="column" gap="5">
      <Flex direction="column" gap="4">
        <DialectSelectorRoot
          form="search"
          values={{
            dialectLv1: defaultValues?.dialectLv1,
            dialectLv2: defaultValues?.dialectLv2,
            dialectLv3: defaultValues?.dialectLv3,
          }}
          counts={{
            dialectLv1: facets.dialect_lv1,
            dialectLv2: facets.dialect_lv2,
            dialectLv3: facets.dialect_lv3,
          }}
        />

        {facets.group && (
          <FilterItemRoot
            form="search"
            label="出典"
            name="group"
            defaultValues={defaultValues?.group}
            options={Object.entries(facets.group).map(([value, count]) => ({
              value,
              count,
            }))}
          />
        )}

        {facets.author && (
          <FilterItemRoot
            form="search"
            label="著者"
            name="author"
            defaultValues={defaultValues?.author}
            options={Object.entries(facets.author).map(([value, count]) => ({
              value,
              count,
            }))}
          />
        )}

        {facets.pronoun && (
          <FilterItemRoot
            form="search"
            label="主な一人称"
            name="pronoun"
            defaultValues={defaultValues?.pronoun}
            options={Object.entries(facets.pronoun).map(([value, count]) => ({
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
        <DialectSelectorSkeleton />
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
