import './App.css';

import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister";
import { updateUser } from './redux/slices/UserSlice';
import AddPhoto from './components/AddPhoto';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      
        const payload = JSON.parse(savedUser);
        if (payload && payload._id) {
          dispatch(updateUser(payload));
        }
      
    }
  }, []);

  return (
    <>
      <TopBar />
      <Routes>
        {/* Login page */}
        <Route
          path="/login"
          element={
             <LoginRegister />
          }
        />
       

        {/* App content, protected routes */}
        <Route
          path="/*"
          element={
           
              <Grid container spacing={2}>
                <div className="main-topbar-buffer" />
                <Grid item sm={3}>
                  <Paper className="main-grid-item">
                    {user._id &&(<UserList />)}
                    
                  </Paper>
                </Grid>
                <Grid item sm={9}>
                  <Paper className="main-grid-item">
                    {user._id &&(<Routes>
                      <Route path="/users/:userId" element={<UserDetail />} />
                      <Route path="/photos/:userId" element={<UserPhotos />} />
                       <Route
          path='/addphoto'
          element={<AddPhoto/>}
          >
          
          </Route>
                    </Routes>)}
                  </Paper>
                </Grid>
              </Grid>
           
          }
        />
      </Routes>
    </>
  );
};

const Root = () => (
  <Router>
    <App />
  </Router>
);

export default Root;
