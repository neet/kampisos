"use client";

import {
  Button,
  Code,
  Container,
  Heading,
  Section,
  Separator,
  Text,
} from "@radix-ui/themes";

export type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error(props: ErrorProps) {
  const { error, reset } = props;

  return (
    <Container size="2" m="3">
      <main>
        <Section size="2">
          <Heading as="h2" size={{ initial: "7", sm: "8" }} weight="bold">
            予期せぬエラーが発生しました
          </Heading>

          <Separator size="4" my="4" />

          <Text color="gray" mt="2" asChild>
            <p>
              予期せぬエラーが発生しました。お手数ですが，時間をおいて再度お試しください。
            </p>
          </Text>

          <Text color="gray" mt="2" asChild>
            <p>
              このエラーは、月間・時間あたりのリクエスト数の制限に達した場合にも表示されることがあります。
            </p>
          </Text>

          <Text color="gray" mt="2" asChild>
            <Code asChild>
              <pre>
                {JSON.stringify(
                  {
                    digest: error.digest,
                  },
                  null,
                  2,
                )}
              </pre>
            </Code>
          </Text>

          <Button onClick={reset} mt="4">
            リロード
          </Button>
        </Section>
      </main>
    </Container>
  );
}
