import { Box } from "@twilio-paste/core";
import { styled, variant } from "@twilio-paste/styling-library";
import { colors } from "~/constants/colors";

const inverseTextColor = colors.text.black;
const inverseBackground = colors.background.inverse;

const StyledCard = styled.div(
  {
    background: colors.background.inverse,
    borderColor: "red",
    borderRadius: "8px",
    padding: "32px",
    color: colors.text.black,
    maxWidth: "100%",

    h3: {
      color: colors.text.black,
    },

    p: {
      color: colors.text.black,
      fontWeight: "bold",
    },

    label: {
      color: inverseTextColor,
    },

    input: {
      backgroundColor: inverseBackground,
      color: inverseTextColor,
    },

    textarea: {
      backgroundColor: inverseBackground,
      color: inverseTextColor,
    },

    select: {
      backgroundColor: inverseBackground,
      color: inverseTextColor,
    },
  },
  variant({
    variants: {
      padding: {
        sm: {
          padding: "16px",
        },
        md: {},
        lg: {},
      },
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

// create types for children inversecard
export interface InverseCardProps {
  children: React.ReactNode;
  variant?: string | undefined; // "success" | "error" | "brandPrimary"
  width?: string | undefined;
  padding?: string | string[] | undefined;
}

export const InverseCard = ({
  children,
  variant,
  width,
  padding,
}: InverseCardProps) => (
  <Box width={width}>
    <StyledCard variant={variant} padding={padding}>
      {children}
    </StyledCard>
  </Box>
);
