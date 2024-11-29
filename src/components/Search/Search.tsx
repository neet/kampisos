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
      className={clsx("mx-auto max-w-[525px]", className)}
      onSubmit={handleSubmit}
      style={{
        viewTransitionName: "search-form",
      }}
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
            "block flex-1",
            "border border-r-0",
            "bg-white border-blue-600",
            "dark:bg-black dark:border-blue-400",
            "py-2 pl-5 pr-8",
            "text-lg",
            "rounded-full rounded-r-none",
          )}
          defaultValue={defaultValue}
          required
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
        />

        <button
          className={clsx(
            "block",
            "text-lg",
            "pl-4 pr-5 py-2",
            "rounded-full rounded-l-none",
            "bg-blue-600 text-white",
            "disabled:bg-blue-600",
            "dark:bg-blue-400 dark:text-black",
            "dark:disabled:bg-blue-200",
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
