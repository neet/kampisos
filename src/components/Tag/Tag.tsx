import clsx from "clsx";
import { FC, ReactNode } from "react";

export type TagProps = {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
};

export const Tag: FC<TagProps> = (props) => {
  const { icon, children, className } = props;

  return (
    <div
      className={clsx(
        "flex items-center gap-1",
        "text-xs",
        "text-zinc-600 dark:text-zinc-400",
        className,
      )}
    >
      {icon}
      {children}
    </div>
  );
};
