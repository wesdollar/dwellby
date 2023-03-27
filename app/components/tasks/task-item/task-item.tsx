import {
  Box,
  DisplayPill,
  DisplayPillGroup,
  Heading,
  Stack,
} from "@twilio-paste/core";
import type { TaskItemProps } from "../types/task-item-props";

export const TaskItem = ({
  title,
  dueDate,
  labels,
  taskId,
  statusId,
}: TaskItemProps) => (
  <Box
    key={`task-${taskId}`}
    backgroundColor={"colorBackgroundBody"}
    color={"colorText"}
    marginBottom={"space40"}
    padding={"space60"}
    style={{
      borderLeft: `16px solid ${statusId === 1 ? "#5817BD" : "red"}`,
    }}
    _last={{ marginBottom: "space0" }}
  >
    {title && (
      <Heading as="h2" variant="heading30">
        {title}
      </Heading>
    )}
    <Stack as="div" orientation={"horizontal"} spacing="space40">
      <Box>
        {new Date(dueDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </Box>
      <Box>
        <DisplayPillGroup aria-label="Task Item">
          {labels.map(({ name, id }) => (
            <DisplayPill key={`labelPill-${id}`}>{name}</DisplayPill>
          ))}
        </DisplayPillGroup>
      </Box>
    </Stack>
  </Box>
);
