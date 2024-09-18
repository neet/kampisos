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
        "border border-zinc-300",
        "rounded",
        "p-2",
        "read-only:bg-zinc-100 read-only:text-zinc-400",
        className,
      )}
      {...rest}
    />
  );
};
