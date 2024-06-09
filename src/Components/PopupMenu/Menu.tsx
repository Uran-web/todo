import React, { ReactNode } from 'react';
import { SvgIconProps } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export interface IMenuElement {
  name: string;
  icon: ReactNode | React.ComponentType<SvgIconProps>;
  userLogout: () => void;
}

export interface ICustomMenu {
  open: boolean;
  elements: IMenuElement[];
  anchorElement: HTMLElement | null;
  handleClose: () => void;
}

const CustomMenu: React.FC<ICustomMenu> = ({
  open,
  elements,
  anchorElement,
  handleClose,
}) => {
  return (
    <Menu
      open={open}
      id="nav-menu"
      anchorEl={anchorElement}
      onClose={handleClose}
    >
      {elements.map((element) => (
        <MenuItem key={element.name} onClick={element.userLogout}>
          <ListItemIcon>{element.icon as ReactNode}</ListItemIcon>
          <ListItemText>{element.name}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default CustomMenu;
