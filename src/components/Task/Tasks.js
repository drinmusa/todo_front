import { useState, useEffect } from "react";
import Axios from "axios";
import { getAuthToken } from "../../helpers/token";
import Task from "../Task/Task";
import "./Tasks.css";
const Tasks = () => {
  const token = getAuthToken();
  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState(false);
  const TASKS_URL = "http://localhost:3001/api/task/tasks";
  const updateUI = () => {
    setUpdate(!update);
  };
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
    fetchTasks();
  }, [update]);
  return (
    <div className="tasks-container">
      <div className="tasks">
        {tasks.length !== 0 ? (
          tasks.map(
            ({ _id, title, description, status, due_date, list }, i) => (
              <Task
                key={i}
                id={_id}
                title={title}
                list_id={list}
                description={description}
                status={status}
                due_date={due_date}
                func={updateUI}
              />
            )
          )
        ) : (
          <h1>No available tasks please add new</h1>
        )}
      </div>
    </div>
  );
};
export default Tasks;
