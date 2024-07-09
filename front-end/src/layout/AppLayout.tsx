import Header from '../components/Header/Header';
import React, { useState } from 'react';
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  const [mode, setMode] = useState<PaletteMode>('light');
  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };
  const defaultTheme = createTheme({ palette: { mode } });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header mode={mode} toggleColorMode={toggleColorMode} />
      <Box sx={{ bgcolor: 'background.default'}}>
        <Outlet />
      </Box>
    </ThemeProvider>
  )
};
export default AppLayout;
