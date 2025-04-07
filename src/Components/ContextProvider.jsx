import { useState } from "react";
import { MyContext } from "./useWorldWise";
import { useNavigate } from "react-router-dom";
export default function ContextProvider({ children }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  function handleLogin() {
    if (email === "jack@example.com" && password === "sweta") {
      setLogin(true);
      navigate("/cities");
    } else alert("Invalid credentials!");
  }
  return (
    <MyContext.Provider
      value={{ email, password, setEmail, setPassword, handleLogin, login }}
    >
      {children}
    </MyContext.Provider>
  );
}
