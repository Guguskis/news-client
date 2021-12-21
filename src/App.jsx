// import './App.css';
import HomePage from './components/HomePage.jsx';

import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#90caf9',
    },
    text: {
      primary: '#90caf9',
      secondary: '#6098c6',
      disabled: '#6098c6',
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

toast.configure({
  position: "top-right",
  autoClose: 5000
})

function App() {
  return (
    <ThemeProvider theme={theme} >
      <LocalizationProvider dateAdapter={DateAdapter}>
        <ToastContainer />
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            {/* <Route component={NotFoundPage}/> */}
          </Switch>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
