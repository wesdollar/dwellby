import { Menu, MenuButton, MenuItem, useMenuState } from "@twilio-paste/core";

// TODO: move to own file
export interface MenuItemProps {
  name: string;
  href: string;
}

interface FlyoutMenuProps {
  callToAction: string;
  menuItems: MenuItemProps[];
}

export const FlyoutMenu = ({ callToAction, menuItems }: FlyoutMenuProps) => {
  const menu = useMenuState();

  return (
    <>
      <MenuButton variant="secondary" {...menu}>
        {callToAction}
      </MenuButton>
      <Menu {...menu} hideOnClickOutside aria-label="Actions">
        {menuItems.map(({ name, href }) => (
          <MenuItem {...menu} key={`menuItem-${name}`} href={href}>
            {name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
