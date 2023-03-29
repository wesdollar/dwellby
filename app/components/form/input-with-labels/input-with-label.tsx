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
  handleSetLables?: React.Dispatch<React.SetStateAction<string[]>>;
  value?: string;
  labels?: string[];
}

/* thank you for the contribution GreatGrievance!! 230329 */
interface PushLabelSelectionToState {
  event: React.KeyboardEvent<HTMLInputElement>;
  handleSetLables: React.Dispatch<React.SetStateAction<string[]>>;
  inputLabel: string;
  labels: string[];
}

const pushLabelSelectionToState = ({
  event,
  handleSetLables,
  inputLabel,
  labels,
}: PushLabelSelectionToState): void => {
  inputLabel = event.currentTarget.value;

  console.log("hit", inputLabel);

  if (handleSetLables && inputLabel) {
    handleSetLables([...labels, inputLabel]);
  }
};

export const InputWithLabels = ({
  inputId,
  inputLabel,
  handleOnChange = () => {},
  value,
  labels = [],
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
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === ",") {
            console.log(`${event.key} was pressed`);
          }
        }}
      />
    </Box>
  );
};
