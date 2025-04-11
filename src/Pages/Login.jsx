import React from "react";
import { useWorldWise } from "../contexts/useWorldWise";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";

export default function Login() {
  const navigate = useNavigate();
  const { email, password, dispatch } = useWorldWise();
  return (
    <>
      <NavBar />
      <div className="login-section">
        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            email === "jack@example.com" && password === "sweta"
              ? (navigate("/cities"), dispatch({ type: "login success" }))
              : alert("Invalid credentials!");
          }}
        >
          <label>Email address</label>
          <input
            type="email"
            name="email"
            onChange={(e) =>
              dispatch({ type: "login email", data: e.target.value })
            }
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) =>
              dispatch({ type: "login password", data: e.target.value })
            }
          />
          <button className="login" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
