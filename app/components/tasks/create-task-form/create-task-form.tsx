import {
  Box,
  Input,
  Label,
  Option,
  Select,
  TextArea,
} from "@twilio-paste/core";
import { InverseCard } from "~/components/ui/inverse-card";
import { CreateTasksButton } from "../create-tasks-button/create-tasks-button";
import type { Margin } from "@twilio-paste/style-props";
import { gutters } from "~/constants/gutters";
import { InputWithLabels } from "~/components/form/input-with-labels/input-with-label";

const formBoxPadding: Margin = [
  gutters.smBreakpoint.md,
  gutters.mdBreakpoint.md,
  gutters.lgBreakpoint.md,
];

export const CreateTaskForm = () => (
  <Box>
    <InverseCard>
      <Box marginBottom={formBoxPadding}>
        <InputWithLabels inputId="task_title" inputLabel={"Task Title"} />
      </Box>
      <Box marginBottom={formBoxPadding}>
        <Label htmlFor="task_notes" required>
          Task Notes
        </Label>
        <TextArea id="task_title" name="task_title" onChange={() => {}} />
      </Box>
      <Box marginBottom={formBoxPadding}>
        <InputWithLabels inputId="task_labels" inputLabel={"Labels"} />
      </Box>
      <Box marginBottom={formBoxPadding}>
        <Label htmlFor="task_labels" required>
          Lavel of Effort
        </Label>
        <Select id="task_labels" name="task_labels">
          <Option value="sm">Small</Option>
          <Option value="md">Medium</Option>
          <Option value="lg">Large</Option>
        </Select>
      </Box>
      <Box marginBottom={formBoxPadding}>
        <InputWithLabels
          inputId="estimated_cost"
          inputLabel={"Estimated Cost"}
        />
      </Box>
      <Box display={"flex"} justifyContent={"right"}>
        <CreateTasksButton onClick={() => {}} />
      </Box>
    </InverseCard>
  </Box>
);
