"use client";

import clsx from "clsx";
import { FC, ReactNode, useRef } from "react";
import { FiX } from "react-icons/fi";

import { Button } from "../Button";

export type DialogHeaderProps = {
  children: ReactNode;
};

export const DialogHeader: FC<DialogHeaderProps> = (props) => {
  const { children } = props;
  const ref = useRef<HTMLElement>(null);

  const handleClick = () => {
    ref.current?.closest("dialog")?.close();
  };

  return (
    <header
      ref={ref}
      className={clsx(
        "sticky top-0 left-0 bg-white/80 backdrop-blur",
        "flex items-center justify-between",
        "px-4 py-3",
      )}
    >
      <div tabIndex={0}>{children}</div>
      <Button variant="secondary" icon={<FiX />} onClick={handleClick} />
    </header>
  );
};
