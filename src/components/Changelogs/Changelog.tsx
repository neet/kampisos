import { FC } from "react";

import * as t from "../../models/changelog";

export type ChangelogProps = {
  changelog: t.Changelog;
};

export const Changelog: FC<ChangelogProps> = (props) => {
  const { changelog } = props;

  const formattedDate = new Date(changelog.publishedAt).toLocaleDateString(
    "ja-JP",
  );

  return (
    <div className="flex gap-3 text-sm">
      <time className="font-mono text-zinc-600 dark:text-zinc-400">
        {formattedDate}
      </time>
      <p>{changelog.content}</p>
    </div>
  );
};
