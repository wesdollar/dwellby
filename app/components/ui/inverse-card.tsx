import { styled, variant } from "@twilio-paste/styling-library";
import { colors } from "~/constants/colors";

const inverseTextColor = colors.text.black;
const inverseBackground = colors.background.inverse;

const CustomCard = styled.div(
  {
    background: colors.background.inverse,
    borderColor: "red",
    borderRadius: "8px",
    padding: "32px",
    color: colors.text.white,

    h3: {
      color: colors.text.white,
    },

    p: {
      color: colors.text.white,
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
}

export const InverseCard = ({ children, variant }: InverseCardProps) => {
  return <CustomCard variant={variant}>{children}</CustomCard>;
};
