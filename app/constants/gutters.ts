import { DarkTheme } from "@twilio-paste/core/theme";

export const gutters = {
  smBreakpoint: {
    sm: DarkTheme.space.space10,
    md: DarkTheme.space.space20,
    lg: DarkTheme.space.space60,
  },

  mdBreakpoint: {
    sm: DarkTheme.space.space30,
    md: DarkTheme.space.space40,
    lg: DarkTheme.space.space70,
  },

  lgBreakpoint: {
    xs: DarkTheme.space.space40,
    sm: DarkTheme.space.space60,
    md: DarkTheme.space.space70,
    lg: DarkTheme.space.space100,
    xl: DarkTheme.space.space120,
  },

  utility: {
    xs: DarkTheme.space.space10,
    sm: DarkTheme.space.space40,
    md: DarkTheme.space.space80,
    lg: DarkTheme.space.space120,
    xl: DarkTheme.space.space160,
  },
} as const;
