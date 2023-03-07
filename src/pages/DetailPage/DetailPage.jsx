import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DetailPage.css";
import { createComment } from "../../utilities/comments-service";
import { getUser } from "../../utilities/users-service";

const DetailPage = () => {
  const { endpoint } = useParams();
  const [detail, setDetail] = useState({});
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/manga/detail/" + endpoint)
      .then((resp) => {
        setDetail(resp.data);
      });
  }, [endpoint]);

  useEffect(() => {
    // on page load, load associated comments
    axios.get("http://localhost:3003/api/comments/" + endpoint).then((resp) => {
      //   setComments([resp.comments]);
    });
  }, []);

  const handleCommentSubmit = async (comment) => {
    // setComments([...comments, comment]);
    const commentResponse = await createComment({
      comment: comment,
      user: user,
      manga: detail?.manga_endpoint,
    });

    if (commentResponse.comment) {
      setComments([...comments, comment]);
    }
    // Send the comment to the server or persist it locally
  };

  return (
    <div className="container">
      <div className="container-1">
        <h1>Detail Page: {detail.title}</h1>
        <img src={detail.thumb} />
        <h2>Author: {detail.author}</h2>
        <h2>Type: {detail.type}</h2>
        <h2>Status: {detail.status}</h2>
      </div>
      <div className="container-2">
        <h3>Synopsis: {detail.synopsis}</h3>
      </div>

      <CommentBox onCommentSubmit={handleCommentSubmit} />
      <CommentList comments={comments} />
    </div>
  );
};

const CommentBox = ({ onCommentSubmit }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (comment.trim() === "") return;
    onCommentSubmit(comment);
    setComment("");
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <textarea value={comment} onChange={handleCommentChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

const CommentList = ({ comments }) => {
  return (
    <>
      <h2>Comments:</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment, index) => <p key={index}>{comment}</p>)
      )}
    </>
  );
};

export default DetailPage;
