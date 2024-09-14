import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";

export const Banner: FC = () => {
  return (
    <header
      className={clsx(
        "sticky top-0",
        "bg-white/80 backdrop-blur",
        // "border-b border-zinc-200",
        "shadow-sm",
      )}
    >
      <div className={clsx("box-border", "p-4", "lg:max-w-screen-lg mx-auto")}>
        <Link href="/">
          <h1 className="text-lg font-bold hover:underline">
            アイヌ語コーパス横断検索
          </h1>
        </Link>
      </div>
    </header>
  );
};
