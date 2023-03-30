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
  FormPill as PasteFormPill,
  Grid,
  Column,
} from "@twilio-paste/core";
import { InverseCard } from "~/components/ui/inverse-card/inverse-card";
import type { Margin } from "@twilio-paste/style-props";
import { gutters } from "~/constants/gutters";
import { InputWithLabels } from "~/components/form/input-with-labels/input-with-label";
import { Form } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Spacer } from "~/components/utilities/spacer/spacer";

const formBoxPadding: Margin = [
  gutters.smBreakpoint.md,
  gutters.mdBreakpoint.md,
  gutters.lgBreakpoint.md,
];

export const CreateTaskForm = () => {
  const taskNotesTextareaId = "task_notes";
  const [labels, setLabels] = useState<string[]>([]);
  const pillState = useFormPillState();
  const [daysOptions, setDaysOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [yearOptions, setYearOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    function getDaysInMonth(year: number, month: number) {
      return new Date(year, month, 0).getDate();
    }

    function getDaysOptions(year: number, month: number) {
      const daysInMonth = getDaysInMonth(year, month);
      const options = [];

      for (let day = 1; day <= daysInMonth; day++) {
        const value = day < 10 ? `0${day}` : day.toString();

        options.push({ value, label: value });
      }

      return options;
    }

    setDaysOptions(getDaysOptions(2023, 1));
  }, []);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 2;

    const yearOptions = [];

    for (let year = currentYear; year <= endYear; year++) {
      yearOptions.push({ value: year.toString(), label: year.toString() });
    }

    setYearOptions(yearOptions);
  }, []);

  const selectDateField = "inputId";

  return (
    <Form method="post" onSubmit={() => setLabels([])}>
      <Box>
        <InverseCard>
          <Box>
            <InputWithLabels
              inputId="task_title"
              inputLabel={"Task Title"}
              required
            />
          </Box>
          <Spacer height={formBoxPadding as []} />
          <Box>
            <Label htmlFor={selectDateField} required>
              Due Date
            </Label>
          </Box>
          <Box style={{ position: "relative", left: "-24px" }}>
            <Grid
              gutter={[
                gutters.smBreakpoint.md,
                gutters.mdBreakpoint.md,
                gutters.lgBreakpoint.xs,
              ]}
              marginLeft={"space0"}
            >
              <Column marginLeft={"space0"} paddingLeft={"space0"} span={4}>
                <Select id={selectDateField} name="month">
                  {[
                    { value: "01", label: "January" },
                    { value: "02", label: "February" },
                    { value: "03", label: "March" },
                    { value: "04", label: "April" },
                    { value: "05", label: "May" },
                    { value: "06", label: "June" },
                    { value: "07", label: "July" },
                    { value: "08", label: "August" },
                    { value: "09", label: "September" },
                    { value: "10", label: "October" },
                    { value: "11", label: "November" },
                    { value: "12", label: "December" },
                  ].map(({ value, label }) => (
                    <Option value={value} key={`${value}-month-option`}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Column>
              <Column span={4}>
                <Select name="day">
                  {daysOptions.map(({ value, label }) => (
                    <Option value={value} key={`${value}-day-select`}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Column>
              <Column span={4}>
                <Select name="year">
                  {yearOptions.map(({ value, label }) => (
                    <Option key={`${value}-option-select`} value={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Column>
            </Grid>
          </Box>
          <Spacer height={formBoxPadding as []} />
          <Box>
            <Label htmlFor="task_notes">Task Notes</Label>
            <TextArea
              id={taskNotesTextareaId}
              name={taskNotesTextareaId}
              onChange={() => {}}
            />
          </Box>
          <Spacer height={formBoxPadding as []} />
          <Box>
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
                    const newLabels = labels.filter(
                      (currentLabel) => currentLabel !== label
                    );

                    setLabels(newLabels);
                  }}
                >
                  <Box minWidth="35px">{label}</Box>
                </PasteFormPill>
              ))}
              <input type="hidden" name="labels" value={labels} />
            </FormPillGroup>
          </Box>
          <Spacer height={formBoxPadding as []} />
          <Box>
            <Label htmlFor="task_effort" required>
              Level of Effort
            </Label>
            <Select id="task_effort" name="effortId">
              <Option value="1">Small</Option>
              <Option value="2">Medium</Option>
              <Option value="3">Large</Option>
            </Select>
          </Box>
          <Spacer height={formBoxPadding as []} />
          <Box>
            <InputWithLabels
              inputId="estimated_cost"
              inputLabel={"Estimated Cost"}
            />
          </Box>
          <Spacer height={formBoxPadding as []} />
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
