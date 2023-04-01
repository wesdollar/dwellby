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
import { TaskItem, LimitedTaskItemProps } from "../task-item/task-item";
import { useState, useEffect } from "react";
import { colors } from "~/constants/colors";
import { styled } from "@twilio-paste/styling-library";
import addWeek from "date-fns/addWeeks";
import addMonth from "date-fns/addMonths";
import addQuarter from "date-fns/addQuarters";
import addYear from "date-fns/addYears";

interface TaskListProps {
  taskItemsProps: LimitedTaskItemProps[];
  title?: string;
}

// const StyledEmptyStateMessage = styled.div({
//   h4: {
//     color: colors.text.black,
//   },
// });

export const TaskList = ({ taskItemsProps, title }: TaskListProps) => {
  const weeklyFilterValue = 2;
  const [activeToken, setActiveToken] = useState(weeklyFilterValue);

  const filterTokens = [
    { id: 1, name: "Day" },
    { id: 2, name: "Weekly" },
    { id: 3, name: "Month" },
    { id: 4, name: "Quarter" },
    { id: 5, name: "Year" },
    { id: 6, name: "All" },
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

        {filterTokens.length && (
          <FormPillGroup {...pillState} aria-label="hello-world">
            {filterTokens.map(({ id, name }) => (
              <FormPill
                key={`filterToken-${id}`}
                pillState={pillState}
                handleSetActiveToken={(token) => {
                  setActiveToken(parseInt(token.toString(), 10));
                }}
                name={name}
                activeToken={activeToken}
                id={id}
              />
            ))}
          </FormPillGroup>
        )}

        <Spacer
          height={[
            gutters.smBreakpoint.md,
            gutters.mdBreakpoint.lg,
            gutters.lgBreakpoint.sm,
          ]}
        />

        {/* {taskItemsProps &&
          taskItemsProps.length &&
          taskItemsProps.map(
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
          )} */}
      </InverseCard>
    </Box>
  );
};
