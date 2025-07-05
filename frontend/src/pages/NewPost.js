import React, { useState } from "react";
import { handleError, handleSuccess } from "../utils/popup";

function Post() {
  const userId = localStorage.getItem("loggedID");

  const [postInfo, alreadySetPostInfo] = useState({
    title: "",
    description: "",
    author_id: userId,
    image: "",
  });

  const [postImage, setImage] = useState("");

  // Handle field changes
  const handlePostVal = (e) => {
    const { name, value } = e.target;
    alreadySetPostInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Convert image to base64 and validate type
  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

    if (!file || !allowedTypes.includes(file.type)) {
      handleError("Unsupported file type!");
      setTimeout(() => window.location.reload(), 1000);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
      alreadySetPostInfo((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
    reader.onerror = (err) => console.log("Error: ", err);
  };

  // Submit post
  const handleNewPost = async (e) => {
    e.preventDefault();
    const { title, description } = postInfo;

    if (!title || !description) {
      return handleError("Title & Description both are required.");
    }

    try {
      const response = await fetch("http://localhost:8080/mypost/newpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => window.location.reload(), 1000);
      } else if (error?.details?.[0]?.message) {
        handleError(error.details[0].message);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message || "Failed to publish post.");
    }
  };

  return (
    <div className="modal fade" id="commentModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          {/* Header */}
          <div className="modal-header bg-primary text-white rounded-top-4">
            <h5 className="modal-title">Create New Post</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            <form onSubmit={handleNewPost} className="d-flex flex-column gap-3">
              {/* Image Preview */}
              {postImage && (
                <div className="text-center">
                  <img
                    src={postImage}
                    alt="Preview"
                    className="img-fluid rounded shadow-sm"
                    style={{
                      maxHeight: "200px",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
                </div>
              )}

              {/* File Upload */}
              <div>
                <label className="form-label">Upload Image</label>
                <input
                  onChange={convertToBase64}
                  className="form-control"
                  type="file"
                  name="image"
                  accept="image/*"
                />
              </div>

              {/* Title */}
              <div>
                <label className="form-label">Title</label>
                <input
                  onChange={handlePostVal}
                  name="title"
                  type="text"
                  className="form-control"
                  placeholder="Enter post title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="form-label">Description</label>
                <textarea
                  onChange={handlePostVal}
                  name="description"
                  className="form-control"
                  placeholder="What's on your mind?"
                  rows="3"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-outline-primary px-4 rounded-pill"
                >
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
