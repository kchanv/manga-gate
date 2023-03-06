import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { endpoint } = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/manga/detail/" + endpoint)
      .then((resp) => {
        setDetail(resp.data);
      });
  }, []);

  const handleAddToFav = () => {
    addToFav(detail);
    console.log(`Added ${detail.title} to favorites`);
    console.log(JSON.parse(localStorage.getItem("favorites")));
  };

  const addToFav = (manga) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push(manga);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <>
      <h1>Detail Page: {detail.title}</h1>
      <img src={detail.thumb} alt="" />
      <button onClick={handleAddToFav}>ADD</button>
    </>
  );
};

export default DetailPage;
