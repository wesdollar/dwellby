import {
  Box,
  DisplayPill,
  DisplayPillGroup,
  Heading,
  Stack,
} from "@twilio-paste/core";
import { colors } from "~/constants/colors";
import type { TaskItemProps } from "../types/task-item-props";

export type LimitedTaskItemProps = Omit<
  TaskItemProps,
  "createdAt" | "updatedAt" | "note" | "estimateCost" | "effortId"
>;

export const TaskItem = ({
  title,
  dueDate,
  labels,
  taskId,
  statusId,
}: LimitedTaskItemProps) => (
  <Box
    key={`task-${taskId}`}
    backgroundColor={colors.background.body}
    color={colors.text.primaryText}
    marginBottom={"space40"}
    padding={"space60"}
    style={{
      borderLeft: `16px solid ${
        statusId === 1 ? colors.brandPrimary : colors.border.error
      }`,
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
          {labels.length
            ? labels.map(({ name, id }) => (
                <DisplayPill key={`labelPill-${id}`}>{name}</DisplayPill>
              ))
            : null}
        </DisplayPillGroup>
      </Box>
    </Stack>
  </Box>
);
