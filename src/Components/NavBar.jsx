import { Link } from "react-router-dom";
import Logo from "/logo.png";
import Button from "./Button";
import { useWorldWise } from "./useWorldWise";
export default function NavBar() {
  const {login}=useWorldWise();
  return (
    <div className="navigation">
      <Link to="/">
        <img src={Logo} alt="Logo" height="52px"/>
      </Link>
      <div className="pricing-product">
        <Link to="/pricing" className="pricing">PRICING</Link>
        <Link to="/product" className="product">PRODUCT</Link>
        <Button to={login? "/cities":"/login"} name="LOGIN"/>
      </div>
    </div>
  )
}
