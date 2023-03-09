import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Collections.css";

const Collections = () => {
  const [manga, setManga] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/manga/popular/" + page)
      .then((resp) => {
        setManga(resp.data.manga_list);
      });
  }, [page]);

  const onPrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const onNextClick = () => {
    setPage(page + 1);
  };

  const performSearch = () => {
    axios.get("http://localhost:3000/api/search/" + search).then((resp) => {
      setManga(resp.data.manga_list);
    });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Enjoy hit Japanese manga series.</h1>
        <h1>You can discuss and save your favorite Mangas at Manga-Gate!</h1>
      </div>
      <div style={{ display: "inline-block" }}>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button onClick={() => performSearch()}>Search</button>
      </div>
      <div className="links-container">
        <ul>
          {manga &&
            manga.map((m) => {
              return (
                <li style={{ listStyle: "none" }} key={m.endpoint}>
                  <Link to={"/collections/" + m.endpoint}>{m.title}</Link>
                </li>
              );
            })}
        </ul>
      </div>
      {manga.length > 0 && (
        <>
          <button
            id="prev"
            onClick={() => {
              onPrevClick();
            }}
          >
            {" "}
            Previous{" "}
          </button>
          <button
            id="next"
            onClick={() => {
              onNextClick();
            }}
          >
            {" "}
            Next{" "}
          </button>
          <div className="page">
            <p>Page: {page}</p>
          </div>
        </>
      )}

      <Link to="/about">
        <button>About</button>
      </Link>
    </div>
  );
};

export default Collections;
