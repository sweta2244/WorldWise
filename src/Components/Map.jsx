import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useWorldWise } from "../contexts/useWorldWise";
import { useNavigate } from "react-router-dom";

function LocationMarker() {
  const { dispatch, locationInfo } = useWorldWise();

  const navigate = useNavigate();
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();
        const city = data.city || data.locality || "";
        const country = data.countryName;
        const code = data.countryCode;

        dispatch({
          type: "form trigger when clicked",
          city: city,
          country: country,
          position: e.latlng,
          code: code,
          lat: lat,
          lng: lng,
        });
        navigate(`/form?lat=${lat}&lng=${lng}`);
      } catch (err) {
        console.error("Failed to reverse geocode:", err);
      }
    },
  });

  return locationInfo.length > 0 ? (
    <>
      {locationInfo.map((item, index) =>
        item?.position ? (
          <Marker position={item?.position} key={index}>
            <Popup>
              You are here: <br />
              Lat: {item?.position?.lat.toFixed(4)}, Lng:{" "}
              {item?.position?.lng.toFixed(4)} <br />
              {item?.city && `City: ${item.city}`} <br />
              {item?.country && `Country: ${item.country}`}
            </Popup>
          </Marker>
        ) : null
      )}
    </>
  ) : null;
}

export default function Map({ myLat = 51.505, myLng = -0.09 }) {
  return (
    <MapContainer
      key={`${myLat}-${myLng}`} // Forces re-render on location change
      center={[myLat, myLng]}
      zoom={43}
      scrollWheelZoom={true}
      className="map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeCenter position={{lat:myLat,lng:myLng}}/>
      <LocationMarker />
    </MapContainer>
  );
}

function ChangeCenter({position}){
  const map=useMap();
  map.setView(position);
  console.log(position);
  return null;
}