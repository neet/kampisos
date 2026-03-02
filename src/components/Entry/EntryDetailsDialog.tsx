import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Code,
  DataList,
  Dialog,
  IconButton,
  Link,
  Text,
  VisuallyHidden,
} from "@radix-ui/themes";
import { FC } from "react";
import dayjs from "dayjs";

import { formatDateOrRange } from "@/utils/timestamp";
import { toHref } from "@/utils/uri";
import { useLocale, useTranslations } from "next-intl";

import { Hierarchy } from "../Hierarchy/Hierarchy";

const NoData = () => {
  const t = useTranslations("/components/Entry/EntryDetailsDialog");
  return <Text color="gray">{t("no_data")}</Text>;
};

export type EntryDetailsDialogProps = {
  objectID: string;
  document: string;
  collectionLv1: string | null;
  collectionLv2: string | null;
  collectionLv3: string | null;
  author: string | null;
  dialect: string | null;
  dialectLv1: string[] | null;
  dialectLv2: string[] | null;
  dialectLv3: string[] | null;
  uri: string | null;
  recordedAt: string | null;
  publishedAt: string | null;
};

export const EntryDetailsDialog: FC<EntryDetailsDialogProps> = (props) => {
  const {
    objectID,
    collectionLv1,
    collectionLv2,
    collectionLv3,
    document,
    author,
    dialect,
    uri,
    recordedAt,
    publishedAt,
  } = props;

  const locale = useLocale();
  const t = useTranslations("/components/Entry/EntryDetailsDialog");
  const href = uri ? toHref(uri) : null;

  dayjs.locale(locale);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton variant="ghost" color="gray">
          <DotsHorizontalIcon />
          <VisuallyHidden>{t("title")}</VisuallyHidden>
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>{t("title")}</Dialog.Title>
        <Dialog.Description>{t("description")}</Dialog.Description>

        <DataList.Root mt="4">
          <DataList.Item>
            <DataList.Label>ID</DataList.Label>
            <DataList.Value>
              <Code>{objectID}</Code>
            </DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>{t("collection")}</DataList.Label>
            <DataList.Value>
              {collectionLv3 || collectionLv2 || collectionLv1 ? (
                <Hierarchy>
                  {collectionLv3 ?? collectionLv2 ?? collectionLv1}
                </Hierarchy>
              ) : (
                <NoData />
              )}
            </DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>{t("document")}</DataList.Label>
            <DataList.Value>{document}</DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>{t("author")}</DataList.Label>
            <DataList.Value>{author ?? <NoData />}</DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>{t("dialect")}</DataList.Label>
            <DataList.Value>
              {dialect ? <Badge>{dialect}</Badge> : <NoData />}
            </DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>{t("recorded_at")}</DataList.Label>
            <DataList.Value>
              {recordedAt ? formatDateOrRange(recordedAt, "LL") : <NoData />}
            </DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>{t("published_at")}</DataList.Label>
            <DataList.Value>
              {publishedAt ? formatDateOrRange(publishedAt, "LL") : <NoData />}
            </DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>URI</DataList.Label>
            <DataList.Value>
              {href && (
                <Link href={href} target="_blank" rel="noreferrer">
                  {uri}
                </Link>
              )}
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};
