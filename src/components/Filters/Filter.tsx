"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import { FC, ReactNode, useMemo, useState } from "react";

const MAX_OPTIONS = 5;

type Option = {
  label?: string;
  value: string;
  count: number;
};

export type FilterProps = {
  label: ReactNode;
  defaultValues?: string[];
  name?: string;
  form?: string;
  options: Option[];
};

export const Filter: FC<FilterProps> = (props) => {
  const { label, defaultValues = [], name, form } = props;

  const [open, setOpen] = useState(false);

  const options = useMemo(() => {
    return props.options.sort((a, b) => {
      if (defaultValues.includes(a.value)) {
        return -1;
      } else if (defaultValues.includes(b.value)) {
        return 1;
      } else {
        return 0;
      }
    });
  }, [props.options, defaultValues]);

  const firstOptions = options.slice(0, MAX_OPTIONS);
  const restOptions = options.slice(MAX_OPTIONS);
  const hasMore = props.options.length > MAX_OPTIONS;

  return (
    <Box>
      <Heading as="h4" size="2" weight="bold" color="gray" mb="3">
        {label}
      </Heading>

      <Collapsible.Root open={open} onOpenChange={() => setOpen(!open)}>
        <Flex direction="column" gap="1">
          {firstOptions.map((option) => (
            <FilterOption
              key={option.value}
              name={name}
              form={form}
              option={option}
              defaultChecked={defaultValues.includes(option.value)}
            />
          ))}
        </Flex>

        <Collapsible.Content>
          <Flex direction="column" gap="1">
            {restOptions.map((option) => (
              <FilterOption
                key={option.value}
                name={name}
                form={form}
                option={option}
                defaultChecked={defaultValues.includes(option.value)}
              />
            ))}
          </Flex>
        </Collapsible.Content>

        {hasMore && (
          <Collapsible.Trigger asChild>
            <Flex asChild justify="between" width="100%" mt="2">
              <Button variant="ghost" color="gray">
                {open ? (
                  <>
                    <Text>閉じる</Text>
                    <ChevronUpIcon />
                  </>
                ) : (
                  <>
                    <Text>さらに表示</Text>
                    <ChevronDownIcon />
                  </>
                )}
              </Button>
            </Flex>
          </Collapsible.Trigger>
        )}
      </Collapsible.Root>
    </Box>
  );
};

type FilterOptionProps = {
  name?: string;
  form?: string;
  option: Option;
  defaultChecked?: boolean;
};

const FilterOption: FC<FilterOptionProps> = (props) => {
  const { name, form, option, defaultChecked } = props;

  const label = option.label ?? option.value;
  const count = Intl.NumberFormat("ja-JP").format(option.count);

  return (
    <Flex asChild gap="1" align="center">
      <label>
        <Checkbox
          name={name}
          form={form}
          value={option.value}
          defaultChecked={defaultChecked}
          variant="surface"
        />

        <Box asChild flexGrow="1">
          <Text truncate>{label}</Text>
        </Box>

        <Badge variant="soft" color="gray">
          {count}
        </Badge>
      </label>
    </Flex>
  );
};
