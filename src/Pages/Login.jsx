import React from "react";
import { useWorldWise } from "../Components/useWorldWise";

export default function Login() {
  const { setEmail, setPassword, handleLogin} = useWorldWise();
  return (
    <div className="login-section">
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <label>Email address</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
