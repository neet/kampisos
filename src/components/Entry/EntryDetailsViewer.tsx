import React, { FC } from "react";
import { FiExternalLink } from "react-icons/fi";

import { Button } from "../Button";

export type EntryDetailsViewerProps = {
  text: string;
  translation: string;
  book: string;
  title: string;
  url: string;
  author?: string;
  dialect?: string;
  onClose: () => void;
};

export const EntryDetailsViewer: FC<EntryDetailsViewerProps> = (props) => {
  const { text, translation, book, title, url, author, dialect, onClose } =
    props;

  return (
    <div>
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

      <div className="mt-4 flex justify-end gap-2 items-center">
        <Button onClick={onClose}>閉じる</Button>
      </div>
    </div>
  );
};
