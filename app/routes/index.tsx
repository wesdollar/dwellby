import { Box } from "@twilio-paste/core/box";
import { HorizontalLogo } from "~/components/assets/logos/horizontal-logo";
import { Spacer } from "../components/utilities/spacer/spacer";
import { Column, Flex, Grid } from "@twilio-paste/core";
import { TaskList } from "~/components/tasks/task-list/task-list";
import type { Space } from "@twilio-paste/style-props";
import { UserProfileBox } from "~/components/profiles/user-profile-box/user-profile-box";
import { CreateTasksButton } from "~/components/tasks/create-tasks-button/create-tasks-button";
import { PageWrapper } from "~/components/utilities/page-wrapper/page-wrapper";
import { db } from "~/utils/db.server";
import { json } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DashboardTile } from "~/components/ui/dashboard-tile/dashboard-tile";
import { gutters } from "~/constants/gutters";
import { CreateTaskForm } from "~/components/tasks/create-task-form/create-task-form";
import type { FormEvent } from "react";
import { CreateTaskFormDebug } from "~/components/playground/create-task-form-debug";
import { PrismaClient, Prisma } from "@prisma/client";

export const loader = async () => {
  const taskItems = await db.taskItem.findMany({ include: { labels: true } });

  return json(taskItems);
};

export const action = async ({ request }: ActionArgs) => {
  const prisma = new PrismaClient();
  let body;

  try {
    body = await request.formData();
  } catch (error) {
    console.log(error);
  }

  let tasks = [] as any;

  body?.forEach((value, key) => {
    console.log(`${key}: ${value}`);
    tasks.push({ [key]: value });
  });

  console.log(Object.assign({}, ...tasks));

  const taskItem = await prisma.taskItem.create({
    data: {
      title: (body?.get("task_title") as string) || "Untitled Task",
      note: (body?.get("task_notes") as string) || "No notes",
      estimatedCost: (body?.get("estimated_cost") as string) || "0.00",
      effortId: 1,
      dueDate: new Date("2023-04-01"),
      labels: {
        create: [
          {
            name: "Test Label",
          },
        ],
      },
      statusId: 1,
    },
  });

  return json(taskItem);
};

export default function Index() {
  const layoutGridGutters = ["space10", "space30", "space60"] as Space;
  const taskItems = useLoaderData<typeof loader>();
  const metricTiles = [
    {
      title: "All Tasks",
      variant: "brandPrimary",
      count: 23,
      id: 1,
    },
    {
      title: "Past-Due Tasks",
      variant: "error",
      count: 2,
      id: 2,
    },
    {
      title: "Completed Tasks",
      variant: "success",
      count: 7,
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
                  <UserProfileBox />
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
              <TaskList taskItems={taskItems} />
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
}
