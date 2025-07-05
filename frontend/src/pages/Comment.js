import React, { useState, useEffect } from "react";
import { handleError, handleSuccess } from "../utils/popup";
import { ToastContainer } from "react-toastify";

/**
 * Component: Comment
 * Description: Allows users to post a comment on a specific post.
 * Props:
 *  - postId: ID of the post to which the comment is being added
 */
function Comment({ postId }) {
  const userId = localStorage.getItem("loggedID");

  const [cmtInfo, setCmtInfo] = useState({
    comment: "",
    sender_id: userId,
    post_id: null,
  });

  // Update post_id when prop changes
  useEffect(() => {
    if (postId) {
      setCmtInfo((prev) => ({
        ...prev,
        post_id: postId,
      }));
    }
  }, [postId]);

  // Handle input change
  const handleCmt = (e) => {
    const { name, value } = e.target;
    setCmtInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle comment form submit
  const handleNewCmt = async (e) => {
    e.preventDefault();

    if (!cmtInfo.comment.trim()) {
      return handleError("Comment message is required.");
    }

    try {
      const response = await fetch("http://localhost:8080/comment/msg/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cmtInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setCmtInfo((prev) => ({ ...prev, comment: "" })); // Reset input
        // Optionally: trigger comment refresh instead of full page reload
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (error?.details?.[0]?.message) {
        handleError(error.details[0].message);
      } else {
        handleError(message || "Something went wrong.");
      }
    } catch (err) {
      handleError(err.message || "Failed to comment.");
    }
  };

  return (
    <div className="mt-3 card card-body shadow-sm border-0 rounded-4">
      {/* Comment input form */}
      <form onSubmit={handleNewCmt} className="d-flex align-items-center gap-2">
        <input
          onChange={handleCmt}
          name="comment"
          type="text"
          className="form-control rounded-pill px-3"
          placeholder="Write your comment..."
          value={cmtInfo.comment}
          aria-label="Write comment"
        />
        <button
          className="btn btn-outline-info rounded-pill px-4"
          type="submit"
        >
          Send
        </button>
      </form>

      {/* Toast notifications */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Comment;
