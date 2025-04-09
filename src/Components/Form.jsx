import { useState } from "react";
import { useWorldWise } from "./useWorldWise"
import Logo from "/logo.png";
import { Link, useNavigate } from "react-router-dom";

export default function Form() {
    const {currentSelection,dispatch}=useWorldWise();
    const navigate=useNavigate();
    const today = new Date().toISOString().split('T')[0];
    const [date,setDate]=useState(today);
    const [note,setNote]=useState();
  return (
    <div className="form-markedcity">
        <Link to="/" className="logo-section">
            <img src={Logo} alt="Logo" height="52px"/>
        </Link>
        <button  onClick={()=>{navigate("/");dispatch({type:"logout"})}} className="logout">LOGOUT</button>
       
        <div className="city-countries">
            {currentSelection.city!=="" && <form className="form" onSubmit={(e)=>{e.preventDefault();dispatch({type:"set_location",note:note,date:date});navigate("/cities");}}>
                <label>City name</label>
                <input type="text" name="city" value={currentSelection.city}/>
                <label>When did you go to {currentSelection.city}?</label>
                <input type="date" name="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
                <label>Notes about your trip to {currentSelection.city}</label>
                <textarea rows="10" onChange={(e)=>setNote(e.target.value)}/>
                <div className="btn-section">
                    <button type="submit" className="login">Add</button>
                    <button className="login btn-back" type="button" onClick={()=>navigate("/cities")}>← BACK</button>
                </div>
            </form>}
        </div>
    </div>
  )
}
