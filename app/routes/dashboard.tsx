/* eslint-disable react/no-multi-comp */
import { Box } from "@twilio-paste/core/box";
import { HorizontalLogo } from "~/components/assets/logos/horizontal-logo";
import { Spacer } from "../components/utilities/spacer/spacer";
import {
  Button,
  Column,
  Flex,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalFooter,
  ModalFooterActions,
  ModalHeader,
  ModalHeading,
} from "@twilio-paste/core";
import { TaskList } from "~/components/tasks/task-list/task-list";
import type { Space } from "@twilio-paste/style-props";
import { UserProfileBox } from "~/components/profiles/user-profile-box/user-profile-box";
import { PageWrapper } from "~/components/utilities/page-wrapper/page-wrapper";
import { db } from "~/utils/db.server";
import { json, type LoaderArgs, type ActionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fromUnixTime } from "date-fns";
import { DashboardTile } from "~/components/ui/dashboard-tile/dashboard-tile";
import { gutters } from "~/constants/gutters";
import {
  TaskItemForm,
  type TaskDataWithLabels,
} from "~/components/tasks/task-item-form/task-item-form";
import { PrismaClient, type User } from "@prisma/client";
import type { LabelProps } from "~/components/tasks/types/label-props";
import { type TaskItemProps } from "~/components/tasks/types/task-item-props";
import { requireUserId } from "~/session.server";
import { InverseCard } from "~/components/ui/inverse-card/inverse-card";
import { useEffect, useState } from "react";
import { find } from "lodash";
import { clearTaskItemFormInputFields } from "~/helpers/clear-task-item-form-input-fields";
import { formContext } from "~/constants/form-context";
import { taskItemFormConstants } from "~/components/tasks/task-item-form/task-item-form.constants";

type LabelData = Pick<LabelProps, "name">;

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  let user;

  try {
    user = await db.user.findFirstOrThrow({
      where: { id: userId },
      include: { taskItems: { include: { labels: true } } },
    });
  } catch (error) {
    console.log(error);

    throw new Response("hit the loader error boundary", {
      status: 418,
    });
  }

  return json(user);
};

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const prisma = new PrismaClient();
  let body;

  try {
    body = await request.formData();
  } catch (error) {
    console.log(error);
  }

  // TODO: fix typing
  const tasks = [] as any;

  body?.forEach((value, key) => {
    if (value && key) {
      tasks.push({ [key]: value });
    }
  });

  let labelIndex = 0;
  let labelsToCreate: string[] = [];

  tasks.forEach((task: string) => {
    const [key] = Object.keys(task);

    if (key === "labels") {
      labelsToCreate = tasks[labelIndex].labels.split(",");
    }

    labelIndex++;
  });

  const labelsData: LabelData[] = [];

  if (labelsToCreate && labelsToCreate.length) {
    labelsToCreate.forEach((label: any) => {
      labelsData.push({ name: label });
    });
  }

  try {
    const timestamp = Date.parse(
      `${body?.get("year")}-${body?.get("month")}-${body?.get("day")}/`
    );
    const parsedDueDate = fromUnixTime(Math.floor(timestamp / 1000));

    let taskItem;
    const taskId = body?.get("task-id") as string;

    console.log("task id", taskId);
    console.log("form context", body?.get("form-context"));

    if (body?.get("form-context") === formContext.edit && taskId) {
      console.log("updating task item");

      taskItem = await prisma.taskItem.update({
        where: {
          id: parseInt(taskId),
        },
        data: {
          userId,
          title: (body?.get("task_title") as string) || "",
          note: (body?.get("task_notes") as string) || "",
          estimatedCost: (body?.get("estimated_cost") as string) || "",
          effortId:
            parseInt(body?.get(taskItemFormConstants.taskEffort) as string) ||
            3,
          dueDate: parsedDueDate,
          labels: {
            create: labelsData,
          },
          statusId: 1,
        },
      });

      return json(taskItem);
    }

    taskItem = await prisma.taskItem.create({
      data: {
        userId,
        title: (body?.get("task_title") as string) || "",
        note: (body?.get("task_notes") as string) || "",
        estimatedCost: (body?.get("estimated_cost") as string) || "",
        effortId:
          parseInt(body?.get(taskItemFormConstants.taskEffort) as string) || 3,
        dueDate: parsedDueDate,
        labels: {
          create: labelsData,
        },
        statusId: 1,
      },
    });

    return json(taskItem);
  } catch (error) {
    return json({ error });
  }
};

interface MetricTilesObject {
  title: string;
  variant: string;
  count: number;
  id: number;
}

type MetricTiles = MetricTilesObject[];
type UserWithTasks = User & { taskItems: TaskItemProps[] };

