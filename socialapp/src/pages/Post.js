import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { handleError, handleSuccess } from '../utils';

function Post() {

    const { postId } = useParams();
    const postImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";

    const [Post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {

            try {
                // Using fetch
                const response = await fetch("http://localhost:8080/sppost/get/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ postId })
                });

                const data = await response.json();
                // console.log(data);
                if (response.ok) {
                    setPost(data);
                } else {
                    setError(data.message || 'Failed to fetch  your post.');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        // Format the date parts
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        const formattedHours = hours % 12 || 12;

        // Format minutes with leading zero if needed
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${day} ${month} ${year}, ${formattedHours}:${formattedMinutes} ${period}`;
    };


    const handleDelete = async (postId) => {
        // console.log(postId);
        try {
            const response = await fetch(`http://localhost:8080/delpost/post/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId })
            });
            // console.log(response);

            if (response.ok) {
                console.log('Post deleted successfully!');
                handleSuccess('Post deleted successfully!');
                setTimeout(() => {
                    navigate('/apphome')
                }, 1000)
            } else {
                console.error('Failed to delete the post.');
                handleError('Failed to delete this post.');
            }
        } catch (error) {
            console.error('Error:', error);
            handleError('Error:', error);
        }
    };


    return (
        // <h1>{postId}</h1>
        <div className="container p-2">
            <div className="row border m-2">
                <img src={Post.image ? Post.image : postImg} alt="pic" />
            </div>
            <div className="row m-3">
                <h3>{Post.title}</h3>
                <p>{Post.description}</p>
                <p className="card-text m-0 p-0 text-end fs-6 fst-italic text-secondary">
                    <small className="text-body-secondary">
                    {formatDate(Post.updatedAt)}
                    </small>
                </p>
            </div>
            <div className="row m-5">
                <button
                    onClick={() => handleDelete(postId)}
                    type="button"
                    style={{width:'max-content'}}
                    className="btn btn-outline-danger"
                >&#9249;</button>
            </div>
        </div>
    )
}
export default Post