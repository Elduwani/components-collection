import React from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom"
import { ProvideAuth } from "./auth/use-auth.js"
import Calculator from "./components/calculator"
import Pages from "./components/Pages.js"
import Progress from "./components/progress/Progress"

function App() {
  return (
    <Router>
      <ProvideAuth>
        <div className="body-container">
          <Switch>
            {/* <Route exact path='/account' render={(props) => <Signin />} /> */}
            <Route exact path='/' component={Pages} />
            <Route exact path='/progress' component={Progress} />
            <Route path='/calculator' component={Calculator} />
          </Switch>
        </div>
      </ProvideAuth>
    </Router>
  );
}

export default App;
