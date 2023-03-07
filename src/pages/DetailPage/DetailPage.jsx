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
    navigate("/fav");
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
