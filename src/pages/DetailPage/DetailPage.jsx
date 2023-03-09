import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailPage = ({ addToFav }) => {
  const { endpoint } = useParams();
  const [detail, setDetail] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/manga/detail/" + endpoint)
      .then((resp) => {
        setDetail(resp.data);
      });
  }, []);

  const handleAddToFav = () => {
    addToFav(detail);
    fetch("/api/users/fav", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(detail),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Manga added to favorites successfully!");
          navigate("/favs");
        }
      })
      .catch((error) => {
        console.error("Error adding manga to favorites:", error);
      });
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
