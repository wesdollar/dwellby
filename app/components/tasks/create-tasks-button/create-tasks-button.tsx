import { Box, Button } from "@twilio-paste/core";

interface CreateTaskButtonProps {
  display?: string;
  alignItems?: string;
  justifyContent?: string;
  handleOnClick?: () => void;
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
      <Button variant="primary" onClick={handleOnClick}>
        Create Tasks
      </Button>
    </Box>
  );
};
