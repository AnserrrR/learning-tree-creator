import React, { useState } from 'react';
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import Header from './components/Header/Header';
import Flow from './components/Flow/Flow';
import Box from '@mui/material/Box';
import { ReactFlowProvider } from 'reactflow';

import './App.css';
import TreePanel from './components/TreePanel/TreePanel';

const App = () => {
  const [mode, setMode] = useState<PaletteMode>('light');
  const defaultTheme = createTheme({ palette: { mode } });
  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <ReactFlowProvider>
        <Header mode={mode} toggleColorMode={toggleColorMode} />
        <TreePanel />
        <Box sx={{ bgcolor: 'background.default'}}>
          <Flow />
        </Box>
      </ReactFlowProvider>
    </ThemeProvider>
  );
};

export default App;
