import clsx from "clsx";
import { forwardRef, ForwardRefRenderFunction, ReactNode } from "react";

export type DialogProps = {
  children: ReactNode;
};

const DialogInternal: ForwardRefRenderFunction<
  HTMLDialogElement,
  DialogProps
> = (props, ref) => {
  const { children } = props;

  return (
    <dialog
      ref={ref}
      className={clsx(
        "backdrop:backdrop-blur",
        "backdrop:bg-black/60",
        "dark:border dark:border-zinc-600",
        "p-4",
        "rounded-lg",
        "shadow",
        "w-full",
        "bg-white text-black",
        "dark:bg-black dark:text-white",
        "md:max-w-screen-sm",
      )}
    >
      {children}
    </dialog>
  );
};

// TODO: Remove when React 19 is released
export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  DialogInternal,
);
