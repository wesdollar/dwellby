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
import { ActionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DashboardTile } from "~/components/ui/dashboard-tile/dashboard-tile";
import { gutters } from "~/constants/gutters";
import { CreateTaskForm } from "~/components/tasks/create-task-form/create-task-form";
import { FormEvent } from "react";

export const loader = async () => {
  const taskItems = await db.taskItem.findMany({ include: { labels: true } });

  return json(taskItems);
};

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();

  console.log(body);
};

export default function Index() {
  const handleOnClick = (event: FormEvent) => {
    console.log("clicked");
    console.log(event);
  };

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
              <CreateTaskForm handleOnClick={handleOnClick} />
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
