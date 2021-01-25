import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom"
import Default from "./components/Default"
import Calculator from "./components/calculator"
import Pages from "./components/Pages"
import Walker from "./components/walker"

function App() {
  return (
    <Router>
      <div className="mx-auto flex flex-col items-center">
        {/* <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/calculator">Calculator</Link>
          <Link to="/walker">Walker Algo</Link>
        </nav> */}
        <Switch>
          <Route exact path='/' component={Pages} />
          <Route exact path='/calculator' component={Calculator} />
          <Route exact path='/walker' component={Walker} />
          <Route path='*' component={Default} />
        </Switch>

        <footer className="text-xs text-gray-700 text-center py-4">❤ @elduwani</footer>
      </div>
    </Router>
  );
}

export default App;
