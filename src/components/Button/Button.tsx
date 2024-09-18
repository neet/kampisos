import clsx from "clsx";
import { ComponentPropsWithoutRef, FC, ReactNode } from "react";

export type ButtonProps = {
  variant?: "primary" | "secondary";
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

export const Button: FC<ButtonProps> = (props) => {
  const { variant = "primary", children, ...rest } = props;

  if (variant === "primary") {
    return (
      <button
        className={clsx(
          "px-3 py-2",
          "rounded-lg",
          "bg-black text-white",
          "disabled:bg-zinc-600",
          "dark:bg-white dark:text-black",
          "dark:disabled:bg-zinc-200",
          "forced-colors:border forced-colors:border-[ButtonBorder]",
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }

  if (variant === "secondary") {
    return (
      <button
        className={clsx(
          "px-3 py-2",
          "rounded-lg",
          "border border-black text-black",
          "dark:border-white dark:text-white",
          "forced-colors:border forced-colors:border-[ButtonBorder]",
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
};
