"use client";

import clsx from "clsx";
import { FC, useCallback, useRef } from "react";
import { FiExternalLink, FiMoreHorizontal } from "react-icons/fi";

import { Dialog } from "../Dialog";

export type EntryDetailsButtonProps = {
  text: string;
  translation: string;
  book: string;
  title: string;
  url: string;
  author: string | null;
  dialect: string | null;
};

export const EntryDetailsButton: FC<EntryDetailsButtonProps> = (props) => {
  const { text, translation, book, title, url, author, dialect } = props;
  const ref = useRef<HTMLDialogElement>(null);

  const handleClick = useCallback(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, []);

  const handleClose = useCallback(() => {
    if (ref.current) {
      ref.current.close();
    }
  }, []);

  return (
    <>
      <button
        className="text-zinc-500 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
        onClick={handleClick}
      >
        <FiMoreHorizontal aria-label="詳細" />
      </button>

      <Dialog ref={ref}>
        <h2 className="text-lg font-bold">詳細情報</h2>

        <dl className="mt-4 grid grid-cols-[65px,auto] gap-x-4 gap-y-2">
          <dt className="text-zinc-600 dark:text-zinc-400">テキスト</dt>
          <dd>{text}</dd>

          <dt className="text-zinc-600 dark:text-zinc-400">翻訳</dt>
          <dd>{translation}</dd>

          <dt className="text-zinc-600 dark:text-zinc-400">書籍名</dt>
          <dd>{book}</dd>

          <dt className="text-zinc-600 dark:text-zinc-400">タイトル</dt>
          <dd>{title}</dd>

          <dt className="text-zinc-600 dark:text-zinc-400">URL</dt>
          <dd className="truncate">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              {url}
              <FiExternalLink className="inline align-top" />
            </a>
          </dd>

          <dt className="text-zinc-600 dark:text-zinc-400">著者</dt>
          <dd>{author ?? "情報なし"}</dd>

          <dt className="text-zinc-600 dark:text-zinc-400">方言</dt>
          <dd>{dialect ?? "情報なし"}</dd>
        </dl>

        <div className="mt-4 flex justify-end gap-2">
          <button
            className={clsx(
              "px-3 py-2",
              "rounded-lg",
              "bg-black text-white",
              "dark:bg-white dark:text-black",
            )}
            onClick={handleClose}
          >
            閉じる
          </button>
        </div>
      </Dialog>
    </>
  );
};
