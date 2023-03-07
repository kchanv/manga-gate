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

  console.log(detail);

  return (
    <>
      <h1>Detail Page: {detail.title}</h1>
      <img src={detail.thumb} />
      <h2>Author: {detail.author}</h2>
      <h2>Type: {detail.type}</h2>
      <h2>Status: {detail.status}</h2>
      <h3>Synopsis: {detail.synopsis}</h3>
    </>
  );
};

export default DetailPage;
