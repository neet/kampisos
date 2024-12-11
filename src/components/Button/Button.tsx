import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementType, FC, ReactNode } from "react";
import { overridable } from "react-as-prop";
import { tv } from "tailwind-variants";

const button = tv({
  base: ["flex items-center justify-center gap-1"],
  variants: {
    size: {
      md: ["px-4 py-1", "rounded-lg"],
    },
    variant: {
      primary: [
        "bg-emerald-600 text-white",
        "disabled:bg-zinc-600",
        "dark:bg-emerald-400 dark:text-black",
        "dark:disabled:bg-zinc-200",
        "forced-colors:border forced-colors:border-[ButtonBorder]",
      ],
      secondary: [
        "hover:bg-zinc-200 dark:hover:bg-zinc-800",
        "border border-zinc-300 dark:border-zinc-600",
        "dark:bg-black dark:text-white",
        "forced-colors:border forced-colors:border-[ButtonBorder]",
      ],
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

type ButtonProps = {
  as: ElementType;
  size?: "md";
  variant?: "primary" | "secondary";
  icon?: ReactNode;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"button">;

const _Button: FC<ButtonProps> = (props) => {
  const {
    as: Component,
    icon,
    size,
    variant,
    children,
    className,
    ...rest
  } = props;

  return (
    <Component className={clsx(button({ size, variant }), className)} {...rest}>
      {icon}
      {children}
    </Component>
  );
};

export const Button = overridable(_Button, "button");
