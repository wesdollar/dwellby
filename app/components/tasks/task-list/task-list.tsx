import {
  Box,
  FormPill,
  FormPillGroup,
  Heading,
  useFormPillState,
} from "@twilio-paste/core";
import { InverseCard } from "~/components/ui/inverse-card";
import { Spacer } from "~/components/utilities/spacer/spacer";
import { gutters } from "~/constants/gutters";
import { TaskItem } from "../task-item/task-item";
import type { TaskItemProps } from "../types/task-item-props";

// SerializeObject<UndefinedToOptional

interface TaskListProps {
  taskItems: TaskItemProps[];
  title?: string;
}

export const TaskList = ({ taskItems, title }: TaskListProps) => {
  const pillState = useFormPillState();

  return (
    <Box width={"100%"}>
      <InverseCard>
        {title && (
          <Heading as="h3" variant="heading50">
            {title}
          </Heading>
        )}

        <FormPillGroup {...pillState} aria-label="hello-world">
          <FormPill {...pillState}>Voice</FormPill>
          <FormPill {...pillState}>Whatever</FormPill>
          <FormPill {...pillState}>Cheers</FormPill>
        </FormPillGroup>

        <Spacer
          height={[
            gutters.smBreakpoint.md,
            gutters.mdBreakpoint.lg,
            gutters.lgBreakpoint.sm,
          ]}
        />

        {taskItems.map(({ title, dueDate, labels, statusId, id }) => (
          <TaskItem
            key={`takeItem-${id}`}
            title={title}
            dueDate={dueDate}
            labels={labels}
            taskId={id}
            statusId={statusId}
          />
        ))}
      </InverseCard>
    </Box>
  );
};
