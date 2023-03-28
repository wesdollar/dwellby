import { DarkTheme } from "@twilio-paste/core/theme";

const inverseText = DarkTheme.backgroundColors.colorBackground;

export const colors = {
  brandPrimary: "#5817BD",
  text: {
    white: DarkTheme.backgroundColors.colorBackgroundStrongest,
    black: inverseText,
    primaryText: DarkTheme.textColors.colorText,
    primaryTextInverse: inverseText,
    secondaryText: DarkTheme.textColors.colorTextBrandHighlight,
  },
  border: {
    error: DarkTheme.borderColors.colorBorderError,
  },
  background: {
    body: DarkTheme.backgroundColors.colorBackgroundBody,
    inverse: DarkTheme.backgroundColors.colorBackgroundStrongest,
    success: DarkTheme.backgroundColors.colorBackgroundSuccess,
    error: DarkTheme.backgroundColors.colorBackgroundError,
  },
};
