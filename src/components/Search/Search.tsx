"use client";
import { getPathname } from "@/i18n/navigation";
import { DotsHorizontalIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  IconButton,
  Spinner,
  TextField,
  Tooltip,
  VisuallyHidden,
} from "@radix-ui/themes";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FC, useTransition } from "react";

export type SearchProps = {
  defaultValue?: string;
};

export const Search: FC<SearchProps> = (props) => {
  const { defaultValue } = props;

  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("/components/Search/Search");

  // TODO: Server Action -> redirect() にしたい
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
      id="search"
      method="GET"
      action={getPathname({ href: "/search", locale })}
      onSubmit={handleSubmit}
    >
      <VisuallyHidden asChild>
        <label htmlFor="search-input">{t("label")}</label>
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
          <MagnifyingGlassIcon aria-hidden="true" />
        </TextField.Slot>

        {isPending && (
          <TextField.Slot>
            <Spinner aria-hidden="true" />
          </TextField.Slot>
        )}
      </TextField.Root>
    </form>
  );
};
