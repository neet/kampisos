import clsx from "clsx";
import { FC, ReactNode, RefObject } from "react";

export type DialogProps = {
  id?: string;
  ref?: RefObject<HTMLDialogElement | null>;
  className?: string;
  children: ReactNode;
};

export const Dialog: FC<DialogProps> = (props) => {
  const { id, ref, className, children } = props;

  return (
    <dialog
      id={id}
      ref={ref}
      className={clsx(
        "backdrop:backdrop-blur",
        "backdrop:bg-black/60",
        "dark:border dark:border-zinc-600",
        "rounded-lg",
        "shadow",
        "w-full",
        "bg-white text-black",
        "dark:bg-black dark:text-white",
        "md:max-w-screen-sm",
        className,
      )}
    >
      {children}
    </dialog>
  );
};
