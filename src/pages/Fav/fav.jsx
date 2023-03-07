import React, { useState } from "react";

import { Link, useLocation } from "react-router-dom";

const Fav = () => {
  const location = useLocation();
  const [favManga, setFavManga] = useState([]);

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
