import {
  Box,
  DisplayPill,
  DisplayPillGroup,
  Heading,
  Stack,
} from "@twilio-paste/core";
import { colors } from "~/constants/colors";
import type { TaskItemProps } from "~/components/tasks/types/task-item-props";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";

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
}: LimitedTaskItemProps) => {
  const [formattedDueDate, setFormattedDueDate] = useState("");

  useEffect(
    () =>
      setFormattedDueDate(
        dueDate ? format(parseISO(dueDate.toString()), "MMM d") : ""
      ),
    []
  );

  return (
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
        <Box>{formattedDueDate}</Box>
        <Box>
          <DisplayPillGroup aria-label="Task Item">
            {labels.length
              ? labels.map(({ name, id }) => (
                  <DisplayPill key={`labelPill-${id}`}>{name}</DisplayPill>
                ))
              : ""}
          </DisplayPillGroup>
        </Box>
      </Stack>
    </Box>
  );
};
