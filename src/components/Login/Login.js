import "./Login.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuthToken,
  setAuthToken,
  deleteAuthToken,
} from "../../helpers/token";
import Axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const token = getAuthToken();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ errors: "" });
  const [loggedIn, setLoggedIn] = useState(token ? true : false);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [loggedIn]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const LOGIN_URL = "https://todoapprestapi.heroku.com/api/user/login";
    const response = await Axios.post(LOGIN_URL, {
      username: username,
      password: password,
    })
      .then((response) => {
        setAuthToken(response.data.token);
        setLoggedIn(true);
      })
      .catch((error) => {
        setErrors({ errors: error.response.data.error });
      });
  };
  return (
    <div className="container">
      <div>
        {(token === undefined || !token) &&
          Object.values(errors).map((error, i) => {
            return (
              <div key={i}>
                <li>{error}</li>
              </div>
            );
          })}
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <p>Todo APP</p>
        <label htmlFor="username">Username</label>

        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Type your username"
          id="username"
          className="input"
        />

        <label htmlFor="password">Password</label>

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type your password"
          required
          id="password"
          className="input"
        />

        <input type="submit" value="Send" />
      </form>
    </div>
  );
};
export default Login;
