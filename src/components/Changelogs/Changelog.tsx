import clsx from "clsx";
import { FC } from "react";

import * as t from "../../models/changelog";

export type ChangelogProps = {
  changelog: t.Changelog;
};

export const Changelog: FC<ChangelogProps> = (props) => {
  const { changelog } = props;

  const rtf = new Intl.RelativeTimeFormat("ja", { numeric: "auto" });
  const date = new Date(changelog.publishedAt);

  const diff = date.getTime() - Date.now();
  const formattedDate = rtf.format(
    Math.round(diff / 1000 / 60 / 60 / 24),
    "day",
  );

  return (
    <article className="relative">
      <div className="absolute h-full left-[14px]">
        <div
          className={clsx(
            "absolute top-[8px] left-[-3px]",
            "size-[8px]",
            "bg-zinc-300 dark:bg-zinc-700 rounded-full",
          )}
        />
        <div className="h-full border-l border-zinc-300 dark:border-zinc-700" />
      </div>

      <div className="pl-8 pb-2">
        <time
          dateTime={date.toISOString()}
          className="text-zinc-600 dark:text-zinc-400"
        >
          {formattedDate}
        </time>
        <p>{changelog.content}</p>
      </div>
    </article>
  );
};
