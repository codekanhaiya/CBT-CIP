import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/popup";

/**
 * Component: Post
 * Description: Displays a single post with image, title, description, and delete functionality.
 */
function Post() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fallbackImg =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";

  // Fetch post data on load
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("http://localhost:8080/sppost/get/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId }),
        });

        const data = await response.json();

        if (response.ok) {
          setPost(data);
        } else {
          setError(data.message || "Failed to fetch your post.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  // Format timestamp to readable format
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

  // Handle delete operation
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/delpost/post/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });

      if (response.ok) {
        handleSuccess("Post deleted successfully!");
        setTimeout(() => navigate("/apphome"), 1200);
      } else {
        handleError("Failed to delete this post.");
      }
    } catch (err) {
      handleError("Error deleting the post.");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading post...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="alert alert-danger text-center mt-4" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Post Image */}
      <div className="text-center mb-4">
        <img
          src={post.image || fallbackImg}
          alt="Post"
          className="img-fluid rounded shadow"
          style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
        />
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <h2 className="text-primary">{post.title}</h2>
        <p className="text-secondary">{post.description}</p>
        <p className="text-end fst-italic text-muted mb-0">
          <small>Updated on {formatDate(post.updatedAt)}</small>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-end">
        <button
          onClick={handleDelete}
          className="btn btn-outline-danger shadow-sm"
        >
          Delete Post
        </button>
      </div>
    </div>
  );
}

export default Post;
