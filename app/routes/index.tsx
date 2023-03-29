import { Anchor, Box, Column, Grid, Paragraph } from "@twilio-paste/core";
import { HorizontalLogo } from "~/components/assets/logos/horizontal-logo";
import { CenteredViewport } from "~/components/ui/centered-viewport/centered-viewport";
import { Spacer } from "~/components/utilities/spacer/spacer";
import { gutters } from "~/constants/gutters";

export const Index = () => (
  <CenteredViewport>
    <Box width={"400px"}>
      <Grid vertical>
        <Column>
          <Box display={"flex"} justifyContent={"center"}>
            <HorizontalLogo height="115px" />
          </Box>
        </Column>
        <Column>
          <Spacer
            height={[
              gutters.smBreakpoint.lg,
              gutters.mdBreakpoint.lg,
              gutters.lgBreakpoint.xl,
            ]}
          />
        </Column>
        <Column>
          <Box>
            <Paragraph>
              Dwellby is a pet project made by the married couple over at
              DollarDojo.tech. The entire development of this project is being
              live-streamed on{" "}
              <Anchor href="https://twitch.tv/dollardojo">Twitch</Anchor>!
            </Paragraph>
            <Paragraph>
              Dwellby is a simple, quick way to keep track of tasks that need to
              be done around the house. It's more so a portfolio piece than
              anything else and a mechanism for us to learn new technologies. We
              hope to be launching soon. In the meantime, come play with us on
              Twitch or in Discord for all the latest and greatest news! Plus,
              our community is dope af.
            </Paragraph>
          </Box>
        </Column>
      </Grid>
    </Box>
  </CenteredViewport>
);

export default Index;
