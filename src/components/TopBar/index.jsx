import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../redux/slices/UserSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TopBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const payload = JSON.parse(savedUser);
      if (payload && payload._id) {
        dispatch(resetUser(payload));
      }
    }
  }, []);
  const handleLogout =  () => {
    try {
      dispatch(resetUser()); 
      localStorage.removeItem("user"); 
      console.log('user',user);
     
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {user.first_name  ? `Hi ${user.first_name}` : "Please Login"}
        </Typography>
        {user.first_name  ? (
          <>
    <Button color="inherit" onClick={() => navigate("/addphoto")}>
      Add Photo
    </Button>
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  </>):(
            <Button color="inherit" onClick={()=>{navigate('/login')}}>
              Login
            </Button> 
          )
        }
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
