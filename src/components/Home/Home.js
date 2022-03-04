import { useState, useEffect } from "react";
import Axios from "axios";
import "./Home.css";
import Task from "../Task/Task";
import { getAuthToken } from "../../helpers/token";
const Home = () => {
  const token = getAuthToken();

  return (
    <div className="home-container">
      {token ? (
        <div>
          <h1>Welcome to the todo app</h1>
        </div>
      ) : (
        <div>
          <h1>Welcome to the todo app</h1>
          <h1>Login or register to use the APP</h1>
        </div>
      )}
    </div>
  );
};
export default Home;