export const Dashboard = () => {
  const layoutGridGutters = ["space60", "space30", "space60"] as Space;
  const userObject = useLoaderData() as unknown as UserWithTasks;
  const { taskItems } = userObject || [];
  const [selectedTaskData, setSelectedTaskData] =
    useState<TaskDataWithLabels>();
  const [isTaskItemModalOpen, setIsTaskItemModalOpen] = useState(false);
  const handleTaskModalClose = () => {
    const editTaskButton = document.getElementById(
      "edit-task-button"
    ) as HTMLButtonElement;

    editTaskButton.click();

    setIsTaskItemModalOpen(false);
    clearTaskItemFormInputFields();
    setSelectedTaskData(undefined);
  };

  const handleTaskModalOpen = (taskId: number) => {
    const selectedTaskId = find(taskItems, (task) => taskId === task.id);

    setSelectedTaskData(selectedTaskId);
    setIsTaskItemModalOpen(true);
  };

  useEffect(() => {
    clearTaskItemFormInputFields();
  }, [taskItems]);

  const allTasksCount = taskItems.length || 0;
  let pastDueTasksCount = 0;
  const completedTasksCount = 0;

  if (allTasksCount) {
    taskItems.forEach((taskItem) => {
      if (taskItem.statusId === 2) {
        pastDueTasksCount++;
      }
    });
  }

  const metricTiles: MetricTiles = [
    {
      title: "All Tasks",
      variant: "brandPrimary",
      count: allTasksCount,
      id: 1,
    },
    {
      title: "Past-Due Tasks",
      variant: "error",
      count: pastDueTasksCount,
      id: 2,
    },
    {
      title: "Completed Tasks",
      variant: "success",
      count: completedTasksCount,
      id: 3,
    },
  ];

  const mainColumnBreakpoints = [12, 12, 4];
  const viewEditTaskModalHeading = "view-edit-task-modal-heading";

  return (
    <>
      <PageWrapper>
        <Box
          marginTop={[
            gutters.smBreakpoint.lg,
            gutters.mdBreakpoint.md,
            gutters.lgBreakpoint.lg,
          ]}
          marginBottom={gutters.utility.md}
        >
          <Grid gutter={layoutGridGutters} vertical={[false, false, false]}>
            <Column span={[3, 6, 6]}>
              <HorizontalLogo />
            </Column>
            <Column span={[9, 6, 6]}>
              <Flex vAlignContent={"center"} height="100%">
                <Flex
                  vAlignContent={"center"}
                  grow
                  hAlignContent={"right"}
                  // basis={["50%", "80px", "83%"]}
                  basis={"100%"}
                  height={"100%"}
                >
                  <UserProfileBox variant="sm" userObject={userObject} />
                </Flex>
              </Flex>
            </Column>
          </Grid>
        </Box>
      </PageWrapper>

      <Spacer height={["10px", "20px", "0"]} />

      <PageWrapper>
        <Box
          marginBottom={[
            gutters.smBreakpoint.md,
            gutters.mdBreakpoint.sm,
            gutters.lgBreakpoint.xl,
          ]}
        >
          <Grid gutter={layoutGridGutters} vertical={[true, true, false]}>
            <Column span={mainColumnBreakpoints}>
              <TaskItemForm
                taskModalIsOpen={isTaskItemModalOpen}
                taskData={selectedTaskData}
                formContext={formContext.create}
              />
            </Column>
            <Column span={mainColumnBreakpoints}>
              {taskItems.length ? (
                <TaskList
                  taskItems={taskItems}
                  userId={userObject.id}
                  handleModalOpen={handleTaskModalOpen}
                />
              ) : (
                <InverseCard>
                  <Heading variant={"heading30"} as="h3">
                    There are no tasks. Kick your feet up and relaaaaaaaaaax!
                  </Heading>
                </InverseCard>
              )}
            </Column>
            <Column span={mainColumnBreakpoints}>
              <Grid gutter={layoutGridGutters}>
                {metricTiles.map(({ id, count, title, variant }) => (
                  <Column key={id} span={6}>
                    <DashboardTile
                      count={count}
                      title={title}
                      variant={variant}
                      padding={["sm", "md", "lg"]}
                    />
                  </Column>
                ))}
              </Grid>
            </Column>
          </Grid>
        </Box>
      </PageWrapper>
      <Modal
        ariaLabelledby={viewEditTaskModalHeading}
        isOpen={isTaskItemModalOpen}
        onDismiss={handleTaskModalClose}
        size="default"
      >
        <ModalHeader>
          <ModalHeading as="h3" id={viewEditTaskModalHeading}>
            Task Item
          </ModalHeading>
        </ModalHeader>
        <ModalBody>
          <TaskItemForm
            taskModalIsOpen={isTaskItemModalOpen}
            taskData={selectedTaskData}
            formContext={formContext.edit}
          />
        </ModalBody>
        <Spacer
          height={[
            gutters.smBreakpoint.lg,
            gutters.mdBreakpoint.md,
            gutters.lgBreakpoint.md,
          ]}
        />
        <ModalFooter style={{ marginTop: "10px" }}>
          <ModalFooterActions>
            <Button variant="secondary" onClick={handleTaskModalClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => handleTaskModalClose()}>
              Save
            </Button>
          </ModalFooterActions>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Dashboard;
