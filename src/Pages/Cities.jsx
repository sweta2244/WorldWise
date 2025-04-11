import MarkedCity from "../Components/MarkedCity";
import Map from "../Components/Map";
import useGeoLocation from "../Hooks/useGeoLocation";

export default function Cities() {
  const{myLat,myLng,handleYourLocation}=useGeoLocation();

  return (
    <div className="cities-section">
      <MarkedCity />
      <Map myLat={myLat} myLng={myLng} />
      <button onClick={handleYourLocation} style={{position:"absolute",bottom:"10%",right:"25%",zIndex:"1111",padding:"10px 30px",borderRadius:"5px",borderStyle:"none",backgroundColor:"#00c46a"}}>Your Location</button>
    </div>
  );
}
