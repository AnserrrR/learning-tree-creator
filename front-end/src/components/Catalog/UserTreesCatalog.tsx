import TreeCard from './TreeCard';
import { Card, CardContent, CardMedia, Grid, IconButton, InputBase, Pagination, Paper, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import { useGetUserTreesQuery } from '../../api/generated/graphql';

import treeImage from './tree_image.png';

const UserTreesCatalog = () => {
  const userTrees = useGetUserTreesQuery({ variables: { input: {} } })
    .data?.getFilteredUserTrees || [];

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
          {userTrees.map((tree) => (
            <Grid
              item
              key={tree.id}
              xs={12}
              sm={6}
              md={4}
            >
              <TreeCard
                id={tree.id}
                heading={tree.name}
                description={tree.description}
                image={treeImage}
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
