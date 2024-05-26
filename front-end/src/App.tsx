import React, { useState } from 'react';
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import Header from './components/Header/Header';

import './App.css';
import Flow from './components/Flow/Flow';
import Box from '@mui/material/Box';

function App() {
  const [mode, setMode] = useState<PaletteMode>('light');
  const defaultTheme = createTheme({ palette: { mode } });
  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header mode={mode} toggleColorMode={toggleColorMode} />
      <Box sx={{ bgcolor: 'background.default'}}>
        <Flow />
      </Box>
    </ThemeProvider>
  );
}

export default App;
