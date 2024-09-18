"use client";

import { FC } from "react";
import { useFormStatus } from "react-dom";

import { ReviseResult } from "@/app/search/actions";

import { Button } from "../Button";
import { TextField } from "../TextField";

export type EntryDetailsEditorProps = {
  text: string;
  translation: string;
  book: string;
  title: string;
  url: string;
  dialect?: string;
  author?: string;

  formState: ReviseResult;
  formAction: (fd: FormData) => void;
  onDiscard: () => void;
};

export const EntryDetailsEditor: FC<EntryDetailsEditorProps> = (props) => {
  const {
    text,
    translation,
    book,
    title,
    url,
    dialect,
    author,
    formState,
    formAction,
    onDiscard,
  } = props;

  return (
    <form action={formAction}>
      {formState.type === "error" && (
        <div role="alert" className="mt-2 text-red-600 dark:text-red-400">
          {formState.message}
        </div>
      )}

      <div className="mt-4 grid grid-cols-[65px,auto] gap-x-4 gap-y-2">
        <label htmlFor="text" className="text-zinc-600 dark:text-zinc-400">
          テキスト
        </label>
        <TextField
          id="text"
          as="textarea"
          name="text"
          defaultValue={text}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          required
        />

        <label
          htmlFor="translation"
          className="text-zinc-600 dark:text-zinc-400"
        >
          翻訳
        </label>
        <TextField
          id="translation"
          as="textarea"
          name="translation"
          defaultValue={translation}
          required
        />

        <label htmlFor="book" className="text-zinc-600 dark:text-zinc-400">
          書籍名
        </label>
        <TextField
          id="book"
          type="text"
          name="book"
          defaultValue={book}
          readOnly
        />

        <label htmlFor="title" className="text-zinc-600 dark:text-zinc-400">
          タイトル
        </label>
        <TextField
          id="title"
          type="text"
          name="title"
          defaultValue={title}
          readOnly
        />

        <label htmlFor="url" className="text-zinc-600 dark:text-zinc-400">
          URL
        </label>
        <TextField id="url" type="url" name="url" defaultValue={url} readOnly />

        <label htmlFor="author" className="text-zinc-600 dark:text-zinc-400">
          著者
        </label>
        <TextField
          id="author"
          type="text"
          name="author"
          defaultValue={author ?? ""}
          readOnly
        />

        <label htmlFor="dialect" className="text-zinc-600 dark:text-zinc-400">
          方言
        </label>
        <TextField
          id="dialect"
          type="text"
          name="dialect"
          defaultValue={dialect ?? ""}
          readOnly
        />
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Button variant="secondary" onClick={onDiscard}>
          キャンセル
        </Button>

        <SubmitButton />
      </div>
    </form>
  );
};

const SubmitButton: FC = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "送信中..." : "送信"}
    </Button>
  );
};
