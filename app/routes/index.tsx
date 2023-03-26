import { Box } from "@twilio-paste/core/box";
import { HorizontalLogo } from "~/components/assets/logos/horizontal-logo";
import { Spacer } from "../components/utilities/spacer";
import { Column, Grid } from "@twilio-paste/core";
import { TaskList } from "~/components/tasks/task-list/task-list";
import type { Margin, Space } from "@twilio-paste/style-props";
import { UserProfileBox } from "~/components/profiles/user-profile-box/user-profile-box";
import { CreateTasksButton } from "~/components/tasks/create-tasks-button/create-tasks-button";

export default function Index() {
  const uiGridBoxMargins = ["space20", "space30", "space60"] as Margin;
  const layoutGridGutters = ["space10", "space30", "space60"] as Space;

  return (
    <>
      <Box
        margin={uiGridBoxMargins}
        marginRight={uiGridBoxMargins}
        marginTop={uiGridBoxMargins}
      >
        <Grid gutter={layoutGridGutters}>
          <Column>
            <HorizontalLogo />
          </Column>
          <Column>
            <Grid gutter={"space40"}>
              <Column span={10}>
                <UserProfileBox />
              </Column>
              <Column span={2}>
                <CreateTasksButton
                  display={"flex"}
                  alignItems="center"
                  justifyContent={"right"}
                  marginTop="space10"
                />
              </Column>
            </Grid>
          </Column>
        </Grid>
      </Box>

      <Spacer height={["10px", "20px", "0"]} />

      <Box
        marginLeft={uiGridBoxMargins}
        marginRight={uiGridBoxMargins}
        marginBottom={["space20", "space30", "space120"]}
      >
        <Grid gutter={layoutGridGutters}>
          <Column>
            <TaskList title="Upcoming Tasks" />
          </Column>
          <Column>
            <TaskList title="Uncategorized Tasks" />
          </Column>
        </Grid>
      </Box>
    </>
  );
}
