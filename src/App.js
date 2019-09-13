import React from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom"
import { ProvideAuth } from "./auth/use-auth.js"
// import Navbar from "./components/Navbar"
// import Signin from "./components/Signin"
import Tasks from "./components/Tasks"

function App() {
  return (
    <Router>
      <ProvideAuth>
        <div className="container">
          <Switch>
            {/* <Route exact path='/account' render={(props) => <Signin />} /> */}
            <Route path='/' component={Tasks} />
          </Switch>
        </div>
      </ProvideAuth>
    </Router>
  );
}

export default App;
