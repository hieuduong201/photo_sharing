import './App.css';

import React from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, useMatch } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import models from "./modelData/models";

const Layout = ({ children }) => {
  const matchUsers = useMatch("/users/:userId");
  const matchPhotos = useMatch("/photos/:userId");
  
  let currentUserName = "";
  if (matchUsers && matchUsers.params.userId) {
    const user = models.userModel(matchUsers.params.userId);
    currentUserName = user ? `${user.first_name} ${user.last_name}` : "";
  } else if (matchPhotos && matchPhotos.params.userId) {
    const user = models.userModel(matchPhotos.params.userId);
    currentUserName = user ? `${user.first_name} ${user.last_name}` : "";
  }

  return (
    <>
      <TopBar currentUserName={currentUserName} />
      {children}
    </>
  );
};

const App = (props) => {
  return (
      <Router>
        <Layout>
          <Grid container spacing={2}>
            <div className="main-topbar-buffer" />
            <Grid item sm={3}>
              <Paper className="main-grid-item">
                <UserList />
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="main-grid-item">
                <Routes>
                  <Route path="/users/:userId" element={<UserDetail />} />
                  <Route path="/photos/:userId" element={<UserPhotos />} />
                  <Route path="/users" element={<UserList />} />
                </Routes>
              </Paper>
            </Grid>
          </Grid>
        </Layout>
      </Router>
  );
};

export default App;
