import {
  Box,
  FormPillGroup,
  Heading,
  useFormPillState,
} from "@twilio-paste/core";
import { FormPill } from "~/components/form/form-pill/form-pill";
import { InverseCard } from "~/components/ui/inverse-card/inverse-card";
import { Spacer } from "~/components/utilities/spacer/spacer";
import { gutters } from "~/constants/gutters";
import { TaskItem } from "../task-item/task-item";
import type { LimitedTaskItemProps } from "../task-item/task-item";
import { useState } from "react";

interface TaskListProps {
  taskItems: LimitedTaskItemProps[];
  title?: string;
}

export const TaskList = ({ taskItems, title }: TaskListProps) => {
  const [activeToken, setActiveToken] = useState(2);

  const filterTokens = [
    { id: 1, name: "Day" },
    { id: 2, name: "Month" },
    { id: 3, name: "Quarter" },
    { id: 4, name: "Year" },
    { id: 5, name: "All" },
  ];

  const pillState = useFormPillState({
    baseId: "take-list-tokens",
  });

  return (
    <Box width={"100%"}>
      <InverseCard>
        {title && (
          <Heading as="h3" variant="heading50">
            {title}
          </Heading>
        )}

        <FormPillGroup {...pillState} aria-label="hello-world">
          {filterTokens.map(({ id, name }) => (
            <FormPill
              key={`filterToken-${id}`}
              pillState={pillState}
              // typings are in conflict
              // this is brute force
              handleSetActiveToken={(token) => {
                console.log("setting active token:", token);
                setActiveToken(parseInt(token.toString(), 10));
              }}
              name={name}
              activeToken={activeToken}
              id={id}
            />
          ))}
        </FormPillGroup>

        <Spacer
          height={[
            gutters.smBreakpoint.md,
            gutters.mdBreakpoint.lg,
            gutters.lgBreakpoint.sm,
          ]}
        />

        {taskItems.map(
          ({ title, dueDate, labels, statusId, id, estimatedCost }) => (
            <TaskItem
              key={`takeItem-${id}`}
              title={title}
              dueDate={dueDate}
              labels={labels}
              taskId={id}
              statusId={statusId}
              estimatedCost={estimatedCost}
            />
          )
        )}
      </InverseCard>
    </Box>
  );
};
