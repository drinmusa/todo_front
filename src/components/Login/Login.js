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
  const [errors, setErrors] = useState({});
  console.log("errors", errors);
  const [loggedIn, setLoggedIn] = useState(token ? true : false);

  useEffect(() => {
    if (token) {
      navigate("/tasks");
    }
  }, [loggedIn]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const LOGIN_URL = "http://localhost:3001/api/user/login";
    const response = await Axios.post(LOGIN_URL, {
      username: username,
      password: password,
    })
      .then((response) => {
        setAuthToken(response.data.token);
        setLoggedIn(true);
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };
  return (
    <div className="login_container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="row">
          <p className="title">Todo APP</p>
        </div>
        <div className="col">
          <label htmlFor="username" className="label">
            Username
          </label>

          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Type your username"
            id="username"
            className="input"
          />
          {errors.username ? (
            
              <p className="error">{errors.username}</p>
            
          ) : null}
        </div>

        <div className="col">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password"
            required
            id="password"
            className="input"
          />
          {errors.error ? (
           
              <p className="error">{errors.error}</p>
          
          ) : null}
        </div>

        <input type="submit" className="login-btn" value="LOGIN" />
      </form>
    </div>
  );
};
export default Login;
