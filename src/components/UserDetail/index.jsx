import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const UserDetail = () => {
  const currentUser=useSelector((state)=>(state.user))
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/getdetail/${userId}`);
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [userId]);

  if (!user) return <Typography>Loading...</Typography>;

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
