import { Box, Text, Avatar } from "@twilio-paste/core";

export const UserProfileBox = () => {
  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent={"right"}
      style={{ position: "relative", top: "7px" }}
    >
      <Text as="span" display={"inline-block"} marginRight={"space40"}>
        John Smith
      </Text>
      <Avatar size="sizeIcon50" name="John Smith" />
    </Box>
  );
};
