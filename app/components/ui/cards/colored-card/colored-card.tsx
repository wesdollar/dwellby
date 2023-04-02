import { Box } from "@twilio-paste/core";
import { styled, variant } from "@twilio-paste/styling-library";
import { colors } from "~/constants/colors";
import { InverseCardProps } from "../../inverse-card/inverse-card";

const StyledCard = styled.div(
  {
    // TODO: Extract styles shared with inverse-card
    background: colors.background.inverse,
    borderColor: "red",
    borderRadius: "8px",
    padding: "32px",
    color: colors.text.black,
    maxWidth: "100%",
  },
  variant({
    variants: {
      success: {
        background: colors.background.success,
      },
      error: {
        background: colors.background.error,
      },
      brandPrimary: {
        background: colors.brandPrimary,
      },
    },
  })
);

export const ColoredCard = ({ children, variant, width }: InverseCardProps) => (
  <Box width={width}>
    <StyledCard variant={variant}>{children}</StyledCard>
  </Box>
);
