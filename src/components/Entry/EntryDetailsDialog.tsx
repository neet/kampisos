import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Badge,
  DataList,
  Dialog,
  IconButton,
  Link,
  Text,
  VisuallyHidden,
} from "@radix-ui/themes";
import { FC } from "react";

export type EntryDetailsDialogProps = {
  book: string;
  title: string;
  author: string | null;
  dialect: string | null;
  url: string;
};

export const EntryDetailsDialog: FC<EntryDetailsDialogProps> = (props) => {
  const { book, title, author, dialect, url } = props;

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton variant="ghost" color="gray">
          <DotsHorizontalIcon />
          <VisuallyHidden>詳細</VisuallyHidden>
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>詳細</Dialog.Title>
        <Dialog.Description>
          <Text color="gray">
            この資料の詳細情報です。一部不正確な情報が含まれる可能性があります。
          </Text>
        </Dialog.Description>

        <DataList.Root mt="4">
          <DataList.Item>
            <DataList.Label>出典</DataList.Label>
            <DataList.Value>{book}</DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>タイトル</DataList.Label>
            <DataList.Value>{title}</DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>著者</DataList.Label>
            <DataList.Value>{author}</DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>方言</DataList.Label>
            <DataList.Value>
              <Badge>{dialect}</Badge>
            </DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>URL</DataList.Label>
            <DataList.Value>
              <Link href={url} target="_blank" rel="noreferrer">
                {url}
              </Link>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};
