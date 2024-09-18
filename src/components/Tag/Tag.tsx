import clsx from "clsx";
import { FC, ReactNode } from "react";

export type TagProps = {
  children: ReactNode;
  icon?: ReactNode;
};

export const Tag: FC<TagProps> = (props) => {
  const { icon, children } = props;

  return (
    <div
      className={clsx(
        "flex items-center gap-1",
        "text-sm",
        "text-zinc-600 dark:text-zinc-400",
      )}
    >
      {icon && <div>{icon}</div>}
      {children}
    </div>
  );
};
