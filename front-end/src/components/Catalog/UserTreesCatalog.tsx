import TreeCard from './TreeCard';
import { Card, CardContent, CardMedia, Grid, IconButton, InputBase, Pagination, Paper, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';

import tree from './tree_image.png';

const trees = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  heading: `Tree example ${index + 1}`,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  image: tree,
}));

const UserTreesCatalog = () => {
  return (
    <Container>
      <Box sx={{ mt: 14 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Trees
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'left', my: 4 }}>
          <Paper
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 300,
              height: 40,
              boxShadow: 3,
            }}
          >
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Paper>
        </Box>
        <Grid container spacing={4}>
          {trees.map(tree => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tree.id}>
              <TreeCard
                image={tree.image}
                heading={tree.heading}
                description={tree.description}
              />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination count={8}  page={1} />
        </Box>
      </Box>
    </Container>
  );
}
export default UserTreesCatalog;
