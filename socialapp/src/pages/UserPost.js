import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import NewCommentComponent from "./Comment";
import NewShowCommentComponent from "./ShowComment";

function UserPost() {
    // const username = "Rajanyadav";
    const { userName } = useParams(); // Extract the userName from the URL
    const { userId }=useParams(); // // Extract the user-id from the URL

    const postImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";

    const [fPosts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [pstId, setPostId] = useState(null);
    const handleClick = (id) => {
        setPostId(id);
    };

    useEffect(() => {
        const fetchPosts = async () => {

            try {
                // Using fetch
                const response = await fetch("http://localhost:8080/usersallpost", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId })
                });

                const data = await response.json();
                // console.log(data);
                if (response.ok) {
                    // Sort posts by updatedAt in descending order
                    const sortedPosts = data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                    setPosts(sortedPosts);
                } else {
                    setError(data.message || 'Failed to fetch posts');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [userName,userId]);

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



    return (

        <div>
            <div className="container-fluid gap-3 bg-primary d-flex align-items-center justify-content-center" style={{ height: '40vh' }}>
                <div>
                    <img width="80rem" src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png" className="rounded-circle shadow-lg bg-body-tertiary rounded" alt="..." />
                </div>
                <h1 className="text-white">
                    <u>{userName}</u>
                    <h6>{userId}</h6>
                    {/* <hr className="border"/> */}
                </h1>
            </div>

            <hr class="border border-primary border-3 opacity-75" />

            <div className="container bg-primary p-5 rounded">
                <div className='d-flex justify-content-center m-3'>
                    <button type="button" className="btn btn-dark mb-5">
                        Total Post: <span className="badge badge-light">{fPosts.length}</span>
                    </button>
                </div>

                <div className="card-body">

                    {fPosts.length > 0 ?
                        fPosts.map(post => (

                            <div key={post._id} className="card mb-3 shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                                <div className="row g-0">
                                    <div className="card-body row">
                                        <div className="col-sm-4">
                                            <img className="card-img-left img-fluid rounded shadow" style={{ height: '20vh', width: '100%', objectFit: 'cover' }} src={post.image ? post.image : postImg} alt="No have any image." />
                                        </div>
                                        <div className="col-sm-8">
                                            <h5 className="card-title pt-2"><u>{post.title}</u></h5>
                                            <p className="card-text">{post.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex border-bottom border-primary" style={{ cursor: 'pointer' }}>
                                    <div
                                        onClick={() => handleClick(post._id)} 
                                        className="bg-primary rounded-top text-white p-2" 
                                        data-bs-toggle="collapse" 
                                        data-bs-target={`#${post._id}`} 
                                        aria-expanded="false" 
                                        aria-controls="collapseExample">Comments: </div>
                                </div>
                                <div className="collapse" id={`${post._id}`}>
                                    <NewCommentComponent postId = {pstId}/>
                                    <NewShowCommentComponent postId = {pstId}/>
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <p className="card-text text-end fs-6 fst-italic text-secondary">
                                        <small className="text-body-secondary">
                                            {formatDate(post.updatedAt)}
                                        </small>
                                    </p>
                                </div>
                            </div>

                        ))
                        : (
                            <h4 className="text-white">Here, no any post !</h4>
                        )}


                </div>
            </div>

        </div>

    )
}

export default UserPost