import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ isLoggedIn }) {

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 10px'
  };

  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Trip-Gen
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Trip-Gen
          </Typography>
          {!isLoggedIn ? (<>
            <Link to="/login" style={linkStyle} color="inherit">Login</Link>
            <Link to="/signup" style={linkStyle} color="inherit">Sign Up</Link>
          </>): (<>
            <Link to="/new_itinerary" style={linkStyle} color="inherit">Create itinerary</Link>
            <Link to="/existing_itineraries" style={linkStyle} color="inherit">Existing itineraries</Link>
          </>)}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
