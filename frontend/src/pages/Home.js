import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../utils/popup";

// Component and asset imports
import NewPostComponent from "./NewPost";
import AllPostComponet from "./AllPost";
import AllUserComponent from "./AllUser";

/**
 * Component: Home
 * Description: Dashboard for the logged-in user showing profile, user list, new post option, and post feed.
 */
function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [loggedEmail, setEmail] = useState("");
  const [loggedID, setId] = useState("");
  const navigate = useNavigate();

  // Load user info from localStorage on mount
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    setEmail(localStorage.getItem("loggedEmail"));
    setId(localStorage.getItem("loggedID"));
  }, []);

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("loggedEmail");
    localStorage.removeItem("loggedID");
    handleSuccess("User logged out successfully!");

    setTimeout(() => {
      navigate("/appsignin");
    }, 1000);
  };

  return (
    <div className="container-fluid py-4 px-3">
      {/* Top border */}
      <hr className="border border-primary border-2 opacity-75 mb-4" />

      {/* Top Row: User Info & All Users */}
      <div className="row gy-4">
        {/* Left: Logged-in User Info and Actions */}
        <div className="col-lg-4 col-md-6">
          <div className="card shadow-sm rounded-4 border-0 p-3">
            <div className="d-flex align-items-center gap-3">
              <img
                src="/img/img.png"
                alt="User"
                width="80"
                height="80"
                className="rounded-circle border border-2 border-primary"
              />
              <div>
                <h5 className="mb-1 text-primary">{loggedInUser}</h5>
                <p className="mb-0 text-muted small">{loggedEmail}</p>
              </div>
            </div>

            <div className="mt-4 d-grid gap-2">
              {/* New Post Button & Modal */}
              <button
                type="button"
                className="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#commentModal"
              >
                + Create New Post
              </button>
              <NewPostComponent />

              {/* Logout Button */}
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Right: All Users Component */}
        <div className="col-lg-8 col-md-6">
          <div className="card shadow-sm rounded-4 border-0 p-3 h-100">
            <h5 className="mb-3 text-secondary fw-semibold">All Users</h5>
            <AllUserComponent username={loggedInUser} />
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="row mt-5">
        <div className="col-12">
          <AllPostComponet userId={loggedID} />
        </div>
      </div>

      {/* Toast notifications */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Home;
