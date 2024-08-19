import React, { useState } from "react";
// import postIcon from '../img/post.avif';
import { handleError, handleSuccess } from "../utils";
// import { useNavigate } from 'react-router-dom';


function Post() {

    const userId = localStorage.getItem('loggedID');

    // const navigate = useNavigate();

    const handlePostVal = (e) => {
        const { name, value } = e.target;
        console.log(name + " : " + value);
        const copyPostInfo = { ...postInfo };
        copyPostInfo[name] = value;
        alreadySetPostInfo(copyPostInfo);
    }

    const [postInfo, alreadySetPostInfo] = useState({
        title: '',
        description: '',
        author_id: userId,
        image: '',
    })

    const [postImage, setImage] = useState("");

    function convertToBase64(e) {

        // Check if the file type is allowed
        const file = e.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            setTimeout(() => {
                window.location.reload();
            }, 1000)
            return handleError("Unsupported file type!");
        }

        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);//base64 encoded string of image
            setImage(reader.result);
            alreadySetPostInfo(prevState => ({ // Update the postInfo state to include the base64 image
                ...prevState,
                image: reader.result
            }));
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        };
    }

    const handleNewPost = async (e) => {
        e.preventDefault();
        const { title, description } = postInfo;
        if (!title || !description) {
            return handleError('Title & Description both are required.');
        }
        try {
            const url = "http://localhost:8080/mypost/newpost";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postInfo)
            });
            const result = await response.json();
            console.log(result);
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    // navigate('/apphome')
                    window.location.reload(); // Reload the page after a successful post
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err.message || 'Failed to publish post.');
        }
    }

    return (
        <div className="modal fade" id="commentModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">New Post</h1>
                        <button type="button" className="btn-close text-white" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleNewPost}>
                            <div className="card">
                                {
                                    postImage === "" || postImage === null ? "" :
                                        <img className="card-img-top img-fluid" style={{ height: '20vh', width: '100%', objectFit: 'cover' }} src={postImage} alt="PostImage" />
                                }
                                <div className="card-body">
                                    <input
                                        onChange={convertToBase64}
                                        class="form-control"
                                        type="file" id="uploadPostImg"
                                        name="image"
                                    />
                                </div>
                            </div>

                            <div className="input-group flex-nowrap p-2">
                                <input
                                    onChange={handlePostVal}
                                    name="title"
                                    type="text"
                                    className="form-control"
                                    placeholder="Title"
                                    aria-describedby="addon-wrapping"
                                />
                            </div>
                            <div className="input-group p-2">
                                <textarea
                                    onChange={handlePostVal}
                                    name="description"
                                    className="form-control"
                                    aria-label="With textarea"
                                    placeholder="Write here..."
                                ></textarea>
                            </div>
                            <div className="d-grid d-md-flex justify-content-md-end">
                                {/* <button type="reset" className="btn btn-outline-secondary">reset</button> */}
                                <button type="submit" className="btn btn-outline-primary">publish</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Post;