import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../utils/popup";

/**
 * Component: ShowComment
 * Description: Displays and manages comments for a specific post by the logged-in user.
 * Props:
 *  - postId: ID of the post for which comments are shown
 */
function ShowComment({ postId }) {
  const userId = localStorage.getItem("loggedID");

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch comments from backend on mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("http://localhost:8080/allmsg/mymsgs/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, postId }),
        });

        const data = await response.json();

        if (response.ok) {
          const sortedComments = data.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          setComments(sortedComments);
        } else {
          setError(data.message || "Failed to fetch comments.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [userId, postId]);

  // Format date to human-readable form
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${day} ${month} ${year}, ${formattedHours}:${formattedMinutes} ${period}`;
  };

  // Delete a comment by its ID
  const handleDelete = async (msgId) => {
    try {
      const response = await fetch("http://localhost:8080/delmsg/msgs/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msgId }),
      });

      if (response.ok) {
        handleSuccess("Comment deleted successfully!");
        // Update the list without reloading the page
        setComments((prev) => prev.filter((msg) => msg._id !== msgId));
      } else {
        handleError("Failed to delete this comment.");
      }
    } catch (error) {
      handleError("Error deleting the comment.");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading comments...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="alert alert-danger text-center my-3" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="card bg-light shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-4">Comments</h5>

        {comments.length > 0 ? (
          comments.map((msg) => (
            <div key={msg._id} className="mb-4">
              <div className="d-flex justify-content-between">
                <p className="mb-1">{msg.comment}</p>
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="btn btn-sm btn-outline-danger"
                >
                  🗑 Delete
                </button>
              </div>
              <p className="text-muted mb-0 small fst-italic text-end">
                {formatDate(msg.updatedAt)}
              </p>
              <hr />
            </div>
          ))
        ) : (
          <p className="text-muted">No comments available for this post.</p>
        )}
      </div>
    </div>
  );
}

export default ShowComment;
