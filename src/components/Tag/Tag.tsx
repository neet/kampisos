import clsx from "clsx";
import { FC, ReactNode } from "react";

export type TagProps = {
  children: ReactNode;
};

export const Tag: FC<TagProps> = (props) => {
  const { children } = props;

  return (
    <div
      className={clsx(
        "px-2.5 py-0.5",
        "border rounded-full",
        "text-sm",
        "text-zinc-600 dark:text-zinc-400",
        "border-zinc-300 bg-zinc-100",
        "dark:border-zinc-700 dark:bg-zinc-900",
      )}
    >
      {children}
    </div>
  );
};
