import { useState } from "react";
import { useWorldWise } from "./useWorldWise";
import Logo from "/logo.png";
import { Link, useNavigate } from "react-router-dom";

export default function MarkedCity() {
  const { locationInfo, dispatch } = useWorldWise();
  const [cityEnable, setCityEnable] = useState(true);
  const navigate = useNavigate();

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
                onClick={() => setCityEnable(true)}
                className={`citiesbtn ${cityEnable ? "active" : ""}`}
              >
                Cities
              </button>
              <button
                onClick={() => setCityEnable(false)}
                className={`citiesbtn ${cityEnable ? "" : "active"}`}
              >
                Countries
              </button>
          </div>
          {locationInfo.length === 0 && (
            <p style={{color:"white"}}>👋 Add your first city by clicking on a city on the map</p>
          )}
          {cityEnable &&
            locationInfo.length !== 0 &&
            locationInfo.map((item, index) => (
              <div className="individual-markedcity" key={index}>
                <div>
                  {item.countryCode && (
                    <span style={{ marginRight: "20px" }}>
                      {item.countryCode}
                    </span>
                  )}{" "}
                  {item.city && <span>{item.city}</span>}{" "}
                </div>
                <div>
                  {item.date && (
                    <span style={{ marginRight: "20px" }}>({item.date})</span>
                  )}{" "}
                  {item.city && (
                    <button
                      onClick={() => dispatch({ type: "remove", index: index })}
                      className="btn"
                    >
                      &times;
                    </button>
                  )}
                </div>
              </div>
            ))}
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
