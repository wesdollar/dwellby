import { Box, Button } from "@twilio-paste/core";
import type { Margin } from "@twilio-paste/style-props";

interface CreateTaskButtonProps {
  display?: string;
  alignItems?: string;
  justifyContent?: string;
  marginTop?: Margin;
}

export const CreateTasksButton = ({
  display = "flex",
  alignItems = "center",
  justifyContent = "left",
  marginTop = "space0",
}: CreateTaskButtonProps) => {
  return (
    <Box
      display={display}
      alignItems={alignItems}
      justifyContent={justifyContent}
      marginTop={marginTop}
    >
      <Button variant="primary">New Tasks</Button>
    </Box>
  );
};
