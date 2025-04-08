import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useWorldWise } from "./useWorldWise";
import { useNavigate } from "react-router-dom";

function LocationMarker() {
  const { dispatch, locationInfo } = useWorldWise();
  const navigate=useNavigate();

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await res.json();
        const city =
          data.address.city || data.address.town || data.address.village || "";
        const country = data.address.country || "";
        dispatch({
          type: "form trigger when clicked",
          city: city,
          country: country,
          position: e.latlng,
        });
        navigate("/form")
        console.log(city);
      } catch (err) {
        console.error("Failed to reverse geocode:", err);
      }
    },
  });

  return locationInfo[0].position === null ? null : (
    <>
      {locationInfo.map((item, index) => (
        <Marker position={item.position} key={index}>
          <Popup>
            You are here: <br />
            Lat: {item.position?.lat.toFixed(4)}, Lng:{" "}
            {item.position?.lng.toFixed(4)} <br />
            {item?.city && `City: ${item.city}`} <br />
            {item?.country && `Country: ${item.country}`}
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export default function Map() {
  return (
    <MapContainer
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "50%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}
