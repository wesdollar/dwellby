import { Box, Button } from "@twilio-paste/core";

interface CreateTaskButtonProps {
  display?: string;
  alignItems?: string;
  justifyContent?: string;
  onClick?: () => void;
}

export const CreateTasksButton = ({
  display = "flex",
  alignItems = "center",
  justifyContent = "left",
  onClick = () => {},
}: CreateTaskButtonProps) => {
  return (
    <Box
      display={display}
      alignItems={alignItems}
      justifyContent={justifyContent}
    >
      <Button variant="primary">Create Tasks</Button>
    </Box>
  );
};
