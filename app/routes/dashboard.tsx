/* eslint-disable react/no-multi-comp */
import { Box } from "@twilio-paste/core/box";
import { HorizontalLogo } from "~/components/assets/logos/horizontal-logo";
import { Spacer } from "../components/utilities/spacer/spacer";
import { Column, Flex, Grid, Heading } from "@twilio-paste/core";
import { TaskList } from "~/components/tasks/task-list/task-list";
import type { Space } from "@twilio-paste/style-props";
import { UserProfileBox } from "~/components/profiles/user-profile-box/user-profile-box";
import { CreateTasksButton } from "~/components/tasks/create-tasks-button/create-tasks-button";
import { PageWrapper } from "~/components/utilities/page-wrapper/page-wrapper";
import { db } from "~/utils/db.server";
import { json, LoaderArgs, type ActionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DashboardTile } from "~/components/ui/dashboard-tile/dashboard-tile";
import { gutters } from "~/constants/gutters";
import { CreateTaskForm } from "~/components/tasks/create-task-form/create-task-form";
import { PrismaClient, User } from "@prisma/client";
import type { LabelProps } from "~/components/tasks/types/label-props";
import { type TaskItemProps } from "~/components/tasks/types/task-item-props";
import { requireUserId } from "~/session.server";
import { InverseCard } from "~/components/ui/inverse-card/inverse-card";
import { useEffect } from "react";

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
      status: 420,
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
    const taskItem = await prisma.taskItem.create({
      data: {
        userId,
        title: (body?.get("task_title") as string) || "Untitled Task",
        note: (body?.get("task_notes") as string) || "No notes",
        estimatedCost: (body?.get("estimated_cost") as string) || "0.00",
        effortId: 1,
        dueDate: Date.parse(
          `${body?.get("month")}/${body?.get("day")}/${body?.get("year")}`
        ).toLocaleString(),
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
  const layoutGridGutters = ["space10", "space30", "space60"] as Space;
  const userObject = useLoaderData() as unknown as UserWithTasks;
  const { taskItems } = userObject || [];

  useEffect(() => {
    console.log("taskItems", taskItems);

    const form = document.querySelector("#create-task-form") as HTMLFormElement;
    const inputs = form?.querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement
    >("input, textarea");

    inputs?.forEach((input) => {
      input.value = "";
    });
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
          <Grid gutter={layoutGridGutters}>
            <Column>
              <HorizontalLogo />
            </Column>
            <Column>
              <Flex vAlignContent={"center"} height="100%">
                <Flex
                  vAlignContent={"center"}
                  grow
                  hAlignContent={"right"}
                  basis="83%"
                  height={"100%"}
                >
                  <UserProfileBox userObject={userObject} />
                </Flex>
                <Flex
                  vAlignContent={"center"}
                  hAlignContent={"right"}
                  grow
                  basis={"17%"}
                  height={"100%"}
                >
                  <CreateTasksButton
                    display={"flex"}
                    alignItems="center"
                    justifyContent={"right"}
                  />
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
          <Grid gutter={layoutGridGutters}>
            <Column span={4}>
              <CreateTaskForm />
            </Column>
            <Column span={4}>
              {taskItems.length ? (
                <TaskList taskItems={taskItems} />
              ) : (
                <InverseCard>
                  <Heading variant={"heading30"} as="h3">
                    There are no tasks. Kick your feet up and relaaaaaaaaaax!
                  </Heading>
                </InverseCard>
              )}
            </Column>
            <Column span={4}>
              <Grid gutter={layoutGridGutters}>
                {metricTiles.map(({ id, count, title, variant }) => (
                  <Column key={id} span={6}>
                    <DashboardTile
                      count={count}
                      title={title}
                      variant={variant}
                    />
                  </Column>
                ))}
              </Grid>
            </Column>
          </Grid>
        </Box>
      </PageWrapper>
    </>
  );
};

export default Dashboard;
