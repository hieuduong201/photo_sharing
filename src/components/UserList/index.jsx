import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import { useEffect,useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/getall`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  
  useEffect(() => {
    fetchUsers();
  }, []);
  
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
