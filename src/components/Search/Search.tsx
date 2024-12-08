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
      "forced-colors:border forced-colors:border-[BannerBorder]",
      "focus-within:outline outline-2 outline-blue-600 dark:outline-blue-400",
      "max-w-screen-sm",
    ],
    icon: "block mx-2",
    textarea: [
      "h-full w-full bg-transparent",
      "text-zinc-600 focus:text-black dark:text-zinc-400 dark:focus:text-zinc-400",
      "focus:outline-none",
    ],
  },
  variants: {
    size: {
      sm: {},
      md: {
        icon: ["text-lg", "mx-3"],
        textarea: ["text-lg", "p-2", "pl-0"],
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
      <label htmlFor="search-input" className={icon()}>
        {isPending ? (
          <FiLoader className="animate-spin" aria-hidden />
        ) : (
          <FiSearch className="text-zinc-600 dark:text-zinc-400" aria-hidden />
        )}
        <span className="sr-only">キーワード</span>
      </label>

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
    </form>
  );
};
