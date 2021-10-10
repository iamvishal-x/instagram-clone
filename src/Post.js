import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Post.css";
import { db } from "./firebase";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";

function Post({ postId, user, username, caption, imageURL }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  return (
    <div className="post">
      {/* Header-> Avatar+Username */}
      <div className="post__header">
        <Avatar className="post__avatar" alt="Remy Sharp" src="" />
        <h3>{username}</h3>
        {/* Image */}
      </div>
      <img className="post__image" src={imageURL} alt="" />
      {/* Username +caption */}
      <h4 className="post__text">
        <strong> {username}🐼 </strong> {caption} 🎢
      </h4>
      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="summit"
            onClick={postComment}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
