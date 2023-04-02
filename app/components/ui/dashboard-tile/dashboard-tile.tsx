import { Box, Heading, Text } from "@twilio-paste/core";
import { ColoredCard } from "../cards/colored-card/colored-card";

interface DashboardTileProps {
  variant: string;
  title: string;
  count: number;
}

export const DashboardTile = ({
  variant,
  title,
  count,
}: DashboardTileProps) => {
  // TODO: check into marginBottom here

  return (
    <Box marginBottom={"space100"} textAlign={"center"}>
      <ColoredCard variant={variant}>
        <Heading as="h3" variant="heading50">
          {title}
        </Heading>
        <Text as="p" variant="paragraph30" color={"colorText"}>
          {count}
        </Text>
      </ColoredCard>
    </Box>
  );
};
