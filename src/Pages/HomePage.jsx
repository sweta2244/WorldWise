import { Link } from "react-router-dom";
import Button from "../Components/Button";
import { useWorldWise } from "../Components/useWorldWise";

export default function HomePage() {
    const {login}=useWorldWise();
  
  return (
    <div className="homepage">
      <h1>You travel the world.</h1>
      <h1>WorldWise keeps track of your adventures.</h1>
      <p>
        <b>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </b>
      </p>
      <Button to={login? "/cities":"/login"} name="START TRACKING NOW"/>
    </div>
  );
}
