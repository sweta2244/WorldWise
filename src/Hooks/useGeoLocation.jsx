import React, { useState } from 'react'

export default function useGeoLocation() {
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
      }
  return ({myLat,myLng,handleYourLocation})
}
