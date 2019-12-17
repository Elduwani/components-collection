import React from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom"
import Default from "./Default"
import Data from "./components/charts"
import Calculator from "./components/calculator"
import Pages from "./components/Pages"
import Progress from "./components/progress/Progress"

function App() {
  return (
    <Router>
      <div className="body-container">
        <Switch>
          <Route exact path='/' component={Pages} />
          <Route exact path='/progress' component={Progress} />
          <Route path='/calculator' component={Calculator} />
          <Route path='/data' component={Data} />
          <Route path='*' component={Default} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
