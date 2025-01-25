"use client";

import { Box, Flex, Heading, Skeleton } from "@radix-ui/themes";
import { FC } from "react";

import { dialects } from "./dialects";
import { DialectSelectorItem } from "./DialectSelectorItem";

export type DialectSelectorProps = {
  form?: string;
  values?: {
    dialectLv1?: string[];
    dialectLv2?: string[];
    dialectLv3?: string[];
  };
  counts?: {
    dialectLv1?: Record<string, number>;
    dialectLv2?: Record<string, number>;
    dialectLv3?: Record<string, number>;
  };
};

export const DialectSelectorRoot: FC<DialectSelectorProps> = (props) => {
  const { form, counts, values } = props;

  return (
    <Box asChild>
      <fieldset>
        <Heading asChild size="2" weight="bold" color="gray" mb="3">
          <legend>方言</legend>
        </Heading>

        <Flex direction="column">
          {dialects.map((dialect) => (
            <DialectSelectorItem.Root
              key={dialect.value}
              label={dialect.label}
              name="dialect_lv1"
              value={dialect.value}
              form={form}
              count={counts?.dialectLv1?.[dialect.value]}
              defaultChecked={values?.dialectLv1?.includes(dialect.value)}
            >
              {dialect.children?.map((child) => (
                <DialectSelectorItem.Root
                  key={child.value}
                  label={child.label}
                  name="dialect_lv2"
                  value={child.value}
                  form={form}
                  count={counts?.dialectLv2?.[child.value]}
                  defaultChecked={values?.dialectLv2?.includes(child.value)}
                >
                  {child.children?.map((grandchild) => (
                    <DialectSelectorItem.Root
                      key={grandchild.value}
                      label={grandchild.label}
                      name="dialect_lv3"
                      value={grandchild.value}
                      form={form}
                      count={counts?.dialectLv3?.[grandchild.value]}
                      defaultChecked={values?.dialectLv3?.includes(
                        grandchild.value,
                      )}
                    />
                  ))}
                </DialectSelectorItem.Root>
              ))}
            </DialectSelectorItem.Root>
          ))}
        </Flex>
      </fieldset>
    </Box>
  );
};

export const DialectSelectorSkeleton: FC = () => {
  return (
    <Box>
      <Skeleton>
        <Heading asChild size="2" weight="bold" color="gray" mb="3">
          <legend>方言</legend>
        </Heading>
      </Skeleton>

      <Flex direction="column" gap="1">
        <DialectSelectorItem.Skeleton />
        <DialectSelectorItem.Skeleton />
      </Flex>
    </Box>
  );
};
