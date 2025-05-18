import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import models from '../../modelData/models';
import { useEffect,useState } from 'react';
import fetchModel from '../../lib/fetchModelData';
const UserPhotos = () => {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchModel(`/api/photo/${userId}`)
      .then(data => setPhotos(data))
      .catch(err => console.error(err));
    fetchModel("/api/user")
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);
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
              Posting Date: {new Date(photo.date_time).toLocaleString()}
            </Typography>
            {photo.comments && photo.comments.map(comment => (
              <div key={comment._id} style={{ marginTop: '8px' }}>
                <Typography variant="caption">
                  <p >{new Date(comment.date_time).toLocaleString()}</p>
                  {users.find(user => user._id === comment.user_id) ? (
                  <Link to={`/users/${comment.user_id}`}>
                    {users.find(user => user._id === comment.user_id).first_name}{" "}
                    {users.find(user => user._id === comment.user_id).last_name}
                  </Link>
                ) : (
                  <span>Unknown User</span>
                )}

                  : {comment.comment}
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
