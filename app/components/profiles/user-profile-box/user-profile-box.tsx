import { Box, Avatar } from "@twilio-paste/core";
import {
  FlyoutMenu,
  MenuItemProps,
} from "~/components/ui/flyout-menu/flyout-menu";
import { Spacer } from "~/components/utilities/spacer/spacer";
import { gutters } from "~/constants/gutters";

export const UserProfileBox = () => {
  const menuItems: MenuItemProps[] = [{ name: "Log out", href: "/logout" }];

  return (
    <Box display={"flex"} alignItems="center" justifyContent={"right"}>
      <FlyoutMenu callToAction="John Smith" menuItems={menuItems} />
      <Spacer width={[gutters.utility.sm]} />
      <Avatar size="sizeIcon50" name="John Smith" />
      <Spacer width={[gutters.utility.sm]} />
    </Box>
  );
};
