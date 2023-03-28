import { Box, Heading } from "@twilio-paste/core";
import { InverseCard } from "~/components/ui/inverse-card";
import { TaskItem } from "../task-item/task-item";
import type { TaskItemProps } from "../types/task-item-props";

// SerializeObject<UndefinedToOptional

interface TaskListProps {
  taskItems: TaskItemProps[];
  title?: string;
}

export const TaskList = ({ taskItems, title }: TaskListProps) => {
  return (
    <Box width={"100%"}>
      <InverseCard>
        <Heading as="h3" variant="heading50">
          {title}
        </Heading>
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
