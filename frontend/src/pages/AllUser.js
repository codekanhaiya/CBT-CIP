import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Component: AllUser
 * Description: Fetches all users and allows searching by username.
 * Props:
 *  - username: The current user's username to exclude or filter results if needed
 */
function AllUser({ username }) {
  const [fUsers, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all users except current (optionally)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/alluser/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        });

        const data = await response.json();

        if (response.ok) {
          const sortedUsers = data.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          setUsers(sortedUsers);
        } else {
          setError(data.message || "Failed to fetch users");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [username]);

  // Filtered result based on search query
  const filteredUsers = fUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // UI: Loading
  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Fetching users...</p>
      </div>
    );
  }

  // UI: Error
  if (error) {
    return (
      <div className="alert alert-danger text-center mt-3" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div
      className="container bg-light p-4 rounded shadow"
      style={{ maxHeight: "50vh", overflowY: "auto" }}
    >
      {/* Search Input */}
      <div className="input-group mb-4 shadow-sm">
        <span
          className="input-group-text bg-primary text-white"
          id="search-icon"
        >
          🔍
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search"
          aria-describedby="search-icon"
        />
      </div>

      {/* User List */}
      {filteredUsers.length > 0 ? (
        <ul className="list-group">
          {filteredUsers.map((user) => (
            <Link
              key={user._id} // ✅ Key should be here
              to={`/allpost/${user.name}/${user._id}`}
              className="text-decoration-none text-dark fw-medium"
            >
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 border-bottom"
                style={{ background: "#f9f9f9" }}
              >
                {user.name}
                <span className="badge bg-info text-dark">View Posts</span>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="text-muted text-center">No any other user.</p>
      )}

      {/* Custom Scrollbar Styling */}
      <style jsx="true">{`
        .container::-webkit-scrollbar {
          width: 10px;
        }
        .container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .container::-webkit-scrollbar-thumb {
          background-color: gainsboro;
          border-radius: 10px;
          border: 2px solid #f1f1f1;
        }
        .container::-webkit-scrollbar-thumb:hover {
          background-color: gainsboro;
        }
      `}</style>
    </div>
  );
}

export default AllUser;
