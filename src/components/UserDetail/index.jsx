import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import models from '../../modelData/models';

const UserDetail = () => {
  const { userId } = useParams();
  const user = models.userModel(userId);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">
          {`${user.first_name} ${user.last_name}`}
        </Typography>
        <Typography variant="body1">Location: {user.location}</Typography>
        <Typography variant="body2">Description: {user.description}</Typography>
        <Typography variant="body2">Occupation: {user.occupation}</Typography>
        <Button
          component={Link}
          to={`/photos/${user._id}`}
          color="primary"
        >
          View user's Photos
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserDetail;
