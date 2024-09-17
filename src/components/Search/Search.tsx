"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FC, useTransition } from "react";

export type SearchProps = {
  className?: string;
  defaultValue?: string;
};

export const Search: FC<SearchProps> = (props) => {
  const { className, defaultValue } = props;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    startTransition(() => {
      event.preventDefault();

      const form = event.currentTarget;
      const formData = new FormData(form);
      const searchParams = new URLSearchParams();

      for (const [key, value] of Array.from(formData)) {
        if (value) {
          searchParams.append(key, value as string);
        }
      }

      const url = new URL(form.action);
      url.search = searchParams.toString();

      router.push(url.toString());
    });
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
            "bg-white border-zinc-300",
            "dark:bg-black dark:border-zinc-700",
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
            "bg-black text-white",
            "disabled:bg-zinc-600",
            "dark:bg-white dark:text-black",
            "dark:disabled:bg-zinc-200",
            "forced-colors:border forced-colors:border-[ButtonBorder]",
          )}
          type="submit"
          disabled={isPending}
        >
          {isPending ? "検索中..." : "検索"}
        </button>
      </div>
    </form>
  );
};
