import { Box, Heading } from "@twilio-paste/core";
import { TaskItem } from "../task-item/task-item";
import { styled, css } from "@twilio-paste/styling-library";

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

interface TaskListProps {
  title: string;
}

export const TaskList = ({ title }: TaskListProps) => {
  const taskItems = [
    {
      title: "Pressure Wash",
      date: "Mar 26",
      token: ["Here at some point"],
      status: "todo",
    },
    {
      title: "Clean the Carpet",
      date: "Apr 1",
      token: ["Here at some point"],
      status: "todo",
    },
  ];

  return (
    <Box width={"100%"}>
      <CustomCard>
        <Heading as="h3" variant="heading40">
          {title}
        </Heading>
        {taskItems.map(({ title, date, token, status }, index) => (
          <TaskItem
            key={`takeItem-${index}`}
            title={title}
            date={date}
            token={token}
            index={index}
            status={status}
          />
        ))}
      </CustomCard>
    </Box>
  );
};
