import clsx from "clsx";
import { FC } from "react";

import * as t from "@/models/changelog";

import { Changelog } from "./Changelog";

type ChangelogsProps = {
  className?: string;
  changelogs: t.Changelog[];
};

export const Changelogs: FC<ChangelogsProps> = (props) => {
  const { className, changelogs } = props;

  return (
    <div className={clsx("mt-2", className)}>
      <h2 className="font-bold">最近の更新</h2>

      <ul className="mt-1">
        {changelogs.map((changelog) => (
          <li key={changelog.content}>
            <Changelog changelog={changelog} />
          </li>
        ))}
      </ul>
    </div>
  );
};
