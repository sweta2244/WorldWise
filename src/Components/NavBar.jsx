import { Link, useLocation } from "react-router-dom";
import Logo from "/logo.png";
import Button from "./Button";
import { useWorldWise } from "./useWorldWise";
import { useEffect } from "react";
export default function NavBar() {
  const {login}=useWorldWise();
  const location=useLocation();
  useEffect(()=>{
    console.log(location);
  },[location]);
  return (
    <div className="navigation">
      <Link to="/">
        <img src={Logo} alt="Logo" height="52px"/>
      </Link>
      <div className="pricing-product">
        <Link to="/pricing" className="pricing" style={{color:location.pathname==="/pricing"?"#00c46a":"white"}}>PRICING</Link>
        <Link to="/product" className="product" style={{color:location.pathname==="/product"?"#00c46a":"white"}}>PRODUCT</Link>
        <Button to={login? "/cities":"/login"} name="LOGIN"/>
      </div>
    </div>
  )
}
