import React, { useEffect, useState } from 'react';
import { handleError, handleSuccess } from '../utils';
import { Link } from 'react-router-dom';

function AllPost({ userId }) {

    const [fPosts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const postImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";

    useEffect(() => {
        const fetchPosts = async () => {

            try {
                // Using fetch
                const response = await fetch("http://localhost:8080/allpost/myposts/", {
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
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    // const formatDate = (dateString) => {
    //     const date = new Date(dateString);

    //     // Format the date parts
    //     const day = date.getDate();
    //     const month = date.toLocaleString('en-US', { month: 'short' });
    //     const year = date.getFullYear();
    //     const hours = date.getHours();
    //     const minutes = date.getMinutes();
    //     const period = hours >= 12 ? 'PM' : 'AM';

    //     // Convert hours to 12-hour format
    //     const formattedHours = hours % 12 || 12;

    //     // Format minutes with leading zero if needed
    //     const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    //     return `${day} ${month} ${year}, ${formattedHours}:${formattedMinutes} ${period}`;
    // };

    // const handleDelete = async (postId) => {
    //     // console.log(postId);
    //     try {
    //         const response = await fetch(`http://localhost:8080/delpost/post/`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ postId })
    //         });
    //         // console.log(response);

    //         if (response.ok) {
    //             console.log('Post deleted successfully!');
    //             handleSuccess('Post deleted successfully!');
    //             setTimeout(() => {
    //                 window.location.reload();
    //             }, 1000)
    //         } else {
    //             console.error('Failed to delete the post.');
    //             handleError('Failed to delete this post.');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         handleError('Error:', error);
    //     }
    // };


    return (
        <div className="p-5">




            {/* ...................for testintg purpose code start.................... */}
            {/* <div>
                <h1>Posts by {userId}</h1>
                {fPosts.length > 0 ? (
                    <ul>
                        {fPosts.map(post => (
                            <li key={post.title}>{post.description}</li> // Adjust based on your post model
                        ))}
                    </ul>
                ) : (
                    <p>No posts found for {userId}</p>
                )}
            </div> */}
            {/* ...................for testintg purpose code start.................... */}





            <div className='d-flex justify-content-center m-3'>
                <button type="button" className="btn btn-primary">
                    Total Post: <span className="badge badge-light">{fPosts.length}</span>
                </button>
            </div>

            {/* <div className="card-body">

                {fPosts.length > 0 ?
                    fPosts.map(post => (

                        <div key={post._id} className="card mb-3 shadow p-3 mb-5 bg-body-tertiary rounded">
                            <div className="row g-0">
                                <div className="card-body row">
                                    <div className="col-sm-4">
                                        <img className="card-img-left img-fluid rounded" style={{ height: '20vh', width: '100%', objectFit: 'cover' }} src={post.image} alt="No have any image." />
                                    </div>
                                    <div className="col-sm-8">
                                        <h5 className="card-title pt-2">{post.title}</h5>
                                        <p className="card-text">{post.description.slice(0, 200)}...</p>
                                        <div className="card-footer text-muted p-2 m-0 d-grid gap-2 d-md-flex justify-content-md-end">
                                            <p className="card-text m-0 p-0 text-end fs-6 fst-italic text-secondary">
                                                <small className="text-body-secondary">
                                                    {formatDate(post.updatedAt)}
                                                </small>
                                            </p>
                                            <button
                                                onClick={() => handleDelete(post._id)}
                                                type="button"
                                                className="btn btn-outline-danger"
                                            >&#9249;</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))
                    : (
                        <p>Here, no any post !</p>
                    )}


            </div> */}



            {/* ...........................Second designing...................................... */}

            <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5 g-4">

                {fPosts.length > 0 ?
                    fPosts.map(post => (

                        <div className="col" key={post._id}>
                            <div className="card border-0 shadow-lg bg-body-tertiary rounded" style={{ height: "60vh" }}>
                                <img src={post.image ? post.image : postImg} style={{ height: '30vh', width: '100%', objectFit: 'cover' }} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">{post.description.slice(0, 100)}...</p>
                                </div>
                            </div>
                            <div className="bg-info rounded-bottom d-flex justify-content-end p-2 m-2 mt-0 pt-0">
                                {/* <a href="#">Read More...</a> */}
                                <Link to={`/post/${post._id}`}>Read More...</Link>
                            </div>
                        </div>

                    ))
                    : (
                        <p>Here, no any post !</p>
                    )}

            </div>



        </div>
    )
}

export default AllPost;