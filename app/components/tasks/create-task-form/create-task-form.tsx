import {
  Box,
  Button,
  FormActions,
  FormPillGroup,
  Label,
  Option,
  Select,
  TextArea,
  useFormPillState,
} from "@twilio-paste/core";
import { InverseCard } from "~/components/ui/inverse-card/inverse-card";
import type { Margin } from "@twilio-paste/style-props";
import { gutters } from "~/constants/gutters";
import { InputWithLabels } from "~/components/form/input-with-labels/input-with-label";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { FormPill } from "~/components/form/form-pill/form-pill";
import { FormPill as PasteFormPill } from "@twilio-paste/core";
import type { FormPillId } from "~/components/form/form-pill/form-pill";

const formBoxPadding: Margin = [
  gutters.smBreakpoint.md,
  gutters.mdBreakpoint.md,
  gutters.lgBreakpoint.md,
];

export const CreateTaskForm = () => {
  const taskNotesTextareaId = "task_notes";
  const [labels, setLabels] = useState<string[]>([]);
  const pillState = useFormPillState();

  return (
    <Form method="post">
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
              labels={labels}
              inputId="task_labels"
              inputLabel={"Labels"}
            />
            <FormPillGroup {...pillState} aria-label="hello-world">
              <PasteFormPill {...pillState} key={`label-${"hello"}`}>
                {"hello"}
              </PasteFormPill>
            </FormPillGroup>
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
