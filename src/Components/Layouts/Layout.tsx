import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

import authUser from '../../stores/loginStore';
import CustomMenu, { IMenuElement } from '../PopupMenu/Menu';
import Loader from '../Loader/Loader';

import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { StyledLayoutSection, StyledNav } from './style';

export interface LayoutProps {
  children: React.ReactNode;
}

export interface INavbarItems {
  navItem: string;
}

const Layout: React.FC<LayoutProps> = observer(({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { user, logout, isLoadingUserAuth } = authUser;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout({ navigate });
  };

  const menuElements: IMenuElement[] = [
    {
      name: 'Logout',
      icon: <LogoutIcon fontSize="small" />,
      userLogout: () => handleLogout(),
    },
  ];

  const navbarItems: INavbarItems[] = [{ navItem: user?.email as string }];

  if (isLoadingUserAuth) {
    return <Loader />;
  }
  return (
    <StyledLayoutSection>
      <StyledNav>
        {navbarItems.map((navbarItem) => (
          <span key={navbarItem.navItem}>{navbarItem.navItem}</span>
        ))}
        <IconButton
          id="gear"
          aria-label="menu"
          size="large"
          onClick={handleClick}
          aria-controls={open ? 'nav-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <SettingsIcon fontSize="large" />
        </IconButton>
        <CustomMenu
          open={open}
          elements={menuElements}
          anchorElement={anchorEl}
          handleClose={handleClose}
        />
      </StyledNav>
      <div>{children}</div>
    </StyledLayoutSection>
  );
});

export default Layout;
