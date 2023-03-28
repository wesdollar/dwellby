import type { FormEvent } from "react";
import { Box, Label, Option, Select, TextArea } from "@twilio-paste/core";
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

interface CreateTaskFormProps {
  handleOnClick: (event: FormEvent) => void;
}

export const CreateTaskForm = () => {
  const handleOnClick = (event: FormEvent) => {
    console.log("clicked");
    console.log(event);
  };

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
            <CreateTasksButton handleOnClick={() => handleOnClick} />
          </Box>
        </InverseCard>
      </Box>
    </Form>
  );
};
