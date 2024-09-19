import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementType, FC, ReactNode } from "react";
import { overridable } from "react-as-prop";

type ButtonProps = {
  as: ElementType;
  variant?: "primary" | "secondary";
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

const _Button: FC<ButtonProps> = (props) => {
  const {
    as: Component,
    variant = "primary",
    children,
    className,
    ...rest
  } = props;

  const classNames =
    variant === "primary"
      ? clsx(
          "px-3 py-2",
          "rounded-lg",
          "bg-black text-white",
          "disabled:bg-zinc-600",
          "dark:bg-white dark:text-black",
          "dark:disabled:bg-zinc-200",
          "forced-colors:border forced-colors:border-[ButtonBorder]",
          className,
        )
      : clsx(
          "px-3 py-2",
          "rounded-lg",
          "border border-black text-black",
          "dark:border-white dark:text-white",
          "forced-colors:border forced-colors:border-[ButtonBorder]",
          className,
        );

  return (
    <Component className={classNames} {...rest}>
      {children}
    </Component>
  );
};

export const Button = overridable(_Button, "button");
