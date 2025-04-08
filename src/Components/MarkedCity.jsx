import { useState } from "react";
import { useWorldWise } from "./useWorldWise";
import Logo from "/logo.png";
import { Link, useNavigate } from "react-router-dom";

export default function MarkedCity() {
    const {locationInfo,dispatch}=useWorldWise();
    const [cityEnable,setCityEnable]=useState(true);
    const navigate=useNavigate();
    
  return (
    <div>
        <Link to="/">
            <img src={Logo} alt="Logo" height="52px"/>
        </Link>
        <button  onClick={()=>{navigate("/");dispatch({type:"logout"})}}>LOGOUT</button>
        <button onClick={()=>setCityEnable(true)}>Cities</button>
        <button onClick={()=>setCityEnable(false)}>Countries</button>
        {cityEnable && locationInfo.map((item,index)=><div className="individual-markedcity" key={index}>
            {item.city && <span>{item.city}</span>}{" "}
            {item.city && <button onClick={()=>dispatch({type:"remove",index:index})} className="btn">&times;</button>}
        </div>)}
        {!cityEnable && locationInfo.map((item,index)=><div className="individual-markedcity" key={index}>
            {item.country && <span>{item.country}</span>}{" "}
        </div>)}
    </div>
  )
}
