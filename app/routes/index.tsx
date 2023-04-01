import {
  Anchor,
  Box,
  Button,
  Column,
  Grid,
  Paragraph,
} from "@twilio-paste/core";
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
              <Anchor href="DollarDojo.tech">DollarDojo.tech</Anchor>. The
              entire development of this project is being live streamed on the{" "}
              <Anchor href="https://twitch.tv/dollardojo">
                DollarDojo Twitch
              </Anchor>
              !
            </Paragraph>
            <Paragraph>
              Dwellby is a simple, quick way to keep track of tasks that need to
              be done around the house. It's more so a portfolio piece than
              anything else and a mechanism for us to learn new technologies. We
              hope to be launching soon. In the meantime, come play with us on
              <Anchor href="https://twitch.tv/dollardojo">
                DollarDojo Twitch
              </Anchor>{" "}
              or in{" "}
              <Anchor href="https://discord.gg/mhvcpSPbwu">Discord</Anchor> for
              all the latest and greatest news! Plus, our community is dope af.
            </Paragraph>
            <Paragraph>
              We aren't currently accepting new users, but all subscribers of
              the{" "}
              <Anchor href="https://twitch.tv/dollardojo">
                DollarDojo Twitch channel
              </Anchor>{" "}
              can request access via the{" "}
              <Anchor href="https://discord.gg/mhvcpSPbwu">
                DollarDojo Discord
              </Anchor>
              .
            </Paragraph>
          </Box>
          <Box display={"flex"} justifyContent="right">
            <Button as="a" href="/login" variant="primary">
              Log in
            </Button>
          </Box>
        </Column>
      </Grid>
    </Box>
  </CenteredViewport>
);

export default Index;
