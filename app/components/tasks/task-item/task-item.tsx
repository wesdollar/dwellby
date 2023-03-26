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
  status,
}: TaskItemProps) => (
  <Box
    key={`task-${taskId}`}
    backgroundColor={"colorBackgroundBody"}
    color={"colorText"}
    marginBottom={"space40"}
    padding={"space60"}
    style={{
      borderLeft: `16px solid ${status === "todo" ? "#5817BD" : "red"}`,
    }}
    _last={{ marginBottom: "space0" }}
  >
    {title && (
      <Heading as="h2" variant="heading30">
        {title}
      </Heading>
    )}
    <Stack as="div" orientation={"horizontal"} spacing="space40">
      <Box>{dueDate}</Box>
      <Box>
        <DisplayPillGroup aria-label="Task Item">
          <DisplayPill>{labels}</DisplayPill>
        </DisplayPillGroup>
      </Box>
    </Stack>
  </Box>
);
