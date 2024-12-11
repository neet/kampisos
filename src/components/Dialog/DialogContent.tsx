import clsx from "clsx";
import { FC, ReactNode } from "react";

export type DialogContentProps = {
  className?: string;
  children: ReactNode;
};

export const DialogContent: FC<DialogContentProps> = (props) => {
  const { className, children } = props;

  return <div className={clsx("px-4 pb-4", className)}>{children}</div>;
};
