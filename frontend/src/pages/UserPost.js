import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewCommentComponent from "./Comment";
import NewShowCommentComponent from "./ShowComment";

function UserPost() {
  const { userName, userId } = useParams();
  const fallbackImg = "/img/img.png";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCommentId, setOpenCommentId] = useState(null); // Control open comment section

  // Fetch all posts by the user
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/usersallpost", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();

        if (response.ok) {
          const sorted = data.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          setPosts(sorted);
        } else {
          setError(data.message || "Failed to fetch posts.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.toLocaleString("en-US", { month: "short" });
    const year = d.getFullYear();
    const hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    return `${day} ${month} ${year}, ${hour12}:${minutes} ${ampm}`;
  };

  const handleToggleComments = (id) => {
    setOpenCommentId((prevId) => (prevId === id ? null : id));
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />
        <p className="mt-2">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-4" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Top Banner */}
      <div className="container-fluid bg-primary text-white py-5 d-flex flex-column flex-md-row align-items-center justify-content-center gap-4">
        <img
          src={fallbackImg}
          alt="User Avatar"
          className="rounded-circle shadow"
          width="120"
          height="120"
          style={{ objectFit: "cover" }}
        />
        <div className="text-center">
          <h1 className="fw-bold">
            <u>{userName}</u>
          </h1>
          <p className="mb-0 fs-6">
            <strong>User ID:</strong> {userId}
          </p>
        </div>
      </div>

      <div className="container mt-4">
        <div className="text-center mb-4">
          <button className="btn btn-dark">
            Total Posts:{" "}
            <span className="badge bg-light text-dark">{posts.length}</span>
          </button>
        </div>

        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              className="card mb-5 shadow border-0 rounded-4 overflow-hidden"
              key={post._id}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={post.image || fallbackImg}
                    alt="Post"
                    className="img-fluid h-100 w-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-8 p-4">
                  <h4 className="text-primary mb-2">
                    <u>{post.title}</u>
                  </h4>
                  <p>{post.description}</p>
                  <p className="text-muted text-end small fst-italic">
                    Updated on: {formatDate(post.updatedAt)}
                  </p>

                  <div className="text-end">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleToggleComments(post._id)}
                    >
                      {openCommentId === post._id
                        ? "Hide Comments"
                        : "Show Comments"}
                    </button>
                  </div>

                  {/* Conditional Comment Section */}
                  {openCommentId === post._id && (
                    <div className="mt-3">
                      <NewCommentComponent postId={post._id} />
                      <NewShowCommentComponent postId={post._id} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-info text-center">
            No posts found for this user.
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPost;
