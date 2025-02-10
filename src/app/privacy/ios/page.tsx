import { Card, Container, Heading, Section } from "@radix-ui/themes";
import { Metadata } from "next";

export const revalidate = 86_400;

export function generateMetadata(): Metadata {
  return {
    title: "このサイトについて",
    description:
      "アイヌ語・日本語のキーワードを入力して複数のコーパスを検索できます",
    alternates: {
      canonical: "/about",
    },
  };
}

export default async function AboutPage() {
  const Content = (await import(`./about.mdx`)).default;

  return (
    <Container size="2" m="3" asChild>
      <main>
        <Section>
          <Heading as="h2" align="center">
            プライバシーポリシー（iOSアプリ）
          </Heading>
        </Section>

        <Card size="2">
          <article>
            <Content />
          </article>
        </Card>
      </main>
    </Container>
  );
}
