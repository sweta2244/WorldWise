import { Link } from "react-router-dom";

export default function Button({to,name}) {
  return (
    <Link to={to} className="login">{name}</Link>
  )
}
