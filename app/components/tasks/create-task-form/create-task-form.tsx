import type { FormEvent } from "react";
import {
  Box,
  Button,
  FormActions,
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
import { Form } from "@remix-run/react";

const formBoxPadding: Margin = [
  gutters.smBreakpoint.md,
  gutters.mdBreakpoint.md,
  gutters.lgBreakpoint.md,
];

export const CreateTaskForm = () => {
  const taskNotesTextareaId = "task_notes";

  return (
    <Form method={"post"}>
      <Box>
        <InverseCard>
          <Box marginBottom={formBoxPadding}>
            <InputWithLabels inputId="task_title" inputLabel={"Task Title"} />
          </Box>
          <Box marginBottom={formBoxPadding}>
            <Label htmlFor="task_notes" required>
              Task Notes
            </Label>
            <TextArea
              id={taskNotesTextareaId}
              name={taskNotesTextareaId}
              onChange={() => {}}
            />
          </Box>
          <Box marginBottom={formBoxPadding}>
            <InputWithLabels
              inputId="task_labels"
              inputLabel={"Labels"}
              value="1"
            />
          </Box>
          <Box marginBottom={formBoxPadding}>
            <Label htmlFor="task_effort" required>
              Lavel of Effort
            </Label>
            <Select id="task_effort" name="effortId">
              <Option value="1">Small</Option>
              <Option value="2">Medium</Option>
              <Option value="3">Large</Option>
            </Select>
          </Box>
          <Box marginBottom={formBoxPadding}>
            <InputWithLabels
              inputId="estimated_cost"
              inputLabel={"Estimated Cost"}
            />
          </Box>
          <Box display={"flex"} justifyContent={"right"}>
            <FormActions>
              <Button variant="primary" type="submit">
                Create Tasks
              </Button>
            </FormActions>
          </Box>
        </InverseCard>
      </Box>
    </Form>
  );
};
