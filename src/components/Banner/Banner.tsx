"use client";

import "./style.css";

import { Box, Container, Flex, Link as RadixLink } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { useSearchParams } from "next/navigation";

import { Link } from "@/i18n/navigation";

import { Search } from "../Search";

export const Banner: FC = () => {
  const t = useTranslations("/components/Banner/Banner");
  const searchParams = useSearchParams();

  return (
    <header className="banner">
      <Container size="4" p="3">
        <Flex justify="between" align="center" gap="5">
          <Box>
            <Link href="/">
              <h1>Kampisos</h1>
            </Link>
          </Box>

          <Box flexGrow="1" maxWidth="600px">
            <Search defaultValue={searchParams.get("q") ?? undefined} />
          </Box>

          <Box>
            <RadixLink asChild>
              <Link href="/about">{t("about")}</Link>
            </RadixLink>
          </Box>
        </Flex>
      </Container>
    </header>
  );
};
