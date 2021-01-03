import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./assets/main.css";
import Game from "./components/Game";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import GameBoard from "./components/GameBoard";
import SpyMaster from "./components/SpyMaster";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/dashboard/:id" children={<Dashboard />} />
        <Route path="/playing/:id" children={<GameBoard />} />
        <Route path="/spy-master/:id" children={<SpyMaster />} />
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
