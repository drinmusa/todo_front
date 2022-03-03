import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Axios from "axios";
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
    <div>
      <ul>
        {Object.values(errors).map((error, i) => {
          return <li key={i}> {error}</li>;
        })}
      </ul>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          placeholder="Please enter your full name"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="username">Username</label>
        <br />
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Type your username"
          id="username"
        />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          placeholder="Please enter your email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type your password"
          required
          id="password"
        />
        <br />

        <label htmlFor="password">Confirm Password</label>
        <br />
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-type your password"
          required
          id="confirm_password"
        />
        <br />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};
export default Register;
