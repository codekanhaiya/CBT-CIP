import React, { useState, useEffect } from "react";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from 'react-toastify';

function Comment({postId}){

    console.log(postId);
    const userId = localStorage.getItem('loggedID');

    const handleCmt = (e) => { // Function to handle input changes
        const { name, value } = e.target;
        console.log(name + " : " + value);
        const copyCmtInfo = { ...cmtInfo };
        copyCmtInfo[name] = value;
        alreadySetCmtInfo(copyCmtInfo);
    }

    const cmtName = `comment${postId}`;
    console.log(cmtName)

    const [cmtInfo, alreadySetCmtInfo] = useState({
        comment:'',
        sender_id:userId,
        post_id:null, // Initially null or some default value
    })

    useEffect(() => {
        if (postId) {
            alreadySetCmtInfo(prevState => ({
                ...prevState,
                post_id: postId,
            }));
        }
    }, [postId]);

    const handleNewCmt = async (e) => {
        e.preventDefault();
        console.log(cmtInfo);
        const { comment,sender_id,post_id } = cmtInfo;
        if (!comment) {
            return handleError('Comment message is required.');
        }
        try {
            const url = "http://localhost:8080/comment/msg/";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cmtInfo)
            });
            const result = await response.json();
            console.log(result);
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    window.location.reload(); // Reload the page after a successful post
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err.message || 'Failed to comment.');
        }
    }

    return(
        <div className="mt-2 card card-body">
                                        <div className="input-group mb-3">
                                            <form 
                                                onSubmit={handleNewCmt}
                                                className="d-flex" 
                                                style={{ width: '100%' }}
                                            >
                                                <input 
                                                    onChange={handleCmt}
                                                    name="comment"
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Write here..." 
                                                    aria-label="Recipient's username" 
                                                    aria-describedby="button-addon2"
                                                    value={cmtInfo.comment} 
                                                />
                                                <button 
                                                    className="btn btn-outline-info" 
                                                    type="submit" id="button-addon2"
                                                >send</button>
                                            </form>
                                            <ToastContainer />
                                        </div>
                                    </div>
    )
}
export default Comment;