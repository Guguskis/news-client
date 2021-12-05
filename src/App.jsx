// import './App.css';
import HomePage from './components/HomePage.jsx';

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

  return (
    <ThemeProvider theme={theme}>
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
