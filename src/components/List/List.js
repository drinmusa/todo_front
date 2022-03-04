import Axios from "axios";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../helpers/token";
import ReactCardFlip from "react-card-flip";
import "./List.css";

const List = ({ id, title, description, func }) => {
  const token = getAuthToken();

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [error, setError] = useState({});
  const DELETE_URL = "http://localhost:3001/api/list/delete";
  const EDIT_URL = "http://localhost:3001/api/list/update";
  const TASKS_URL = "http://localhost:3001/api/task/list";
  const REMOVE_URL = "http://localhost:3001/api/task/update";
  const LIST_URL = "http://localhost:3001/api/task/tasks/update";
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDelete = async () => {
    const listResponse = await Axios.post(
      DELETE_URL,

      {
        listID: id,
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
    const taskResponse = await Axios.post(
      LIST_URL,

      {
        list: id,
        listID: "",
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
    params.listID = id;
    params.title = newTitle !== "" ? newTitle : title;
    params.description = newDescription !== "" ? newDescription : description;
    const response = await Axios.post(EDIT_URL, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        handleClick();
        setNewTitle("");
        setNewDescription("");
        func();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="list-container">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className={`front ${isFlipped ? "hidden" : ""}`}>
          <div className="row">
            <p>{title}</p>
          </div>
          <div className="row">
            <p>{description}</p>
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
          <div className="row">
            <button className="back-btn" onClick={handleClick}>
              Go back
            </button>
            <button className="save-btn" onClick={handleEdit}>
              Update List
            </button>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
};
export default List;
