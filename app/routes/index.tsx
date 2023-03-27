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
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const taskItems = await db.taskItem.findMany({ include: { labels: true } });

  console.log(JSON.stringify(taskItems, null, 2));

  return json(taskItems);
};

export default function Index() {
  const layoutGridGutters = ["space10", "space30", "space60"] as Space;
  const taskItems = useLoaderData<typeof loader>();

  return (
    <>
      <PageWrapper>
        <Box
          marginTop={["space30", "space40", "space100"]}
          marginBottom={"space80"}
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
                    marginTop="space10"
                  />
                </Flex>
              </Flex>
            </Column>
          </Grid>
        </Box>
      </PageWrapper>

      <Spacer height={["10px", "20px", "0"]} />

      <PageWrapper>
        <Box marginBottom={["space20", "space30", "space120"]}>
          <Grid gutter={layoutGridGutters}>
            <Column>
              <TaskList taskItems={taskItems} />
            </Column>
          </Grid>
        </Box>
      </PageWrapper>
    </>
  );
}
