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
              このエラーは、IPアドレスごとのアクセス数の上限（100回/時）に達した場合にも表示されることがあります。解除が必要な場合は、しばらくお待ちいただくか、個別にご連絡ください。
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
