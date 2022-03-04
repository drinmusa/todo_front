import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuthToken, deleteAuthToken } from "../../helpers/token";

import "./Navigation.css";

const Navigation = () => {
  const token = getAuthToken();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    deleteAuthToken();
    navigate("/login");
  };

  return (
    <div className="container">
      <nav className="navbar">
        <ul className="nav">
          {token && (
            <li>
              <Link
                className={`link ${
                  location.pathname === "/" ? "link-active" : ""
                }`}
                to="/"
              >
                Home
              </Link>
            </li>
          )}
          {!token && (
            <>
              <li>
                <Link
                  className={`link ${
                    location.pathname === "/login" ? "link-active" : ""
                  }`}
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className={`link ${
                    location.pathname === "/register" ? "link-active" : ""
                  }`}
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </>
          )}
          {token && (
            <>
              <li>
                <Link
                  className={`link ${
                    location.pathname === "/tasks" ? "link-active" : ""
                  }`}
                  to="/tasks"
                >
                  Tasks
                </Link>
              </li>
              <li>
                <Link
                  className={`link ${
                    location.pathname === "/newtask" ? "link-active" : ""
                  }`}
                  to="/newtask"
                >
                  New Task
                </Link>
              </li>
              <li>
                <Link
                  className={`link ${
                    location.pathname === "/lists" ? "link-active" : ""
                  }`}
                  to="/lists"
                >
                  Lists
                </Link>
              </li>
              <li>
                <Link
                  className={`link ${
                    location.pathname === "/newlist" ? "link-active" : ""
                  }`}
                  to="/newlist"
                >
                  New List
                </Link>
              </li>
              <li>
                <Link className="link" to="/" onClick={logout}>
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
