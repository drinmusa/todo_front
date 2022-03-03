import { useState, useEffect } from "react";

import Axios from "axios";
import { getAuthToken } from "../../helpers/token";

const NewTask = () => {
  const token = getAuthToken();

  const TASK_URL = "https://todoapprestapi.herokuapp.com/api/task/create";
  const LIST_URL = "https://todoapprestapi.herokuapp.com/api/list/lists";

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const [list, setList] = useState("");

  const [addedTask, setAddedTask] = useState({});
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
        console.log("response from task submit", response);
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };
  return (
    <div>
      <div>
        {Object.values(errors).map((error, i) => {
          return <li key={i}> {error}</li>;
        })}
      </div>
      <form onSubmit={handleTaskSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Title"
          id="title"
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          placeholder="Description"
          id="description"
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="date">Due date</label>
        <input
          type="date"
          id="date"
          onChange={(e) => setDueDate(e.target.value)}
        />
        <br />
        <br />
        <select
          onChange={(e) => {
            const selectedList = e.target.value;
            setList(selectedList);
          }}
        >
          <option value="">Solo</option>
          {lists.map((list, i) => {
            return (
              <option key={i} value={list._id}>
                {list.title}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <input type="submit" value="Create Task" />
      </form>
    </div>
  );
};
export default NewTask;
