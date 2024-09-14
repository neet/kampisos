import { FC, ReactNode } from "react";

import { parse } from "@/utils/parse";

export type EntryProps = {
  text: string;
  translation: string;
  book: string;
  title: string;
  author: string | null;
  dialect: string | null;
};

export const Entry: React.FC<EntryProps> = (props) => {
  const { text, translation, book, title, author, dialect } = props;

  return (
    <div>
      <div className="flex gap-2 flex-col md:flex-row md:gap-4">
        <div className="flex-1">{parse(text)}</div>
        <div className="flex-1">{parse(translation)}</div>
      </div>

      <div className="mt-2 flex justify-between items-center">
        <div className="min-w-0 shrink grow-0">
          <p className="text-zinc-500 truncate text-sm w-full block">
            {book}『{title}』
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
          <div className="w-1/3 h-[1lh] bg-zinc-200 rounded animate-pulse" />
          <div className="w-2/3 h-[1lh] bg-zinc-200 rounded animate-pulse" />
          <div className="w-1/2 h-[1lh] bg-zinc-200 rounded animate-pulse" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="w-1/3 h-[1lh] bg-zinc-200 rounded animate-pulse" />
          <div className="w-2/3 h-[1lh] bg-zinc-200 rounded animate-pulse" />
          <div className="w-1/2 h-[1lh] bg-zinc-200 rounded animate-pulse" />
        </div>
      </div>

      <div className="mt-2 flex justify-between items-center">
        <div className="w-1/3 h-3 bg-zinc-200 rounded animate-pulse" />

        <div className="shrink-0 grow flex gap-2 justify-end">
          <div className="w-1/3 h-3 bg-zinc-200 rounded animate-pulse" />
          <div className="w-1/3 h-3 bg-zinc-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const Tag: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="border-zinc-200 border bg-zinc-100 rounded-full px-2.5 py-0.5 text-sm text-zinc-500">
    {children}
  </div>
);
