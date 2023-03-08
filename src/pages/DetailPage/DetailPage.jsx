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
    if (detail) {
      async function getComments() {
        const resp = await axios.get(
          "http://localhost:3001/api/comments/" + detail.title
        );

        setComments(resp.data.comments);
      }
      getComments();
    }
    // on page load, load associated comments
  }, [detail]);

  console.log(comments);

  const handleCommentSubmit = async (comment) => {
    setComments([...comments, comment]);
    const resp = await axios.post(
      "http://localhost:3001/api/comments/create",
      comment
    );
    setComments([resp.data.comment, ...comments]);
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

      <CommentBox onCommentSubmit={handleCommentSubmit} title={detail.title} />
      <CommentList comments={comments} />
    </div>
  );
};

const CommentBox = ({ onCommentSubmit, title }) => {
  const [comment, setComment] = useState({ comment: "", manga: title });
  // add user, pass user as prop from above************ if todesnt work go to server and set user correctly create backend
  const handleCommentChange = (event) => {
    setComment({
      manga: title,
      comment: event.target.value,
    });
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    await onCommentSubmit(comment);
    setComment({ comment: "", manga: title });
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      <textarea value={comment.comment} onChange={handleCommentChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

const CommentList = ({ comments }) => {
  return (
    <>
      <h2>Comments:</h2>
      {comments?.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments?.map((comment, index) => <p key={index}>{comment.comment}</p>)
      )}
    </>
  );
};

export default DetailPage;
