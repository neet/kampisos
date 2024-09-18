import { FC } from "react";
import { FiExternalLink, FiMapPin, FiUser } from "react-icons/fi";

import { parse } from "@/utils/parse";

import { Tag } from "../Tag";
import { EntryDetailsButton } from "./EntryDetailsButton";

export type EntryProps = {
  text: string;
  textHTML: string;
  translation: string;
  translationHTML: string;
  book: string;
  title: string;
  url: string;
  author: string | null;
  dialect: string | null;
};

export const Entry: React.FC<EntryProps> = (props) => {
  const {
    text,
    translation,
    textHTML,
    translationHTML,
    book,
    title,
    url,
    author,
    dialect,
  } = props;

  return (
    <div>
      <div className="flex gap-2 flex-col md:flex-row md:gap-4">
        <div className="flex-1" lang="ain">
          {parse(textHTML)}
        </div>
        <div className="flex-1" lang="ja">
          {parse(translationHTML)}
        </div>
      </div>

      <div className="mt-2 flex justify-between items-center">
        <div className="min-w-0 shrink grow-0">
          <p className="text-zinc-600 dark:text-zinc-400 truncate text-xs w-full block">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              <span className="sr-only">出典：</span>
              {book}『{title}』
              <FiExternalLink
                aria-hidden
                className="inline-block size-3 mr-1 align-baseline"
              />
            </a>
          </p>
        </div>

        <div className={"shrink-0 grow flex gap-4 justify-end"}>
          {author && <Tag icon={<FiUser aria-label="著者" />}>{author}</Tag>}

          {dialect && (
            <Tag icon={<FiMapPin aria-label="方言" />}>{dialect}</Tag>
          )}

          <EntryDetailsButton
            text={text}
            translation={translation}
            book={book}
            title={title}
            url={url}
            author={author}
            dialect={dialect}
          />
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
          <div className="w-1/3 h-[1lh] bg-zinc-100 dark:bg-zinc-900 forced-colors:bg-[GrayText] rounded animate-pulse" />
          <div className="w-1/2 h-[1lh] bg-zinc-100 dark:bg-zinc-900 forced-colors:bg-[GrayText] rounded animate-pulse" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="w-1/3 h-[1lh] bg-zinc-100 dark:bg-zinc-900 forced-colors:bg-[GrayText] rounded animate-pulse" />
          <div className="w-2/3 h-[1lh] bg-zinc-100 dark:bg-zinc-900 forced-colors:bg-[GrayText] rounded animate-pulse" />
        </div>
      </div>

      <div className="mt-2 flex justify-between items-center">
        <div className="shrink-0 grow flex gap-2 justify-end">
          <div className="w-1/4 text-sm h-[1lh] bg-zinc-100 dark:bg-zinc-900 forced-colors:bg-[GrayText] rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};
