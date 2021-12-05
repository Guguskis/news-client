// import './App.css';
import HomePage from './components/HomePage.jsx';

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material/Box';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#212121',
      paper: '#424242',
    },
  },
});


function App() {
  // add dark background color to Box component 
  // <Box sx={{border: "1px solid red" }}>
  // </Box>




  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route component={NotFoundPage}/> */}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
