import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGetCurrentUserQuery, useLogoutMutation } from '../../api/generated/graphql';
import { useEffect, useState } from 'react';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { logout, token } = useAuth();
  const [ logoutMutation ] = useLogoutMutation();

  const {
    data: currentUserData,
    refetch: updateCurrentUser,
  } = useGetCurrentUserQuery();

  const userEmail = currentUserData?.getCurrentUser?.email || '' as string;
  useEffect(() => { updateCurrentUser() }, [token, updateCurrentUser]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await logoutMutation();
    logout();
    handleClose();
  }


  return (
    <>
      <Button
        id="user-menu-button"
        startIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        variant={'outlined'}
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {userEmail.replace(/@.*/, '')}
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'user-menu-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My trees</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  )
};
export default UserMenu;
