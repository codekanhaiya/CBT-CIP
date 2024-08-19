// import postIcon from '../img/post.avif';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AllUser({ username }) {

    const [fUsers, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    useEffect(() => {
        const fetchUsers = async () => {

            try {
                // Using fetch
                const response = await fetch("http://localhost:8080/alluser/users", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username })
                });

                const data = await response.json();
                // console.log(data);
                if (response.ok) {
                    // Sort posts by updatedAt in descending order
                    const sortedUsers = data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                    setPosts(sortedUsers);
                } else {
                    setError(data.message || 'Failed to fetch posts');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [username]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Filter users based on the search query
    const filteredUsers = fUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (

        <div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">@</span>
                </div>
                <input
                type="text"
                placeholder="search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="form-control mb-3"
                 aria-describedby="basic-addon1"
            />
            </div>
            {filteredUsers.length > 0 ? (
                <ul className="userList list-group">
                    {filteredUsers.map(user => (
                        <Link to={`/allpost/${user.name}/${user._id}`}>
                            <li className="list-group-item" key={user._id}>{user.name}</li>
                        </Link>
                    ))}
                </ul>
            ) : (
                <p>No any other user.</p>
            )}
        </div>
    )
}

export default AllUser;