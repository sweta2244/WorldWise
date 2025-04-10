import MarkedCity from "../Components/MarkedCity";
import Map from "../Components/Map";
import { useState } from "react";

export default function Cities() {
  const [myLat, setMyLat] = useState();
  const [myLng, setMyLng] = useState();

  function handleYourLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMyLat(position.coords.latitude);
        setMyLng(position.coords.longitude);
      },
      () => {
        alert("Unable to retrieve your location.");
      }
    );
    console.log(myLat);
    console.log(myLng);
  }

  return (
    <div className="cities-section">
      <MarkedCity />
      <Map myLat={myLat} myLng={myLng} />
      <button onClick={handleYourLocation}>Your Location</button>
    </div>
  );
}
