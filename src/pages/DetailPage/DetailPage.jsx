import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPage = ({ addToFav }) => {
  const { endpoint } = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    axios
      .get("https://manga-gate-api.herokuapp.com/api/manga/detail/" + endpoint)
      .then((resp) => {
        setDetail(resp.data);
      });
  }, [endpoint]);

  useEffect(() => {
    if (detail) {
      async function getComments() {
        const resp = await axios.get(
          "http://localhost:3001/api/comments/" + detail.title
        );

        setComments(
          resp.data.comments.map((comment) => {
            return { ...comment, editMode: false };
          })
        );
      }
      getComments();
    }
    // on page load, load associated comments
  }, [detail]);

  console.log(comments);

  const handleCommentSubmit = async (comment) => {
    const resp = await axios.post(
      "http://localhost:3001/api/comments/create",
      comment
    );
    if (resp.data.comment._id.length > 0) {
      setComments([comment, ...comments]);
    }
  };

  const handleEditMode = (comment, index) => {
    let newComments = [...comments];
    newComments[index] = { ...comment, editMode: true };
    setComments(newComments);
  };

  const handleSave = async (comment, index) => {
    const resp = await axios.put(
      "http://localhost:3001/api/comments/" + comment._id + "/update",
      comment
    );
    if (resp.data.comment._id.length > 0) {
      let newComments = [...comments];
      newComments[index] = { ...comment, editMode: false };
      setComments(newComments);
    }
  };

  const handleCommentChange = (e, comment, index) => {
    let newComments = [...comments];
    newComments[index] = { ...comment, comment: e.target.value };
    setComments(newComments);
  };

  return (
    <div className="container">
      <div className="container-1">
        <h1>{detail.title}</h1>
        <img src={detail.thumb} />
        <h2>Author: {detail.author}</h2>
        <h2>Type: {detail.type}</h2>
        <h2>Status: {detail.status}</h2>
      </div>
      <div className="container-2">
        <h2>Synopsis:</h2> <h3> {detail.synopsis}</h3>
      </div>
      <div className="container-3">
        <CommentBox
          onCommentSubmit={handleCommentSubmit}
          title={detail.title}
          user={user}
        />
        <div className="comment-list">
          <CommentList
            comments={comments}
            handleEditMode={handleEditMode}
            handleSave={handleSave}
            handleCommentChange={handleCommentChange}
          />
        </div>
      </div>
    </div>
  );
};

const CommentBox = ({ onCommentSubmit, title, user }) => {
  const [comment, setComment] = useState({
    comment: "",
    manga: title,
    user: user,
  });
  // add user, pass user as prop from above************ if todesnt work go to server and set user correctly create backend
  const handleCommentChange = (event) => {
    setComment({
      manga: title,
      comment: event.target.value,
      user: user,
    });
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    await onCommentSubmit(comment);
    setComment({ comment: "", manga: title, user: user });
  };

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
        if (response.ok) {
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
      <img src={detail.thumb} />
    </>
  );
};

export default DetailPage;
