import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  getAuthToken,
  setAuthToken,
  deleteAuthToken,
} from "../../helpers/token";
import "./Dashboard.css";

import NewTask from "../Task/NewTask";
import NewList from "../List/NewList";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);
  const TASKS_URL = "http://localhost:3001/api/task/tasks";
  const LISTS_URL = "http://localhost:3001/api/list/lists";
  const token = getAuthToken();
  console.log("lists", lists);
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await Axios.get(TASKS_URL, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const fetchLists = async () => {
      const response = await Axios.get(LISTS_URL, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setLists(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchTasks();
		fetchLists();
  }, []);
  return (
    <div className="container_dashboard">
      <div className="tasks">
        <h1>Tasks</h1>
        {tasks.map(({ _id, title, description, status, due_date }) => (
          <ul key={_id}>
            <li>{_id}</li>
            <li>{title}</li>
            <li>{description}</li>
            <li>{status}</li>
            <li>{due_date}</li>
            <br />
          </ul>
        ))}
      </div>
      <div className="lists">
        <h1>Lists</h1>
        {lists.map(({ _id, title, description }) => (
          <ul key={_id}>
            <li>{_id}</li>
            <li>{title}</li>
            <li>{description}</li>

            <br />
          </ul>
        ))}
      </div>
      <div>
        <h1>New Task</h1>
        <NewTask />
      </div>
      <div>
        <h1>New List</h1>
        <NewList />
      </div>
    </div>
  );
};
export default Dashboard;
