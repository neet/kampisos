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

  const feedbackURL = new URL(
    "/forms/d/e/1FAIpQLSdF8BWlXRjy1uAnKQ9-740_P016PD61gMZxQ4cQVlt7Aj9r7Q/viewform",
    "https://docs.google.com",
  );

  feedbackURL.search = new URLSearchParams([
    ["usp", "pp_url"],
    ["entry.1073831692", text],
    ["entry.283613557", translation],
    ["entry.28800350", book],
    ["entry.1935383913", title],
    ["entry.1034703594", url],
    ["entry.240850099", author ?? ""],
    ["entry.1920517713", dialect ?? ""],
  ]).toString();

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
        <Button
          as="a"
          href={feedbackURL.toString()}
          target="_blank"
          rel="noreferrer"
          variant="secondary"
        >
          修正を依頼
        </Button>
        <Button onClick={onClose}>閉じる</Button>
      </div>
    </div>
  );
};
