import { styled, css } from "@twilio-paste/styling-library";

interface SpacerProps {
  height?: string[];
  width?: string[];
}

const getStyledSpacer = (height: string[], width: string[]) =>
  styled.div(
    css({
      display: "block",
      width,
      height,
    })
  );

export const Spacer = ({
  height = ["0", "0", "0"],
  width = ["0", "0", "0"],
}: SpacerProps) => {
  const Custom = getStyledSpacer(height, width);

  return <Custom />;
};
