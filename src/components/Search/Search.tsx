"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FC } from "react";

export type SearchProps = {
  className?: string;
  defaultValue?: string;
};

export const Search: FC<SearchProps> = (props) => {
  const { className, defaultValue } = props;

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const q = formData.get("q") as string;

    const searchParams = new URLSearchParams();
    searchParams.set("q", q);

    const url = new URL(form.action);
    url.search = searchParams.toString();

    router.push(url.toString());
  };

  return (
    <form
      method="GET"
      action="/search"
      className={clsx(className)}
      onSubmit={handleSubmit}
    >
      <label htmlFor="input-q" className="sr-only">
        キーワードを入力してください
      </label>

      <div className="flex mt-1">
        <input
          id="input-q"
          type="text"
          name="q"
          className={clsx(
            "block flex-1 box-border",
            "border border-r-0",
            "border-zinc-200",
            "py-2 px-3",
            "text-lg",
            "rounded-lg rounded-r-none",
          )}
          defaultValue={defaultValue}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
        />

        <button
          className={clsx(
            "block",
            "text-lg",
            "px-4 py-2",
            "rounded-lg rounded-l-none",
            "bg-zinc-950 text-white",
          )}
          type="submit"
        >
          検索
        </button>
      </div>
    </form>
  );
};