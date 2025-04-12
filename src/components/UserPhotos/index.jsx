import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import models from '../../modelData/models';

const UserPhotos = () => {
  const { userId } = useParams();
  const photos = models.photoOfUserModel(userId);

  return (
    <div>
      {photos.map(photo => (
        <Card key={photo._id} style={{ marginBottom: '16px' }}>
          <img
            className='img-resize'
            src={`/images/${photo.file_name}`}
            alt="User Upload"
          />
          <CardContent>
            <Typography variant="body2">
              Ngày đăng: {new Date(photo.date_time).toLocaleString()}
            </Typography>
            {photo.comments && photo.comments.map(comment => (
              <div key={comment._id} style={{ marginTop: '8px' }}>
                <Typography variant="caption">
                  {new Date(comment.date_time).toLocaleString()} -{' '}
                  <Link to={`/users/${comment.user._id}`}>
                    {`${comment.user.first_name} ${comment.user.last_name}`}
                  </Link>: {comment.comment}
                </Typography>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserPhotos;
