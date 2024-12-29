"use client";

import { Container, Heading, Section, Separator, Text } from "@radix-ui/themes";

export default function Error() {
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
              現在，クローラーによるアクセス数の増加に伴い，費用が増加しているため，検索機能を一時的に停止しています．
            </p>
          </Text>

          <Text color="gray" asChild mt="2">
            <p>
              当サービスを長期的に提供するため，費用を削減しつつ同様の機能を提供する方法を検討中です．お時間をおいて再度お試しください．
            </p>
          </Text>
        </Section>
      </main>
    </Container>
  );
}
