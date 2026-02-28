import { Text, VisuallyHidden } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC } from "react";

type EntryAuthorProps = {
  author: string | null;
  dialect: string | null;
};

export const EntryAuthor: FC<EntryAuthorProps> = (props) => {
  const { author, dialect } = props;

  const t = useTranslations("/components/Entry/EntryAuthor");

  if (author && dialect) {
    <Text color="gray" size="2">
      {t.rich("author_with_dialect", {
        author,
        dialect,
        vh: (chunks) => <VisuallyHidden>{chunks}</VisuallyHidden>,
      })}
    </Text>;
  }

  if (author) {
    return (
      <Text color="gray" size="2">
        {t.rich("author", {
          author,
          vh: (chunks) => <VisuallyHidden>{chunks}</VisuallyHidden>,
        })}
      </Text>
    );
  }

  if (dialect) {
    return (
      <Text color="gray" size="2">
        {t.rich("dialect", {
          dialect,
          vh: (chunks) => <VisuallyHidden>{chunks}</VisuallyHidden>,
        })}
      </Text>
    );
  }

  return null;
};
