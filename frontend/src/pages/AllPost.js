import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Component: AllPost
 * Description: Fetches and displays all posts created by the user.
 * Props:
 *  - userId: ID of the currently logged-in user
 */
function AllPost({ userId }) {
  const [fPosts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fallbackImg = "/img/post.avif"; // Fallback image if no image in post

  // Fetch posts on component mount or when userId changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/allpost/myposts/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();

        if (response.ok) {
          // Sort posts by latest updated
          const sortedPosts = data.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          setPosts(sortedPosts);
        } else {
          setError(data.message || "Failed to fetch posts");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  // Loading state
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading your posts...</p>
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
      {/* Total Post Count */}
      <div className="text-center mb-4">
        <button type="button" className="btn btn-outline-primary shadow-sm">
          Total Posts:{" "}
          <span className="badge bg-primary text-white">{fPosts.length}</span>
        </button>
      </div>

      {/* Posts Grid */}
      <div className="row g-4">
        {fPosts.length > 0 ? (
          fPosts.map((post) => (
            <div className="col-12 col-sm-6 col-md-4 col-xl-3" key={post._id}>
              <div className="card h-100 shadow-sm border-0 rounded-4">
                {/* Post Image */}
                <img
                  src={post.image || fallbackImg}
                  alt="Post"
                  className="card-img-top rounded-top-4"
                  style={{ height: "30vh", objectFit: "cover" }}
                />

                {/* Post Content */}
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title text-truncate">{post.title}</h5>
                  <p
                    className="card-text small text-muted"
                    style={{ minHeight: "4em" }}
                  >
                    {post.description.length > 100
                      ? `${post.description.slice(0, 100)}...`
                      : post.description}
                  </p>
                </div>

                {/* Read More Link */}
                <div className="card-footer bg-white border-top-0 text-end">
                  <Link
                    to={`/post/${post._id}`}
                    className="btn btn-sm btn-outline-info"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-12">
            <p className="lead text-muted">
              No posts found yet. Create your first post!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllPost;
