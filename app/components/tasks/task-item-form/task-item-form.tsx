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
  Input,
} from "@twilio-paste/core";
import { InverseCard } from "~/components/ui/inverse-card/inverse-card";
import type { Margin } from "@twilio-paste/style-props";
import { gutters } from "~/constants/gutters";
import { InputWithLabels } from "~/components/form/input-with-labels/input-with-label";
import { Form } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Spacer } from "~/components/utilities/spacer/spacer";
import { taskStatuses } from "~/constants/task-statuses";
import { formContext as formContextConstants } from "~/constants/form-context";
import { type LabelProps } from "../types/label-props";
import { taskItemFormConstants } from "./task-item-form.constants";

const formBoxPadding: Margin = [
  gutters.smBreakpoint.lg,
  gutters.mdBreakpoint.md,
  gutters.lgBreakpoint.md,
];

interface TaskItemFormProps {
  taskData?: TaskDataWithLabels;
  taskModalIsOpen: boolean;
  handleOnSelectTaskStatus?: () => void;
  formContext: string;
}

export interface TaskDataWithLabels {
  id?: number;
  title: string;
  dueDate: Date;
  labels: LabelProps[];
  statusId: number;
  note: string;
  estimatedCost: string;
  effortId: number;
}

export const TaskItemForm = ({
  taskData,
  taskModalIsOpen,
  formContext,
}: TaskItemFormProps) => {
  const taskNotesTextareaId = "task_notes";
  const [labels, setLabels] = useState<string[]>([]);
  const pillState = useFormPillState();
  const [daysOptions, setDaysOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [yearOptions, setYearOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedEffort, setSelectedEffort] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    if (formContext === formContextConstants.edit && taskData?.labels?.length) {
      const tempLabels = [] as string[];

      taskData.labels.forEach((label) => {
        tempLabels.push(label.name);
      });

      setLabels(tempLabels);
    }

    if (taskData?.effortId) {
      console.log("EFFORT ID", taskData?.effortId);

      setSelectedEffort(taskData?.effortId.toString());
    }

    if (formContext === formContextConstants.edit && taskData?.statusId) {
      setSelectedStatus(taskData?.statusId.toString());
    }

    if (formContext === formContextConstants.edit && taskData?.dueDate) {
      const date = new Date(taskData?.dueDate);

      const monthFromData = date.getMonth() + 1;
      const month = monthFromData < 10 ? `0${monthFromData}` : monthFromData;

      const dayFromData = date.getDate() + 1;
      const day = dayFromData < 10 ? `0${dayFromData}` : dayFromData;

      setSelectedYear(date.getFullYear().toString());
      setSelectedMonth(month.toString());
      setSelectedDay(day.toString());
    }
  }, [taskData]);

  useEffect(() => {
    function getDaysInMonth(year: number, month: number) {
      return 30;
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
    const currentYear = 2023;
    const endYear = currentYear + 2;

    const yearOptions = [];

    for (let year = currentYear; year <= endYear; year++) {
      yearOptions.push({ value: year.toString(), label: year.toString() });
    }

    setYearOptions(yearOptions);
  }, []);

  const selectDateField = "inputId";

  const monthsDropdownArray = [
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
  ];

  const createTaskFormId = "create-task-form";

  const handleOnSubmit = () => {
    setLabels([]);
  };

  return (
    <InverseCard>
      <Form
        method="post"
        id={createTaskFormId}
        onSubmit={() => handleOnSubmit()}
      >
        {taskData && taskModalIsOpen ? (
          <>
            <Select
              id="task_status"
              name="task_status"
              value={selectedStatus}
              onChange={(event) => {
                setSelectedStatus(event.target.value);
              }}
            >
              {taskStatuses.map((status) => (
                <Option
                  value={`${status.id}`}
                  key={`${taskData.id}-option-select-${formContext}`}
                >
                  {status.name}
                </Option>
              ))}{" "}
            </Select>
            <Spacer
              height={[
                gutters.smBreakpoint.lg,
                gutters.mdBreakpoint.md,
                gutters.lgBreakpoint.md,
              ]}
            />
          </>
        ) : null}
        <Box>
          <Box>
            <InputWithLabels
              inputId="task_title"
              inputLabel={"Task Title"}
              required
              defaultValue={taskData?.title || undefined}
            />
          </Box>
          <Spacer height={formBoxPadding as []} />
          <Box>
            <Label htmlFor={selectDateField} required>
              Due Date
            </Label>
          </Box>
          <Box style={{ position: "relative", left: "-8px" }}>
            <Grid
              gutter={[
                gutters.smBreakpoint.md,
                gutters.mdBreakpoint.md,
                gutters.lgBreakpoint.xs,
              ]}
              marginLeft={"space0"}
            >
              <Column marginLeft={"space0"} paddingLeft={"space0"} span={4}>
                <Select
                  /* FIX ME, the selectDateField */
                  /* you need to map the select to the label, dude */
                  id={selectDateField}
                  name="month"
                  value={selectedMonth}
                  onChange={(event) => setSelectedMonth(event.target.value)}
                >
                  {monthsDropdownArray.map(({ value, label }) => (
                    <Option
                      value={value}
                      key={`${value}-month-option-${formContext}`}
                    >
                      {label}
                    </Option>
                  ))}
                </Select>
              </Column>
              <Column span={4}>
                <Select
                  id="day"
                  name="day"
                  value={selectedDay}
                  onChange={(event) => setSelectedDay(event.target.value)}
                >
                  {daysOptions.map(({ value, label }) => (
                    <Option
                      value={value}
                      key={`${value}-day-select-${formContext}`}
                    >
                      {label}
                    </Option>
                  ))}
                </Select>
              </Column>
              <Column span={4}>
                <Select
                  name="year"
                  onChange={(event) => setSelectedYear(event.target.value)}
                  value={selectedYear}
                >
                  {yearOptions.map(({ value, label }) => (
                    <Option
                      key={`${value}-option-select-${formContext}`}
                      value={value}
                    >
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
              defaultValue={taskData?.note || ""}
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
            <Spacer
              height={[
                gutters.smBreakpoint.lg,
                gutters.mdBreakpoint.md,
                gutters.mdBreakpoint.md,
              ]}
            />
            <FormPillGroup {...pillState} aria-label="hello-world">
              {labels?.length
                ? labels.map((label) => (
                    <PasteFormPill
                      {...pillState}
                      key={`label-${label}-${formContext}`}
                      onSelect={() => {
                        const newLabels = labels.filter(
                          (currentLabel) => currentLabel !== label
                        );

                        setLabels(newLabels);
                      }}
                    >
                      <Box minWidth="35px">{label}</Box>
                    </PasteFormPill>
                  ))
                : null}
              <input type="hidden" name="labels" value={labels} />
            </FormPillGroup>
          </Box>
          <Spacer height={formBoxPadding as []} />
          <Box>
            <Label htmlFor={taskItemFormConstants.taskEffort} required>
              Level of Effort
            </Label>
            <Select
              value={selectedEffort}
              onChange={(event) => setSelectedEffort(event.target.value)}
              id={taskItemFormConstants.taskEffort}
              name={taskItemFormConstants.taskEffort}
            >
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
              defaultValue={taskData?.estimatedCost || undefined}
            />
          </Box>
          {formContext === formContextConstants.create ? (
            <>
              <Spacer height={formBoxPadding as []} />
              <Box display={"flex"} justifyContent={"right"}>
                <FormActions>
                  <Button variant="primary" type="submit">
                    Create Tasks
                  </Button>
                </FormActions>
              </Box>
            </>
          ) : (
            <>
              <Input
                type="hidden"
                name="form-context"
                value={formContextConstants.edit}
              />
              <Input
                type="hidden"
                name="task-id"
                value={taskData?.id?.toString() || undefined}
              />
              <FormActions>
                <Button id="edit-task-button" variant="primary" type="submit">
                  Edit Task
                </Button>
              </FormActions>
            </>
          )}
        </Box>
      </Form>
    </InverseCard>
  );
};
