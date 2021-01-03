import { Switch, BrowserRouter as Router, Route } from "react-router-dom"
import Default from "./components/Default"
import Data from "./components/charts"
import Calculator from "./components/calculator"
import Pages from "./components/Pages"
import Walker from "./components/walker"

function App() {
  return (
    <Router>
      <div className="body-container">
        <Switch>
          <Route exact path='/' component={Pages} />
          <Route path='/c/calculator' component={Calculator} />
          <Route path='/c/data' component={Data} />
          <Route path='/c/walker' component={Walker} />
          <Route path='*' component={Default} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
