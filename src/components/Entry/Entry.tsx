import "./style.css";

import {
  ExternalLinkIcon,
  PersonIcon,
  SewingPinIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Flex,
  Link,
  Skeleton,
  Text,
  VisuallyHidden,
} from "@radix-ui/themes";
import { FC } from "react";

import { parse } from "@/utils/parse";

import { Tag } from "../Tag";
import { EntryDetailsDialog } from "./EntryDetailsDialog";

export type EntryRootProps = {
  objectID: string;
  text: string;
  textHTML: string;
  translation: string;
  translationHTML: string;
  book: string;
  title: string;
  url: string;
  author: string | null;
  dialect: string | null;
};

const EntryRoot: React.FC<EntryRootProps> = (props) => {
  const {
    objectID,
    textHTML,
    translationHTML,
    book,
    title,
    url,
    author,
    dialect,
  } = props;

  return (
    <div className="entry">
      <Flex gap="2" direction={{ initial: "column", md: "row" }}>
        <Box flexGrow="1" flexShrink="1" flexBasis="100%" asChild>
          <Text asChild>
            <blockquote lang="ain">{parse(textHTML)}</blockquote>
          </Text>
        </Box>
        <Box flexGrow="1" flexShrink="1" flexBasis="100%" asChild>
          <Text asChild>
            <blockquote lang="ja">{parse(translationHTML)}</blockquote>
          </Text>
        </Box>
      </Flex>

      <Flex gap="2" justify="between" align="center" mt="1">
        <Box flexGrow="0" flexShrink="1" minWidth="0px" asChild>
          <Link
            href={url}
            target="_blank"
            rel="nofollow"
            truncate
            size="2"
            color="gray"
          >
            <VisuallyHidden>出典：</VisuallyHidden>
            <cite>{book}</cite>
            <Box display="inline-block" ml="1">
              <ExternalLinkIcon aria-hidden />
            </Box>
          </Link>
        </Box>

        <Flex gap="3" flexGrow="1" flexShrink="0" justify="end" align="center">
          {author && (
            <Box flexGrow="1" flexShrink="0" asChild>
              <Tag icon={<PersonIcon aria-label="著者" />}>{author}</Tag>
            </Box>
          )}

          {dialect && (
            <Box flexGrow="1" flexShrink="0" asChild>
              <Tag icon={<SewingPinIcon aria-label="方言" />}>{dialect}</Tag>
            </Box>
          )}

          <EntryDetailsDialog
            objectID={objectID}
            book={book}
            title={title}
            author={author}
            dialect={dialect}
            url={url}
          />
        </Flex>
      </Flex>
    </div>
  );
};

const EntrySkeleton: FC = () => {
  return (
    <div>
      <Flex gap="2" direction={{ initial: "column", md: "row" }}>
        <Box flexGrow="1" flexShrink="1" flexBasis="100%" asChild>
          <Skeleton>
            <Text>irankarapte tanto sirpirka wa!</Text>
          </Skeleton>
        </Box>
        <Box flexGrow="1" flexShrink="1" flexBasis="100%" asChild>
          <Skeleton>
            <Text>こんにちは。今日は天気がいいですね！</Text>
          </Skeleton>
        </Box>
      </Flex>

      <Flex gap="2" justify="between" align="center" mt="1">
        <div>
          <Skeleton>
            <Link size="2">アイヌ語アーカイブ</Link>
          </Skeleton>
        </div>
      </Flex>
    </div>
  );
};

export const Entry = {
  Root: EntryRoot,
  Skeleton: EntrySkeleton,
};
