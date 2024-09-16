import clsx from "clsx";
import { FC, ReactNode } from "react";

import { parse } from "@/utils/parse";

export type EntryProps = {
  text: string;
  translation: string;
  book: string;
  title: string;
  url: string;
  author: string | null;
  dialect: string | null;
};

export const Entry: React.FC<EntryProps> = (props) => {
  const { text, translation, book, title, url, author, dialect } = props;

  return (
    <div>
      <div className="flex gap-2 flex-col md:flex-row md:gap-4">
        <div className="flex-1">{parse(text)}</div>
        <div className="flex-1">{parse(translation)}</div>
      </div>

      <div className="mt-2 flex justify-between items-center">
        <div className="min-w-0 shrink grow-0">
          <p className="text-zinc-600 dark:text-zinc-400 truncate text-xs w-full block">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              {book}『{title}』
            </a>
          </p>
        </div>

        <div className={"shrink-0 grow flex gap-2 justify-end"}>
          {author && <Tag>{author}</Tag>}
          {dialect && <Tag>{dialect}</Tag>}
        </div>
      </div>
    </div>
  );
};

export const EntrySkeleton: FC = () => {
  return (
    <div>
      <div className="flex gap-2 flex-col md:flex-row md:gap-4">
        <div className="flex-1 space-y-1">
          <div className="w-1/3 h-[1lh] bg-zinc-100 dark:bg-zinc-900 rounded animate-pulse" />
          <div className="w-1/2 h-[1lh] bg-zinc-100 dark:bg-zinc-900 rounded animate-pulse" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="w-1/3 h-[1lh] bg-zinc-100 dark:bg-zinc-900 rounded animate-pulse" />
          <div className="w-2/3 h-[1lh] bg-zinc-100 dark:bg-zinc-900 rounded animate-pulse" />
        </div>
      </div>

      <div className="mt-2 flex justify-between items-center">
        <div className="shrink-0 grow flex gap-2 justify-end">
          <div className="w-1/4 h-3 bg-zinc-100 dark:bg-zinc-900 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const Tag: FC<{ children: ReactNode }> = ({ children }) => (
  <div
    className={clsx(
      "px-2.5 py-0.5",
      "border rounded-full",
      "text-sm",
      "text-zinc-600 dark:text-zinc-400",
      "border-zinc-300 bg-zinc-100",
      "dark:border-zinc-700 dark:bg-zinc-900",
    )}
  >
    {children}
  </div>
);
