import {
  Box,
  Column,
  DisplayPill,
  DisplayPillGroup,
  Grid,
  Heading,
} from "@twilio-paste/core";

interface TaskItemProps {
  title: string;
  date: string;
  token: string[];
  index: number;
  status: string;
}

export const TaskItem = ({
  title,
  date,
  token,
  index,
  status,
}: TaskItemProps) => (
  <Box
    key={`task-${index}`}
    backgroundColor={"colorBackgroundBody"}
    color={"colorText"}
    marginBottom={"space40"}
    padding={"space60"}
    style={{
      borderLeft: `16px solid ${status === "todo" ? "#5817BD" : "red"}`,
    }}
    _last={{ marginBottom: "space0" }}
  >
    <Heading as="h2" variant="heading30">
      {title}
    </Heading>
    <Grid gutter="space40">
      <Column span={2}>{date}</Column>
      <Column span={10}>
        <DisplayPillGroup aria-label="Task Item">
          <DisplayPill>{token}</DisplayPill>
        </DisplayPillGroup>
      </Column>
    </Grid>
  </Box>
);
