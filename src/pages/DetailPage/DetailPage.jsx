import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailPage = ({ addToFav, user }) => {
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
    axios
      .post(
        "http://localhost:3000/api/users/fav",
        { manga: detail.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        addToFav(detail);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login");
        }
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
