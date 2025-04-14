import { useState } from "react";
import { useWorldWise } from "../contexts/useWorldWise";
import Logo from "/logo.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function MarkedCity() {
  const { locationInfo, dispatch } = useWorldWise();
  const [cityEnable, setCityEnable] = useState(true);
  const navigate = useNavigate();
  const [description, setDescription] = useState(false);
  const [searchParams] = useSearchParams();
  const urlLat = searchParams.get("lat");
  const urlLng = searchParams.get("lng");
  const selectedCity = locationInfo.find(
    (item) =>
      item?.position?.lat.toString() === urlLat &&
      item?.position?.lng.toString() === urlLng
  );

  return (
    <div className="form-markedcity">
      <Link to="/" className="logo-section">
        <img src={Logo} alt="Logo" height="52px" />
      </Link>
      <button
        onClick={() => {
          navigate("/");
          dispatch({ type: "logout" });
        }}
        className="logout"
      >
        LOGOUT
      </button>
      <div className="city-countries">
        <div>
          <button
            onClick={() => {
              setCityEnable(true);
              setDescription(false);
            }}
            className={`citiesbtn ${cityEnable ? "active" : ""}`}
          >
            Cities
          </button>
          <button
            onClick={() => {
              setCityEnable(false);
              setDescription(false);
            }}
            className={`citiesbtn ${cityEnable ? "" : "active"}`}
          >
            Countries
          </button>
        </div>
        {!description && (
          <div>
            {locationInfo.length === 0 && (
              <p style={{ color: "white" }}>
                👋 Add your first city by clicking on a city on the map
              </p>
            )}
            {cityEnable &&
              locationInfo.length !== 0 &&
              locationInfo.map((item, index) => (
                <div style={{ position: "relative" }} key={index}>
                  <div
                    className="individual-markedcity"
                    onClick={() => {
                      navigate(
                        `/cities?lat=${item.position.lat}&lng=${item.position.lng}`
                      );
                      setDescription(true);
                    }}
                  >
                    <div>
                      {item?.countryCode && (
                        <span style={{ marginRight: "20px" }}>
                          {item.countryCode}
                        </span>
                      )}{" "}
                      {item?.city && <span>{item.city}</span>}{" "}
                    </div>
                    {item?.date && (
                      <span style={{ marginRight: "20px" }}>({item.date})</span>
                    )}{" "}
                  </div>
                  {item?.city && (
                    <button
                      style={{
                        position: "absolute",
                        right: "5px",
                        top: "12px",
                      }}
                      onClick={() => {
                        dispatch({ type: "remove", index: index });
                      }}
                      className="btn"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
          </div>
        )}
        {description && (
          <div className="description">
            <h4>CITY NAME</h4>
            <p>
              {selectedCity?.countryCode} {selectedCity?.city}
            </p>
            <h4> YOU WENT TO {selectedCity?.city} ON</h4>
            <p>{selectedCity?.date}</p>
            {selectedCity?.note && <p>NOTE:{selectedCity?.note}</p>}
            <button
              className="login btn-back"
              onClick={() => {
                navigate("/cities");
                setDescription(false);
              }}
            >
              ← BACK
            </button>
          </div>
        )}
        {!cityEnable &&
          locationInfo.map((item, index) => (
            <div className="individual-markedcity" key={index}>
              {item.country && <span>{item.country}</span>}{" "}
            </div>
          ))}
      </div>
    </div>
  );
}