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
import { TaskItem, type LimitedTaskItemProps } from "../task-item/task-item";
import { useState, useEffect } from "react";
import { colors } from "~/constants/colors";
import { styled } from "@twilio-paste/styling-library";
import addWeeks from "date-fns/addWeeks";
import addMonths from "date-fns/addMonths";
import addQuarters from "date-fns/addQuarters";
import addYears from "date-fns/addYears";
import { parseISO } from "date-fns";

interface TaskListProps {
  taskItems: LimitedTaskItemProps[];
  title?: string;
}

const StyledEmptyStateMessage = styled.div({
  h4: {
    color: colors.text.black,
  },
});

export const TaskList = ({
  taskItems: taskItemsFromProps,
  title,
}: TaskListProps) => {
  const weeklyFilterValue = 2;
  const [activeToken, setActiveToken] = useState(weeklyFilterValue);
  const [taskItems, setTaskItems] = useState(taskItemsFromProps);

  useEffect(() => {
    let currentDateRange: Number;
    let currentWeek: Date;
    let updatedTaskItems;
    let currentMonth: Date;
    let currentQuarter: Date;
    let currentYear: Date;
    let today: Date;
    const allTaskItems = [...taskItemsFromProps];

    switch (activeToken) {
      case 1: // today
        today = parseISO(Date.now().toString());
        currentDateRange = today.getDay();

        updatedTaskItems = allTaskItems.filter(
          (taskItem) =>
            currentDateRange === parseISO(taskItem.dueDate.toString()).getDay()
        );

        setTaskItems(updatedTaskItems);
        break;
      case 2: // this week
        currentWeek = addWeeks(Date.now(), 1);

        updatedTaskItems = allTaskItems.filter(
          (taskItem) => parseISO(taskItem.dueDate.toString()) <= currentWeek
        );

        setTaskItems(updatedTaskItems);
        break;
      case 3: // this month
        currentMonth = addMonths(Date.now(), 1);

        updatedTaskItems = allTaskItems.filter(
          (taskItem) => parseISO(taskItem.dueDate.toString()) <= currentMonth
        );

        setTaskItems(updatedTaskItems);
        break;
      case 4: // this quarter
        currentQuarter = addQuarters(Date.now(), 1);

        updatedTaskItems = allTaskItems.filter(
          (taskItem) => parseISO(taskItem.dueDate.toString()) <= currentQuarter
        );

        setTaskItems(updatedTaskItems);
        break;
      case 5: // this year
        currentYear = addYears(Date.now(), 1);

        updatedTaskItems = allTaskItems.filter(
          (taskItem) => parseISO(taskItem.dueDate.toString()) <= currentYear
        );

        setTaskItems(updatedTaskItems);
        break;
      case 6: // all
        setTaskItems(allTaskItems);
        break;
      default:
        setTaskItems(allTaskItems);
    }
  }, [activeToken]);

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
                handleSetActiveToken={(token) =>
                  setActiveToken(parseInt(token.toString(), 10))
                }
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

        {taskItems.length ? (
          taskItems.map(
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
          )
        ) : (
          <StyledEmptyStateMessage>
            <Spacer
              height={[
                gutters.smBreakpoint.lg,
                gutters.mdBreakpoint.lg,
                gutters.lgBreakpoint.md,
              ]}
            />
            <Heading as="h4" variant="heading40">
              No tasks were found for this period. Enjoy your time off!
            </Heading>
          </StyledEmptyStateMessage>
        )}
      </InverseCard>
    </Box>
  );
};
