import { Link } from "react-router-dom";

const HomePage = () => (
  <div>
    <h1>Welcome to codenames</h1>
    <p>I desigend this game play with my friends and colleages</p>
    <p>
      Click <Link to="/game"> here </Link>to start the game
    </p>
  </div>
);

export default HomePage;
