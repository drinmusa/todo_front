import { useState, useEffect } from "react";

import Axios from "axios";
import { getAuthToken } from "../../helpers/token";

import "./Task.css";
import ReactCardFlip from "react-card-flip";

const Task = ({ id, title, description, status, list_id, due_date, func }) => {
  const token = getAuthToken();
  const DELETE_URL = "http://localhost:3001/api/task/delete";
  const EDIT_URL = "http://localhost:3001/api/task/update";
  const LISTS_URL = "http://localhost:3001/api/list/lists";
  const LIST_URL = "http://localhost:3001/api/list/list";

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState(""); //used to update description
  const [newDate, setNewDate] = useState(""); //used to update date
  const [newList, setNewList] = useState(""); //used to update list of task
  const [list, setList] = useState(""); //used to set list when creating task
  const [lists, setLists] = useState([]); //holds lists
  const [listName, setListName] = useState("");
  const [update, setUpdate] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  useEffect(() => {
    const fetchLists = async () => {
      const fetchLists = await Axios.get(LISTS_URL, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setLists(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const fetchSingleList = async () => {
      const fetchList = await Axios.post(
        LIST_URL,

        {
          listID: list_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => {
          setListName(response.data.title);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchLists();
    fetchSingleList();
  }, [update]);
  const handleDelete = async () => {
    const response = await Axios.post(
      DELETE_URL,

      {
        taskID: id,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        func();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEdit = async () => {
    const params = {};
    params.taskID = id;
    params.title = newTitle !== "" ? newTitle : title;
    params.description = newDescription !== "" ? newDescription : description;
    params.list = newList !== "" ? newList : list_id;
    params.due_date = newDate !== "" ? newDate : due_date;
    const response = await Axios.post(EDIT_URL, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);

        handleClick();
        setUpdate(!update);
        setNewTitle("");
        setNewDescription("");
        setNewDate("");
        func();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="task-container">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className={`front ${isFlipped ? "hidden" : ""}`}>
          <div className="row">
            <p>{listName}</p>
          </div>

          <div className="row">
            <p>{title}</p>
          </div>
          <div className="row">
            <p>{title}</p>
          </div>
          <div className="row">
            <p>{description}</p>
          </div>
          <div className="row">
            <p>{status}</p>
          </div>
          <div className="row">
            <p>{due_date}</p>
          </div>
          <div className="row">
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
            <button className="edit-btn" onClick={handleClick}>
              Edit
            </button>
          </div>
        </div>
        <div className="edit-container">
          <div className="row">
            <p className="title">Edit Task</p>
          </div>
          <div className="col">
            <label htmlFor="" className="label">
              Title
            </label>
            <input
              type="text"
              className="edit-input"
              placeholder="Title"
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
            />
          </div>
          <div className="col">
            <label htmlFor="" className="col">
              Description
            </label>
            <input
              type="text"
              className="edit-input"
              placeholder="Description"
              onChange={(e) => {
                setNewDescription(e.target.value);
              }}
            />
          </div>
          <div className="col">
            <input
              type="date"
              onChange={(e) => {
                setNewDate(e.target.value);
              }}
              className="edit-input"
            />
          </div>
          <div className="col">
            <select
              className="edit-input"
              onChange={(e) => {
                const selectedList = e.target.value;
                setNewList(selectedList);
              }}
            >
              <option value={null}>Without List</option>
              {lists.map((list, i) => {
                return (
                  <option key={i} value={list._id}>
                    {list.title}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="row">
            <button className="back-btn" onClick={handleClick}>
              Go back
            </button>
            <button className="save-btn" onClick={handleEdit}>
              Update Task
            </button>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
};
export default Task;
