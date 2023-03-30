import { Box, Avatar } from "@twilio-paste/core";
import {
  FlyoutMenu,
  MenuItemProps,
} from "~/components/ui/flyout-menu/flyout-menu";
import { Spacer } from "~/components/utilities/spacer/spacer";
import { gutters } from "~/constants/gutters";
import { styled } from "@twilio-paste/styling-library";
import { useState } from "react";

const StyledContainer = styled.div({
  display: "flex",

  button: {
    boxShadow: "none",
    fontWeight: "normal",
  },
});

export const UserProfileBox = () => {
  const menuItems: MenuItemProps[] = [{ name: "Log out", href: "/logout" }];
  const [openFlyoutMenu, setOpenFlyoutMenu] = useState(false);

  return (
    <Box display={"flex"} alignItems="center" justifyContent={"right"}>
      <StyledContainer>
        <FlyoutMenu callToAction="John Smith" menuItems={menuItems} />
        <Spacer width={[gutters.utility.sm]} />
        <Box position={"relative"} top={"3px"}>
          <Avatar
            size="sizeIcon50"
            name="John Smith"
            onClick={() => {
              setOpenFlyoutMenu(!openFlyoutMenu);
            }}
          />
        </Box>
        <Spacer width={[gutters.utility.sm]} />
      </StyledContainer>
    </Box>
  );
};
