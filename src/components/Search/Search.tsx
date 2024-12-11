"use client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FC, useTransition } from "react";
import { FiLoader, FiSearch } from "react-icons/fi";
import { tv } from "tailwind-variants";

const search = tv({
  slots: {
    wrapper: [
      "flex items-center",
      "rounded-lg",
      "border border-zinc-300 dark:border-zinc-600",
      "dark:bg-black dark:text-white",
      "bg-white dark:bg-black",
      "forced-colors:border forced-colors:border-[BannerBorder]",
      "focus-within:outline outline-2 outline-emerald-600 dark:outline-emerald-400",
      "max-w-screen-sm",
    ],
    icon: "block mx-2",
    textarea: ["h-full w-full bg-transparent", "focus:outline-none"],
  },
  variants: {
    size: {
      sm: {},
      md: {
        icon: ["text-lg", "mx-3"],
        textarea: ["text-lg", "py-2 px-3", "pr-0"],
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SearchProps = {
  className?: string;
  size?: "sm" | "md";
  defaultValue?: string;
};

export const Search: FC<SearchProps> = (props) => {
  const { className, size, defaultValue } = props;

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

  const { wrapper, textarea, icon } = search({ size });

  return (
    <form
      id="search"
      method="GET"
      action="/search"
      className={clsx(wrapper(), className)}
      onSubmit={handleSubmit}
    >
      <input
        id="search-input"
        type="text"
        name="q"
        defaultValue={defaultValue}
        className={textarea()}
        required
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        spellCheck="false"
      />

      <label htmlFor="search-input" className={icon()}>
        {isPending ? (
          <FiLoader
            className="text-zinc-600 dark:text-zinc-400 animate-spin"
            aria-hidden
          />
        ) : (
          <FiSearch className="text-zinc-600 dark:text-zinc-400" aria-hidden />
        )}
        <span className="sr-only">キーワード</span>
      </label>
    </form>
  );
};
