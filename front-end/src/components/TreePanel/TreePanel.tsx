import React from 'react';
import { Button, ButtonGroup, Container, IconButton, Stack, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const TreePanel: React.FC = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Stack
          position="fixed"
          direction="row"
          spacing={4}
          px={3}
          sx={{
            top: '128px',
            bgcolor: 'transparent',
            boxShadow: 0,
            backgroundImage: 'none',
            zIndex: (theme) => theme.zIndex.drawer,
          }}
        >
          <Typography color="text.primary" variant="h5" sx={{ flexGrow: 1 }}>
            Tree example
            <IconButton color="inherit">
              <MoreVertIcon />
            </IconButton>
          </Typography>
          <ButtonGroup variant="outlined">
            <Button  startIcon={<SaveIcon />}>Save</Button>
            <Button><ShareIcon /></Button>
          </ButtonGroup>
        </Stack>
      </Container>
    </>
  );
};

export default TreePanel;
