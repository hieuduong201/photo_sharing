import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { resetUser, updateUser } from "../../redux/slices/UserSlice";
import axios from "axios";
import { matchPath, useMatch, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TopBar = () => {
   
  const location=useLocation()
  const userMatch = matchPath("/users/:userId", location.pathname);
  const photoMatch = matchPath("/photos/:userId", location.pathname);
  const userId = userMatch?.params?.userId || photoMatch?.params?.userId;
  const [user,setUser]=useState("")
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const fetchUser=async()=>{
    const res=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/getdetail/${userId}`)
    setUser(res.data)

  }
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const payload = JSON.parse(savedUser);
      if (payload && payload._id) {
        dispatch(updateUser(payload));
      }
      fetchUser()
    }
   
    
   
  }, [location]);
  const handleLogout =  () => {
    try {
      dispatch(resetUser()); 
      localStorage.removeItem("user"); 
     
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {currentUser.first_name  ? `Hi ${currentUser.first_name}` : "Please Login"}
        </Typography>
         <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {userMatch&&(<p>{user.first_name}</p>)}
          {photoMatch&&(<p>{`Photo of ${user.first_name}`}</p>)}
        </Typography>
        {currentUser.first_name  ? (
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
