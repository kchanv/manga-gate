import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

const Fav = () => {
  const location = useLocation();
  const [favManga, setFavManga] = useState([]);

  useEffect(() => {
    if (location.state) {
      const isMangaInFav = favManga.some(
        (manga) => manga.id === location.state.manga.id
      );
      if (!isMangaInFav) {
        setFavManga((prevFavManga) => [...prevFavManga, location.state.manga]);
      }
    }
  }, [location.state]);

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
