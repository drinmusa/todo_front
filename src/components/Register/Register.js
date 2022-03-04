import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Axios from "axios";

import "./Register.css";
const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    const REGISTER_URL = "http://localhost:3001/api/user/register";
    const response = await Axios.post(REGISTER_URL, {
      name: name,
      username: username,
      email: email,
      password: password,
      confirm_password: confirmPassword,
    })
      .then((response) => {
        console.log("response", response.data);
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <div className="row">
          <p className="title">Todo APP</p>
        </div>
        <div className="col">
          <label htmlFor="name" className="label">
            Name
          </label>

          <input
            type="text"
            placeholder="Please enter your full name"
            id="name"
            className="input"
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name ? <p className="error">{errors.name}</p> : null}
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
          {errors.username ? <p className="error">{errors.username}</p> : null}
        </div>

        <div className="col">
          <label htmlFor="email" className="label">
            Email
          </label>

          <input
            type="email"
            placeholder="Please enter your email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          {errors.email ? <p className="error">{errors.email}</p> : null}
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
          {errors.password ? <p className="error">{errors.password}</p> : null}
        </div>
        <div className="col">
          <label htmlFor="password" className="label">
            Confirm Password
          </label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-type your password"
            required
            id="confirm_password"
            className="input"
          />
          {errors.password ? <p className="error">{errors.password}</p> : null}
        </div>

        <input type="submit" className="register-btn" value="REGISTER" />
      </form>
    </div>
  );
};
export default Register;
