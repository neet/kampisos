"use client";

import clsx from "clsx";
import { FC, useRef } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

import { Dialog } from "../Dialog";
import { EntryDetailsViewer } from "./EntryDetailsViewer";

export type EntryDetailsButtonProps = {
  text: string;
  translation: string;
  book: string;
  title: string;
  url: string;
  author?: string;
  dialect?: string;
};

export const EntryDetailsButton: FC<EntryDetailsButtonProps> = (props) => {
  const { text, translation, book, title, url, author, dialect } = props;

  const ref = useRef<HTMLDialogElement>(null);

  const handleClick = () => {
    if (ref.current) {
      ref.current.showModal();
    }
  };

  const handleClose = () => {
    if (ref.current) {
      ref.current.close();
    }
  };

  return (
    <>
      <button
        className={clsx(
          "rounded-full",
          "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900",
          "transition",
        )}
        onClick={handleClick}
      >
        <FiMoreHorizontal aria-label="詳細" />
      </button>

      <Dialog ref={ref}>
        <h2 className="text-lg font-bold">詳細情報</h2>

        <EntryDetailsViewer
          text={text}
          translation={translation}
          book={book}
          title={title}
          url={url}
          author={author}
          dialect={dialect}
          onClose={handleClose}
        />
      </Dialog>
    </>
  );
};
