import React, { useEffect, useState } from 'react';
import { handleError, handleSuccess } from '../utils';

function ShowComment({ postId }) {

    let count = 0;

    const userId = localStorage.getItem('loggedID');

    const [fComment, setComment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCommments = async () => {

            try {
                // Using fetch
                const response = await fetch("http://localhost:8080/allmsg/mymsgs/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId, postId })
                });

                const data = await response.json();
                // console.log(data);
                if (response.ok) {
                    // Sort posts by updatedAt in descending order
                    const sortedComments = data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                    setComment(sortedComments);
                } else {
                    setError(data.message || 'Failed to fetch comments');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCommments();
    }, [userId, postId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleDelete = async (msgId) => {
        // console.log(msgId);
        try {
            const response = await fetch(`http://localhost:8080/delmsg/msgs/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ msgId })
            });
            // console.log(response);

            if (response.ok) {
                console.log('Comment deleted successfully!');
                handleSuccess('Comment deleted successfully!');
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            } else {
                console.error('Failed to delete the comment.');
                handleError('Failed to delete this comment.');
            }
        } catch (error) {
            console.error('Error:', error);
            handleError('Error:', error);
        }
    };

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
        // <table className='table'>
        //     <tbody>
        //         {fComment.length > 0 ?
        //             fComment.map(msg => (
        //                 <tr key={msg._id}>
        //                     <th scope="row">{++count}</th>
        //                     <td className="d-flex justify-content-evenly">
        //                         {msg.comment}
        //                     </td>
        //                     <td>
        //                         <button
        //                             onClick={() => handleDelete(msg._id)}
        //                             type="button"
        //                             class="btn btn-outline-danger"
        //                         >trash</button>
        //                     </td>
        //                 </tr>

        //             ))
        //             : (
        //                 <p className="card m-2 p-2">There, no any comment !</p>
        //             )}
        //     </tbody>
        // </table>

        <div className='card bg-light'>
            <div className='card-body'>
                {fComment.length > 0 ?
                    fComment.map(msg => (
                        <div key={msg._id}>
                            <p>{msg.comment}</p>
                            <span className='m-0 p-0 d-flex justify-content-between'>
                                <p className="card-text text-end fs-6 fst-italic text-secondary">
                                    <small className="text-body-secondary">
                                        {formatDate(msg.updatedAt)}
                                    </small>
                                </p>
                                <button
                                    onClick={() => handleDelete(msg._id)}
                                    type="button"
                                    class="btn btn-outline-danger"
                                >trash</button>
                            </span>
                            <hr className="my-4" />
                        </div>
                    ))
                    : (
                        <p>There, no any comment !</p>
                    )}
            </div>
        </div>

    )
}
export default ShowComment;
