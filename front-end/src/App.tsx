import React from 'react';
import './App.css';
import 'reactflow/dist/style.css';
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import Header from './components/Header/Header';
import { Background, BackgroundVariant, Controls, MiniMap, ReactFlow } from 'reactflow';
import Box from '@mui/material/Box';

function App() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const defaultTheme = createTheme({ palette: { mode } });
  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
  return (
    <ThemeProvider theme={defaultTheme}>
      <Header mode={mode} toggleColorMode={toggleColorMode} />
      <Box sx={{ bgcolor: 'background.default'}}>
        <div style={{ width: '100%', height: '100vh' }}>
          <ReactFlow nodes={initialNodes} edges={initialEdges} >
            <Controls/>
            <MiniMap/>
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default App;
