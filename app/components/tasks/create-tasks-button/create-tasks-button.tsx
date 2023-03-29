import { Box, Button, FormActions } from "@twilio-paste/core";

interface CreateTaskButtonProps {
  display?: string;
  alignItems?: string;
  justifyContent?: string;
  handleOnClick?: () => void;
  labels?: Record<string, unknown>[];
}

export const CreateTasksButton = ({
  display = "flex",
  alignItems = "center",
  justifyContent = "left",
  handleOnClick = () => {},
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
