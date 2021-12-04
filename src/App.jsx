import './App.less';
import HomePage from './components/HomePage.jsx';

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


function App() {

  // state hook for price
  const [price, setPrice] = useState(0);


  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route component={NotFoundPage}/> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
