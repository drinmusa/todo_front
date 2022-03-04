import { useState, useEffect } from "react";

import Axios from "axios";
import { getAuthToken } from "../../helpers/token";
import "./NewList.css";
const NewList = () => {
  const token = getAuthToken();
  const LIST_URL = "http://localhost:3001/api/list/create";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [list, setList] = useState({});

  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.post(
      LIST_URL,
      {
        title,
        description,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        setList(response.data);
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };
  return (
    <div className="new-list-container">
      <form onSubmit={handleSubmit} className="new-list-form">
        <div className="row">
          <p className="title">New List</p>
        </div>
        <div className="col">
          <label htmlFor="title" className="label">
            Title
          </label>
          <input
            type="text"
            placeholder="Title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            value={title}
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
            onChange={(e) => setDescription(e.target.value)}
            className="input"
            value={description}
          />
        </div>

        <input type="submit" className="create-btn" value="Create List" />
        {list.title ? <p>List created sucessfully</p> : null}
      </form>
    </div>
  );
};
export default NewList;
