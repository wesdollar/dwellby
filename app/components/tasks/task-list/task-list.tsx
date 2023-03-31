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
    let persistedCache;
    let currentQuarter: Date;
    let currentYear: Date;

    let cachedTaskItems = [...taskItemsFromProps];

    switch (activeToken) {
      case 1:
        currentDateRange = new Date().getDay();

        updatedTaskItems = taskItems.filter((taskItem) => {
          const taskItemDay = new Date(taskItem.dueDate).getDay();

          return currentDateRange === taskItemDay;
        });

        setTaskItems(updatedTaskItems);

        break;
      case 2:
        currentWeek = addWeek(new Date(), 1);

        updatedTaskItems = taskItems.filter(
          (taskItem) => new Date(taskItem.dueDate) <= currentWeek
        );

        setTaskItems(updatedTaskItems);
        break;
      case 3:
        currentMonth = addMonth(new Date(), 1);

        persistedCache = [...cachedTaskItems];

        updatedTaskItems = cachedTaskItems.filter(
          (taskItem) => new Date(taskItem.dueDate) <= currentMonth
        );

        cachedTaskItems = [...persistedCache];

        setTaskItems(updatedTaskItems);

        break;
      case 4:
        currentQuarter = addQuarter(new Date(), 1);

        persistedCache = [...cachedTaskItems];

        updatedTaskItems = cachedTaskItems.filter(
          (taskItem) => new Date(taskItem.dueDate) <= currentQuarter
        );

        cachedTaskItems = [...persistedCache];

        setTaskItems(updatedTaskItems);

        break;
      case 5:
        currentYear = addYear(new Date(), 1);

        persistedCache = [...cachedTaskItems];

        updatedTaskItems = cachedTaskItems.filter(
          (taskItem) => new Date(taskItem.dueDate) <= currentYear
        );

        cachedTaskItems = [...persistedCache];

        setTaskItems(updatedTaskItems);
        break;
      case 6:
        setTaskItems(cachedTaskItems);
        break;
      default:
      //
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

        {taskItems && taskItems.length ? (
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
