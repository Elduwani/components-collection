import React from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom"
import { ProvideAuth } from "./auth/use-auth.js"
import Tasks from "./components/Tasks"
import Calculator from "./calculator"

function App() {
  return (
    <Router>
      <ProvideAuth>
        <div className="container">
          <Switch>
            {/* <Route exact path='/account' render={(props) => <Signin />} /> */}
            <Route exact path='/tasks' component={Tasks} />
            <Route path='/' component={Calculator} />
          </Switch>
        </div>
      </ProvideAuth>
    </Router>
  );
}

export default App;