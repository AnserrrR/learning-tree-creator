import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface TreeCardProps {
  image: string;
  heading: string;
  description: string;
}

const TreeCard = ({ image, heading, description }: TreeCardProps) => (
  <Card sx={{ boxShadow: 3 }}>
    <CardMedia
      component="img"
      height="140"
      image={image}
      alt="Tree image"
    />
    <CardContent>
      <Typography variant="h5" component="div">
        {heading}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default TreeCard;
