import { Box, Input, Label } from "@twilio-paste/core";
import type { Margin } from "@twilio-paste/style-props";
import { gutters } from "~/constants/gutters";
import type { InputProps } from "@twilio-paste/input";

const formBoxPadding: Margin = [
  gutters.smBreakpoint.md,
  gutters.mdBreakpoint.md,
  gutters.lgBreakpoint.md,
];

interface InputWithLabelsProps {
  inputId: string;
  inputLabel: string;
  handleOnChange?: () => void;
  handleSetLables?: React.Dispatch<React.SetStateAction<string[]>>;
  value?: string;
  labels?: string[];
  handleSetLabels?: React.Dispatch<React.SetStateAction<string[]>>;
  type?: string;
  required?: boolean;
}

export const InputWithLabels = ({
  inputId,
  inputLabel,
  handleOnChange = () => {},
  value,
  labels = [],
  handleSetLabels = () => {},
  type = "text",
  required = false,
}: InputWithLabelsProps) => {
  return (
    <Box marginBottom={formBoxPadding}>
      <Label htmlFor={inputId} required={required}>
        {inputLabel}
      </Label>
      <Input
        id={inputId}
        name={inputId}
        type={type as InputProps["type"]}
        onChange={handleOnChange}
        value={value}
        required={required}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            console.log(`${event.key} was pressed`);
            console.log(`${event.currentTarget.value}`);

            const eventCurrentTargetValue = event.currentTarget.value;

            if (eventCurrentTargetValue) {
              handleSetLabels([...labels, eventCurrentTargetValue]);
            }

            event.currentTarget.value = "";
          }
        }}
      />
    </Box>
  );
};
