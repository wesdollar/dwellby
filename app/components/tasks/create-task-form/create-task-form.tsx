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
import { FormPill as PasteFormPill } from "@twilio-paste/core";

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
            <InputWithLabels
              value="Make Bed"
              inputId="task_title"
              inputLabel={"Task Title"}
            />
          </Box>
          <Box marginBottom={formBoxPadding}>
            <Label htmlFor="task_notes" required>
              Task Notes
            </Label>
            <TextArea
              id={taskNotesTextareaId}
              name={taskNotesTextareaId}
              onChange={() => {}}
              defaultValue="These are my notes."
            />
          </Box>
          <Box marginBottom={formBoxPadding}>
            <InputWithLabels
              inputId="task_labels"
              inputLabel={"Labels"}
              handleSetLabels={setLabels}
              labels={labels}
            />
            <FormPillGroup {...pillState} aria-label="hello-world">
              {labels.map((label) => (
                <PasteFormPill
                  {...pillState}
                  key={`label-${label}`}
                  onSelect={() => {
                    console.log("onSelect");

                    const newLabels = labels.filter(
                      (currentLabel) => currentLabel !== label
                    );

                    setLabels(newLabels);
                  }}
                >
                  <Box minWidth="35px">{label}</Box>
                </PasteFormPill>
              ))}
            </FormPillGroup>
          </Box>
          <Box marginBottom={formBoxPadding}>
            <Label htmlFor="task_effort" required>
              Lavel of Effort
            </Label>
            <Select id="task_effort" name="effortId" defaultValue="1">
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
