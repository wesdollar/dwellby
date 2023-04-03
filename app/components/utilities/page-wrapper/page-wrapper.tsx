import { Box } from "@twilio-paste/core";
import type { Margin } from "@twilio-paste/style-props";

interface PageWrapperProps {
  children: React.ReactNode;
}

const marginWrapper = ["space40", "space40", "space100"] as Margin;

export const PageWrapper = ({ children }: PageWrapperProps) => (
  <Box marginLeft={marginWrapper} marginRight={marginWrapper}>
    {children}
  </Box>
);
