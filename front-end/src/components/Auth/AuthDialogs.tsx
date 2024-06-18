import React, { useState } from 'react';
import { Button } from '@mui/material';
import RegisterDialog from './RegisterDialog';
import LoginDialog from './LoginDialog';

const AuthDialogs = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleOpenRegister = () => {
    setOpenRegister(true);
    setOpenLogin(false); // Close Login dialog if open
  };

  const handleOpenLogin = () => {
    setOpenLogin(true);
    setOpenRegister(false); // Close Register dialog if open
  };

  const handleCloseRegister = () => {
    setOpenRegister(false);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpenRegister}>
        Register
      </Button>
      <Button variant="contained" color="primary" onClick={handleOpenLogin} style={{ marginLeft: '10px' }}>
        Login
      </Button>
      <RegisterDialog open={openRegister} onClose={handleCloseRegister} onSwitchToLogin={handleOpenLogin} />
      <LoginDialog open={openLogin} onClose={handleCloseLogin} onSwitchToRegister={handleOpenRegister} />
    </>
  );
};

export default AuthDialogs;
