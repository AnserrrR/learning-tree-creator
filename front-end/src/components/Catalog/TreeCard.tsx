import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface TreeCardProps {
  id: string;
  image: string;
  heading: string;
  description: string;
}

const TreeCard = ({ id, image, heading, description }: TreeCardProps) => {
  const navigate = useNavigate();

  const handleDoubleClick = () => {
    console.log('Double click');
    navigate(`/tree/${id}`);
  };

  return (
    <Card sx={{boxShadow: 3}} onDoubleClick={handleDoubleClick}>
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
  )
};

export default TreeCard;
