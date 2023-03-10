import React, { useEffect } from "react";

import { Link } from "react-router-dom";

const Fav = ({ favManga }) => {
  // const [favManga, setFavManga] = useState([]);

  // useEffect(() => {
  //   favManga;
  // }, []);

  return (
    <>
      <div className="white">
        <h1>Favorites</h1>
      </div>
      <ul>
        {favManga.map((manga) => (
          <li key={manga.id}>
            <Link to={`/favs/${manga.endpoint}`}>
              <img src={manga.thumb} alt={manga.title} />
              <div>
                <h2>{manga.title}</h2>
                <p>By {manga.author}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Fav;
