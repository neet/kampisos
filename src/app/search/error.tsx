"use client";

import {
  Button,
  Container,
  Heading,
  Section,
  Separator,
  Text,
} from "@radix-ui/themes";

export type ErrorProps = {
  error: Error & { status?: number };
  reset: () => void;
};

export default function Error(props: ErrorProps) {
  const { error, reset } = props;

  if (error.message === "Too many requests") {
    return (
      <Container size="2" m="3">
        <main>
          <Section size="2">
            <Heading as="h2" size={{ initial: "7", sm: "8" }} weight="bold">
              一時的に制限しています
            </Heading>

            <Separator size="4" my="4" />

            <Text color="gray" asChild mt="2">
              <p>
                現在、お使いのIPアドレスからのリクエストが多すぎるため、一時的に制限しています。
              </p>
            </Text>

            <Text color="gray" asChild mt="2">
              <p>
                当サービスを長期的に提供するため、費用を削減しつつ同様の機能を提供する方法を検討中です。お時間をおいて再度お試しください。
              </p>
            </Text>

            <Button onClick={reset} mt="4">
              リロード
            </Button>
          </Section>
        </main>
      </Container>
    );
  }

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
              予期せぬエラーが発生しました。お手数ですが，時間をおいて再度お試しください．
            </p>
          </Text>

          <Button onClick={reset} mt="4">
            リロード
          </Button>
        </Section>
      </main>
    </Container>
  );
}
