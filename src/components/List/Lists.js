import { useState, useEffect } from "react";
import Axios from "axios";
import { getAuthToken } from "../../helpers/token";
import List from "../List/List";
import "./Lists.css";
const Lists = () => {
  const token = getAuthToken();
  const [update, setUpdate] = useState(false);
  const [lists, setLists] = useState([]);
  const LISTS_URL = "http://localhost:3001/api/list/lists";
  const updateUI = () => {
    setUpdate(!update);
  };

  useEffect(() => {
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
    fetchLists();
  }, [update]);
  return (
    <div className="lists-container">
      <div className="lists">
        {lists.length !== 0 ? (
          lists.map(({ _id, title, description }) => (
            <List
              key={_id}
              id={_id}
              description={description}
              title={title}
              func={updateUI}
            />
          ))
        ) : (
          <h1>No available lists please add new</h1>
        )}
      </div>
    </div>
  );
};

export default Lists;
