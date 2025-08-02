import { Link, useLocation } from "react-router-dom";
import Logo from "/logo.png";
import Button from "./Button";
import { useWorldWise } from "../contexts/useWorldWise";
import { useEffect, useState } from "react";
export default function NavBar() {
  const { login } = useWorldWise();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  useEffect(() => {
    console.log(location);
  }, [location]);
  return (
    <div className="navigation">
      <Link to="/">
        <img src={Logo} alt="Logo" height="52px" />
      </Link>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link
          to="/budgeting"
          className={`pricing ${
            location.pathname === "/budgeting" ? "active" : ""
          }`}
          style={{
            color: location.pathname === "/budgeting" ? "#00c46a" : "white",
          }}
        >
          BUDGET
        </Link>
        <Button to={login ? "/cities" : "/login"} name="LOGIN" />
      </div>
    </div>
  );
}
