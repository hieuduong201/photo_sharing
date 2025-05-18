import './App.css';

import React, { useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, useMatch } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import models from "./modelData/models";
import { useState } from "react";
import fetchModel from './lib/fetchModelData';

const Layout = ({ children }) => {
  const matchUsers = useMatch("/users/:userId");
  const matchPhotos = useMatch("/photos/:userId");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchModel("/api/user")
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);
  let currentUserName = "";
  const userId = matchUsers?.params?.userId || matchPhotos?.params?.userId;

  if (userId) {
    const user = users.find((e) => e._id === userId);
    currentUserName = user ? `${user.first_name} ${user.last_name}` : "";
  }

  return (
    <>
      <TopBar currentUserName={currentUserName} />
      {children}
    </>
  );
};

const App = () => {
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
