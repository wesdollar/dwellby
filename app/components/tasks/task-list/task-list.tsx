import { Box, Heading } from "@twilio-paste/core";
import { TaskItem } from "../task-item/task-item";
import { styled, css } from "@twilio-paste/styling-library";
import type { TaskItemProps } from "../types/task-item-props";

const CustomCard = styled.div(
  css({
    background: "white",
    borderColor: "red",
    borderRadius: "8px",
    padding: "32px",
    color: "black",

    h3: {
      color: "#121C2D",
    },
  })
);

// SerializeObject<UndefinedToOptional

interface TaskListProps {
  taskItems: TaskItemProps[];
  title?: string;
}

export const TaskList = ({ taskItems, title }: TaskListProps) => {
  return (
    <Box width={"100%"}>
      <CustomCard>
        <Heading as="h3" variant="heading50">
          {title}
        </Heading>
        {taskItems.map(({ title, dueDate, labels, status, taskId }) => (
          <TaskItem
            key={`takeItem-${taskId}`}
            title={title}
            dueDate={dueDate}
            labels={labels}
            taskId={taskId}
            status={status}
          />
        ))}
      </CustomCard>
    </Box>
  );
};
