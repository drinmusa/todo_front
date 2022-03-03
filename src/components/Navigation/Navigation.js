import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuthToken, deleteAuthToken } from "../../helpers/token";

import "./Navigation.css";

const Navigation = () => {
  const token = getAuthToken();
  const navigate = useNavigate();
  const logout = () => {
    deleteAuthToken();
    navigate("/login");
  };

  return (
    <div className="container">
      <nav>
        <ul className="nav">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          {!token && (
            <>
              <li className="link">
                <Link to="/login">Login</Link>
              </li>
              <li className="link">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
          {token && (
            <>
              <li className="link">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li onClick={logout}>Logout</li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
