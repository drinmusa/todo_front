import { useState, useEffect } from "react";

import Axios from "axios";
import { getAuthToken } from "../../helpers/token";

const NewList = () => {
  const token = getAuthToken();

  const URL = "https://todoapprestapi.herokuapp.com/api/list/create";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [list, setList] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.post(
      URL,
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Title"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          placeholder="Description"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />

        <input type="submit" value="Create List" />
      </form>
    </div>
  );
};
export default NewList;
