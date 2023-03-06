import React, { useState } from "react";
import { Link } from "react-router-dom";

const Fav = () => {
  const [favManga] = useState([]);

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
    </>
  );
};

export default Fav;
