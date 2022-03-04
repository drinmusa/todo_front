import { useState, useEffect } from "react";

import Axios from "axios";
import { getAuthToken } from "../../helpers/token";
import "./NewTask.css";
const NewTask = () => {
  const token = getAuthToken();

  const TASK_URL = "http://localhost:3001/api/task/create";
  const LIST_URL = "http://localhost:3001/api/list/lists";

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const [list, setList] = useState("");

  const [succes, setSucces] = useState("");

  const [errors, setErrors] = useState({});
  const [listFetchErrors, setListFetchErrors] = useState({});

  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      const response = await Axios.get(LIST_URL, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setLists(response.data);
        })
        .catch((error) => {
          setListFetchErrors(error.response.data.error);
        });
    };
    fetchList();
  }, []);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();

    const response = await Axios.post(
      TASK_URL,

      {
        title: taskTitle,
        description: taskDescription,
        due_date: due_date,
        list: list,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        console.log(response);
        setSucces("Task added succesfully");
        setTaskDescription("");
        setList("");
        setDueDate("");
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };
  return (
    <div className="new-task-container">
      <form onSubmit={handleTaskSubmit} className="new-task-form">
        <div className="row">
          <p className="title">New Task</p>
        </div>
        <div className="col">
          <label htmlFor="title" className="label">
            Title
          </label>
          <input
            type="text"
            placeholder="Title"
            id="title"
            onChange={(e) => setTaskTitle(e.target.value)}
            className="input"
            value={taskTitle}
          />
          {errors.title ? <p className="error">{errors.title}</p> : null}
        </div>
        <div className="col">
          <label htmlFor="description" className="label">
            Description
          </label>
          <input
            type="text"
            placeholder="Description"
            id="description"
            onChange={(e) => setTaskDescription(e.target.value)}
            className="input"
            value={taskDescription}
          />
          {errors.description ? (
            <p className="error">{errors.description}</p>
          ) : null}
        </div>
        <div className="col">
          <label htmlFor="date" className="label">
            Due date
          </label>
          <input
            type="date"
            id="date"
            onChange={(e) => setDueDate(e.target.value)}
            className="input"
            value={due_date}
          />
          {errors.due_date ? <p className="error">{errors.due_date}</p> : null}
        </div>
        <div className="col">
          <select
            className="input"
            onChange={(e) => {
              const selectedList = e.target.value;
              setList(selectedList);
            }}
          >
            <option value="">Without List</option>
            {lists.map((list, i) => {
              return (
                <option key={i} value={list._id}>
                  {list.title}
                </option>
              );
            })}
          </select>
        </div>

        <input type="submit" className="create-btn" value="Create Task" />
        <div>{succes != "" ? <p>{succes}</p> : null}</div>
      </form>
    </div>
  );
};
export default NewTask;
