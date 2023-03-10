import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DetailPage.css";
import { createComment } from "../../utilities/comments-service";
import { getUser } from "../../utilities/users-service";
import Fav from "../Fav/Fav";

const DetailPage = ({ addToFav }) => {
  const { endpoint } = useParams();
  const [detail, setDetail] = useState({});
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(getUser());

  const navigate = useNavigate();

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
      <div className="center">
        <button onClick={handleAddToFav}>Add to Favourites</button>
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
  // return (
  //   <>
  //     <h1>Detail Page: {detail.title}</h1>
  //     <img src={detail.thumb} alt="" />
  //     <button onClick={handleAddToFav}>ADD</button>
  //   </>
  // );
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
  return (
    <form onSubmit={handleCommentSubmit}>
      <textarea value={comment.comment} onChange={handleCommentChange} />
      <button type="submit">Submit</button>
    </form>
  );
};
const CommentList = ({
  comments,
  handleEditMode,
  handleSave,
  handleCommentChange,
}) => {
  return (
    <div className="white">
      <h2>Comments:</h2>
      {comments?.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments?.map((comment, index) => (
          <div key={index}>
            <strong>{comment.user?.name}: </strong>
            {comment.editMode ? (
              <>
                <input
                  type="textarea"
                  value={comment.comment}
                  onChange={(e) => handleCommentChange(e, comment, index)}
                />
                <button onClick={() => handleSave(comment, index)}>Save</button>
              </>
            ) : (
              <i>
                {comment.comment}
                <button onClick={() => handleEditMode(comment, index)}>
                  Edit
                </button>
              </i>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default DetailPage;
