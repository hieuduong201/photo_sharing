import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import models from '../../modelData/models';
import { useEffect,useState } from 'react';
import fetchModel from '../../lib/fetchModelData';

const UserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchModel("/api/user")
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user`);
  //     const data = await response.json();
  //     setUsers(data);
  //   };
  //   fetchUsers();

  // },[])

  return (
    <List>
      {users.map(user => (
        <ListItem
          button
          key={user._id}
          component={Link}
          to={`/users/${user._id}`}
        >
          <ListItemText primary={` ${user.first_name} ${user.last_name}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
