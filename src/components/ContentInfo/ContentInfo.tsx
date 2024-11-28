import { Container, Section, Text } from "@radix-ui/themes";
import { FC } from "react";

export const ContentInfo: FC = () => {
  return (
    <Container>
      <Section size="1">
        <Text size="2" color="gray" align="center" asChild>
          <p>Copyright © 2024 Ryō Igarashi. All rights reserved.</p>
        </Text>
      </Section>
    </Container>
  );
};
