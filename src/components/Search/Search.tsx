"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Spinner, TextField, VisuallyHidden } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { FC, useTransition } from "react";

export type SearchProps = {
  defaultValue?: string;
};

export const Search: FC<SearchProps> = (props) => {
  const { defaultValue } = props;

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
    <form id="search" method="GET" action="/search" onSubmit={handleSubmit}>
      <VisuallyHidden asChild>
        <label htmlFor="search-input">キーワード</label>
      </VisuallyHidden>

      <TextField.Root
        id="search-input"
        type="text"
        name="q"
        defaultValue={defaultValue}
        required
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        spellCheck="false"
        size="3"
      >
        <TextField.Slot>
          <MagnifyingGlassIcon />
        </TextField.Slot>

        {isPending && (
          <TextField.Slot>
            <Spinner />
          </TextField.Slot>
        )}
      </TextField.Root>
    </form>
  );
};
