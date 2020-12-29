import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./assets/main.css";
import Game from "./components/Game";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/playing/:id" children={<Dashboard />} />
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
