import React from "react";

import { Link } from "react-router-dom";

const Fav = ({ favManga }) => {
  return (
    <>
      <h1>Favorites</h1>
      <ul>
        {favManga.map((manga) => (
          <li key={manga.id}>
            <Link to={`/fav/${manga.endpoint}`}>{manga.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Fav;
