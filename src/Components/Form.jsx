import { useState } from "react";
import { useWorldWise } from "./useWorldWise"
import Logo from "/logo.png";
import { Link, useNavigate } from "react-router-dom";

export default function Form() {
    const {currentSelection,dispatch}=useWorldWise();
    const navigate=useNavigate();
    const today = new Date().toISOString().split('T')[0];
    const [time,setTime]=useState();
    const [note,setNote]=useState();
  return (
    <div>
        <Link to="/">
            <img src={Logo} alt="Logo" height="52px"/>
        </Link>
        <button  onClick={()=>{navigate("/");dispatch({type:"logout"})}}>LOGOUT</button>
       
        {currentSelection.city==="" && <p>👋 Add your first city by clicking on a city on the map</p>}
        {currentSelection.city!=="" && <form>
            <label>City name</label>
            <input type="text" name="city" value={currentSelection.city}/>
            <label>When did you go to {currentSelection.city}?</label>
            <input type="date" name="date" value={today} onChange={(e)=>setTime(e.target.value)}/>
            <label>Notes about your trip to O Bolo</label>
            <textarea rows={2} onChange={(e)=>setNote(e.target.value)}></textarea>
            <div>
                <button onClick={(e)=>{e.preventDefault();dispatch({type:"add clicked",date:time,note:note});dispatch({type:"set_location",currentSelection:currentSelection});navigate("/cities")}}>Add</button>
                <button onClick={()=>window.history.back()}>← BACK</button>
            </div>
        </form>}
    </div>
  )
}
