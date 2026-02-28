import { Card, Container, Heading, Section } from "@radix-ui/themes";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const revalidate = 86_400;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("/app/[locale]/about/page");

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/about",
    },
  };
}

export default async function AboutPage() {
  const t = await getTranslations("/app/[locale]/about/page");
  const Content = (await import(`./about.mdx`)).default;

  return (
    <Container size="2" m="3" asChild>
      <main>
        <Section>
          <Heading as="h2" align="center">
            {t("title")}
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
