"use client";

import { CopyIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Button,
  Code,
  DataList,
  Dialog,
  Flex,
  IconButton,
  Link,
  Text,
  Tooltip,
  VisuallyHidden,
} from "@radix-ui/themes";
import { FC, useCallback } from "react";
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

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(objectID);
    window.alert(t("copied", { content: objectID }));
  }, [objectID, t]);

  return (
    <Dialog.Root>
      <Tooltip content={t("title")}>
        <Dialog.Trigger>
          <IconButton variant="ghost" color="gray">
            <DotsHorizontalIcon aria-hidden />
          </IconButton>
        </Dialog.Trigger>
      </Tooltip>

      <Dialog.Content className="entry-details-dialog">
        <div tabIndex={0} />

        <Dialog.Title>{t("title")}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {t("description")}
        </Dialog.Description>

        <DataList.Root mb="4">
          <DataList.Item>
            <DataList.Label>ID</DataList.Label>
            <DataList.Value>
              <Flex gap="2">
                <Code variant="ghost">{objectID}</Code>

                <Tooltip content={t("copy_id")}>
                  <IconButton variant="ghost" color="gray" onClick={handleCopy}>
                    <CopyIcon />
                  </IconButton>
                </Tooltip>
              </Flex>
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

        <Flex justify="end">
          <Dialog.Close>
            <Button color="gray" variant="soft">
              {t("close")}
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
