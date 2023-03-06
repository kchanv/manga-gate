import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const fav = () => {
  const [favmanga, setFavManga] = useState([]);

  const addToFav = (manga) => {
    setFavManga([...favmanga, manga]);
  };
  return (
    <>
      <h1>Favorites</h1>
      <ul>
        {favManga.map((manga) => (
          <li key={manga.id}>
            <Link to={`/collections/${manga.endpoint}`}>{manga.title}</Link>
          </li>
        ))}
      </ul>
      <hr />
      <Collections addToFavorites={addToFavorites} />
    </>
  );
};

export default fav;
