import "./style.css";

import { Container, Flex, Link as RadixLink } from "@radix-ui/themes";
import Link from "next/link";
import { FC } from "react";

export const Banner: FC = () => {
  return (
    <header className="banner">
      <Container size="4" p="3">
        <Flex justify="between" align="center">
          <Link href="/">
            <h1>Kampisos</h1>
          </Link>

          <RadixLink asChild>
            <Link href="/about">使い方</Link>
          </RadixLink>
        </Flex>
      </Container>
    </header>
  );
};
