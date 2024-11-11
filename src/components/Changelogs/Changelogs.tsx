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
    <div className={clsx("mt-2 space-y-1", className)}>
      {changelogs.map((changelog) => (
        <Changelog key={changelog.content} changelog={changelog} />
      ))}
    </div>
  );
};
