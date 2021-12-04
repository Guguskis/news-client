import './App.css';
import HomePage from './components/HomePage.jsx';

import React, { useState, useEffect } from "react";
import { StylesProvider, createGenerateClassName } from '@mui/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
});

function App() {

  // state hook for price
  const [price, setPrice] = useState(0);


  return (
    // <StylesProvider generateClassName={generateClassName}>
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route component={NotFoundPage}/> */}
        </Switch>
      </Router>
      </>
    // </StylesProvider >
  );
}

export default App;
