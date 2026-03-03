"use client";
import "./style.css";

import {
  Badge,
  Box,
  CheckboxGroup,
  Flex,
  Heading,
  ScrollArea,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import { FC, ReactNode, useMemo } from "react";

import { FilterOption } from "./FilterOption";
import { Option } from "./model";
// import { useTranslations } from "next-intl";

export type FilterItemRootProps = {
  label: ReactNode;
  defaultValues?: string[];
  name?: string;
  form?: string;
  options: Option[];
};

export const FilterItemRoot: FC<FilterItemRootProps> = (props) => {
  const { label, defaultValues = [], name, form } = props;

  // const t = useTranslations("/components/Filter/FilterItem");

  const options = useMemo(() => {
    return props.options.sort((a, b) => {
      const aChecked = defaultValues.includes(a.value);
      const bChecked = defaultValues.includes(b.value);

      if (aChecked !== bChecked) {
        return aChecked ? -1 : 1;
      }
      if (a.count !== b.count) {
        return b.count - a.count;
      }
      return a.value.localeCompare(b.value);
    });
  }, [props.options, defaultValues]);

  return (
    <Box asChild>
      <fieldset>
        <Heading asChild size="2" weight="bold" color="gray" mb="3">
          <legend>{label}</legend>
        </Heading>

        <ScrollArea scrollbars="vertical" style={{ height: "300px" }}>
          <CheckboxGroup.Root name={name} defaultValue={defaultValues}>
            {options.map((option) => (
              <Flex key={option.value} justify="between" gap="1">
                <Box flexGrow="1" flexShrink="1">
                  <CheckboxGroup.Item value={option.value} form={form}>
                    <Text>{option.label ?? option.value}</Text>
                  </CheckboxGroup.Item>
                </Box>

                <Badge color="gray">{option.count}</Badge>
              </Flex>
            ))}
          </CheckboxGroup.Root>
        </ScrollArea>
      </fieldset>
    </Box>
  );
};

// --------------------------------------------------

export const FilterItemSkeleton: FC = () => {
  return (
    <Box>
      <Skeleton>
        <Heading as="h4" size="2" weight="bold" color="gray" mb="3">
          出典
        </Heading>
      </Skeleton>

      <Flex direction="column" gap="1">
        {[...Array(5)].map((_, i) => (
          <FilterOption.Skeleton key={i} />
        ))}
      </Flex>
    </Box>
  );
};
