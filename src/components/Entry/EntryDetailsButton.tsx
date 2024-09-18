"use client";

import clsx from "clsx";
import { FC, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { FiMoreHorizontal } from "react-icons/fi";

import { ReviseAction } from "@/app/search/actions";

import { Dialog } from "../Dialog";
import { EntryDetailsEditor } from "./EntryDetailsEditor";
import { EntryDetailsViewer } from "./EntryDetailsViewer";

export type EntryDetailsButtonProps = {
  text: string;
  translation: string;
  book: string;
  title: string;
  url: string;
  author?: string;
  dialect?: string;
  action: ReviseAction;
};

export const EntryDetailsButton: FC<EntryDetailsButtonProps> = (props) => {
  const { text, translation, book, title, url, author, dialect, action } =
    props;

  const [formState, formAction] = useFormState(action, {
    type: "unsent",
  });

  const ref = useRef<HTMLDialogElement>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (formState.type === "ok") {
      setEditing(false);
    }
  }, [formState.type]);

  const handleClick = () => {
    if (ref.current) {
      ref.current.showModal();
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleDiscard = () => {
    setEditing(false);
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

        {!editing && (
          <EntryDetailsViewer
            text={text}
            translation={translation}
            book={book}
            title={title}
            url={url}
            author={author}
            dialect={dialect}
            formState={formState}
            onEdit={handleEdit}
            onClose={handleClose}
          />
        )}

        {editing && (
          <EntryDetailsEditor
            text={text}
            translation={translation}
            book={book}
            title={title}
            url={url}
            author={author}
            dialect={dialect}
            formAction={formAction}
            formState={formState}
            onDiscard={handleDiscard}
          />
        )}
      </Dialog>
    </>
  );
};
