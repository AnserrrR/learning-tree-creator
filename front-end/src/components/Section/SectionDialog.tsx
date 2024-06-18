import React, { useState } from 'react';
import { Box, TextField, Button, Link, Typography, List, ListItem, Dialog, DialogTitle, DialogContent, Tabs, Tab, IconButton, Paper } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const SectionDialog = () => {
  const [value, setValue] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [notes, setNotes] = useState<string[]>([]);
  const [noteValue, setNoteValue] = useState<number>(-1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddNote = () => {
    setNotes([...notes, ""]);
    setNoteValue(notes.length);
  };

  const handleDeleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    if (noteValue === index) {
      setNoteValue(-1);  // Reset if the current note is deleted
    } else if (noteValue > index) {
      setNoteValue(noteValue - 1);  // Adjust if a previous note is deleted
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth maxWidth="md"
        sx={{
          '& .MuiDialog-paper': {
            height: '90vh', // Set the height to 90% of the viewport height
          }
        }}
      >
        <DialogTitle>Section 1</DialogTitle>
        <DialogContent>
          <Box sx={{ width: '100%' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
              TabIndicatorProps={{ style: { display: 'none' } }}
            >
              <Tab
                label="Description"
                {...a11yProps(0)}
                sx={{
                  textTransform: 'none',
                  '&.Mui-selected': { textDecoration: 'underline' }
                }}
              />
              <Tab
                label="Progress"
                {...a11yProps(1)}
                sx={{
                  textTransform: 'none',
                  '&.Mui-selected': { textDecoration: 'underline' }
                }}
              />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Box>
                <Button variant="contained" color="primary" sx={{ mb: 2 }}>Edit</Button>
                <TextField
                  fullWidth
                  multiline
                  rows={15}
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  variant="outlined"
                  sx={{ mb: 2, height: '100%'}}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2,  }}>
                <Box sx={{ flex: 1, mr: 2 }}>
                  <Typography variant="h6">Links:</Typography>
                  <List>
                    <ListItem><Link href="#">First link</Link></ListItem>
                    <ListItem><Link href="#">Second link</Link></ListItem>
                    <ListItem><Link href="#">Third link</Link></ListItem>
                  </List>
                </Box>
                <Box sx={{ flex: 1, ml: 2 }}>
                  <Typography variant="h6">Files:</Typography>
                  <List>
                    <ListItem><Link href="#">first_file.jpg</Link></ListItem>
                    <ListItem><Link href="#">second_file.xlsx</Link></ListItem>
                    <ListItem><Link href="#">third_file.pdf</Link></ListItem>
                  </List>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" sx={{ mr: 2 }}>Complete section</Button>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Completed 1/2</Typography>
                <Tabs
                  value={noteValue}
                  onChange={(e, newValue) => setNoteValue(newValue)}
                  aria-label="notes tabs"
                  sx={{ borderBottom: 1, borderColor: 'divider' }}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {notes.map((note, index) => (
                    <Tab
                      key={index}
                      label={`Note ${index + 1}`}
                      {...a11yProps(index + 2)}
                      sx={{
                        textTransform: 'none',
                        '&.Mui-selected': { textDecoration: 'underline' }
                      }}
                    />
                  ))}
                  <Tab
                    label={<AddIcon />}
                    onClick={handleAddNote}
                    {...a11yProps(notes.length + 2)}
                    sx={{ minWidth: '40px' }}
                  />
                </Tabs>
                {notes.map((note, index) => (
                  <TabPanel key={index} value={noteValue} index={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                      <IconButton>
                        <CheckIcon />
                      </IconButton>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteNote(index)} sx={{ mr: 1 }}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    <TextField
                      fullWidth
                      multiline
                      rows={15}
                      value={note}
                      variant="outlined"
                      onChange={(e) => {
                        const updatedNotes = [...notes];
                        updatedNotes[index] = e.target.value;
                        setNotes(updatedNotes);
                      }}
                    />
                  </TabPanel>
                ))}
              </Box>
            </TabPanel>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SectionDialog;
