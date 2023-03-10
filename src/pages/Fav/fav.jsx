import React, { useEffect } from "react";

import { Link } from "react-router-dom";

import axios from "axios";
// import manga from "../../../models/manga";

const Fav = ({ favManga, setFavManga }) => {
  // const [favManga, setFavManga] = useState([]);

  // useEffect(() => {
  //   favManga;
  // }, []);

  const handleDelete = async (title) => {
    const res = await axios.post(
      `http://localhost:3001/api/users/fav/${title}`,
      {},
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    setFavManga(favManga.filter((manga) => manga.title !== title));
    console.log(res);
  };
  console.log(favManga);
  return (
    <>
      <div className="white">
        <h1>Favorites</h1>
      </div>
      <ul>
        {favManga.map((manga) => (
          <li key={manga.id}>
            <img src={manga.thumb} alt={manga.title} />
            <div>
              <div className="white">
                <h2>{manga.title}</h2>
                <p>By {manga.author}</p>
              </div>
              <button onClick={() => handleDelete(manga.title)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Fav;
