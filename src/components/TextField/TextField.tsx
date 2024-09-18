import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

type TextFieldTextAreaProps = {
  as: "textarea";
} & ComponentPropsWithoutRef<"textarea">;

type TextFieldInputProps = { as?: "input" } & ComponentPropsWithoutRef<"input">;

export type TextFieldProps = TextFieldTextAreaProps | TextFieldInputProps;

export const TextField = (props: TextFieldProps) => {
  const { as = "input", className, ...rest } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = as as any;

  return (
    <Component
      className={clsx(
        "block w-full",
        "border",
        "bg-white border-zinc-300",
        "dark:bg-black dark:border-zinc-700",
        "rounded",
        "p-2",
        "read-only:bg-zinc-100 read-only:text-zinc-400",
        "dark:read-only:bg-zinc-900 dark:read-only:text-zinc-600",
        className,
      )}
      {...rest}
    />
  );
};
