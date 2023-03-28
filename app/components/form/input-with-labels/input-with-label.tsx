import { Box, Input, Label } from "@twilio-paste/core";
import type { Margin } from "@twilio-paste/style-props";
import { gutters } from "~/constants/gutters";

const formBoxPadding: Margin = [
  gutters.smBreakpoint.md,
  gutters.mdBreakpoint.md,
  gutters.lgBreakpoint.md,
];

interface InputWithLabelsProps {
  inputId: string;
  inputLabel: string;
  handleOnChange?: () => void;
  value?: string;
}

export const InputWithLabels = ({
  inputId,
  inputLabel,
  handleOnChange = () => {},
  value,
}: InputWithLabelsProps) => {
  return (
    <Box marginBottom={formBoxPadding}>
      <Label htmlFor={inputId} required>
        {inputLabel}
      </Label>
      <Input
        id={inputId}
        name={inputId}
        type="text"
        onChange={handleOnChange}
        value={value}
      />
    </Box>
  );
};
