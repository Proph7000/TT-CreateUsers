import React from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Typography } from '@mui/material';
import { AddUser } from './pages/addUser';
import { HomePage } from './pages/homePage';
import { Users } from './pages/users';
import { AppBarTop } from './components/appBarTop';

export const App: React.FC = () => {
  return (
    <>
      <AppBarTop />

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="home"
          element={<Navigate to="/" replace />}
        />

        <Route path="/adduser" element={<AddUser />} />
        <Route path="/users" element={<Users />} />
        <Route
          path="*"
          element={(
            <Typography
              variant="h2"
              gutterBottom
              textAlign="center"
              sx={{
                m: 8,
              }}
            >
              Page not found
            </Typography>
          )}
        />
      </Routes>
    </>
  );
};
