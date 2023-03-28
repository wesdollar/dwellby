import { Box, Text, Avatar } from "@twilio-paste/core";
import { Spacer } from "~/components/utilities/spacer/spacer";
import { gutters } from "~/constants/gutters";

export const UserProfileBox = () => {
  return (
    <Box display={"flex"} alignItems="center" justifyContent={"right"}>
      <Text as="span" display={"inline-block"}>
        John Smith
      </Text>
      <Spacer width={[gutters.utility.sm]} />
      <Avatar size="sizeIcon50" name="John Smith" />
      <Spacer width={[gutters.utility.sm]} />
    </Box>
  );
};
