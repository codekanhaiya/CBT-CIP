import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from "../utils";
import userIcon from '../img/img.png';
import NewPostComponent from "./NewPost";
import AllPostComponet from "./AllPost";
import AllUserComponent from "./AllUser";

// import { ImGoogleDrive } from "react-icons/im";


function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [loggedEmail, setEmail] = useState('');
    const [loggedID, setId] = useState('');
    // const [products, setProdects] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
        setEmail(localStorage.getItem('loggedEmail'));
        setId(localStorage.getItem('loggedID'));
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('loggedEmail');
        localStorage.removeItem('loggedID');
        handleSuccess('User loggedout successfully!');
        setTimeout(() => {
            navigate('/appsignin');
        }, 1000)
    }





    // ..............................................................our fetched Products..................
    // const fetchProducts = async () => {
    //     try {
    //         const url = "http://localhost:8080/products";
    //         const headers = {
    //             headers: {
    //                 'authorization': localStorage.getItem('token')
    //             }
    //         }
    //         const response = await fetch(url, headers);
    //         const result = await response.json();
    //         console.log(result);
    //         setProdects(result);
    //     } catch (err) {
    //         handleError(err);
    //     }
    // }




    useEffect(() => {
        // fetchProducts()

    }, [])
    // ..............................................................our fetched Products..................


    return (
        <div>
            {/* <h1>{loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>
                {
                    products && products?.map((item, index)=>(
                        <ul key={index}>
                            <span>{item.name} : {item.price}</span>
                        </ul>
                    ))
                }
            </div> 
            <ToastContainer/> */}

            <div className="container-fluid-md rounded bg-light text-primary-emphasis">

                {/* <div className="d-flex justify-content-around align-items-center">
                    <div className="card border-0 shadow-lg bg-body-tertiary rounded" style={{ width: 'max-content' }}>
                        <h2 className="lg border-bottom border-primary border-2 p-2">CONNECTSPHERE</h2>
                    </div> */}
                    {/* <div>
                        <button type="button" style={{ width: 'max-content' }} className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                    </div> */}
                {/* </div> */}

                <hr className="border border-primary border-1 opacity-75" />

                <div className="row p-5 pt-0 pb-0 mb-0">

                    <div className="col-sm-6">

                        <div style={{ width: '18rem' }}>
                            <img width="80rem" src={userIcon} alt="User Icon" className="rounded-circle shadow-lg bg-body-tertiary rounded" />
                            <div className="card-body border-start border-primary p-2">
                                <h5 className="card-title">{loggedInUser}</h5>
                                <p className="card-text">{loggedEmail}</p>
                                {/* <p>{loggedID}</p> */}
                                {/* {userData._id} */}
                            </div>
                        </div>

                        <div className="row card p-2 border-0">
                            <div className="row m-2">
                                {/* <!-- Button trigger modal --> */}
                                <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#commentModal">New Post</button>
                                {/* <!-- Modal --> */}
                                <NewPostComponent />
                            </div>
                            <div className="row m-2">
                                <button type="button" className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                            </div>
                        </div>

                    </div>

                    <div className="col-sm-6">

                        <div className="card border-0 p-2 m-2">
                            <AllUserComponent username={loggedInUser} />
                        </div>

                    </div>
                </div>


                <div className="row">
                    <AllPostComponet userId={loggedID} />
                </div>


            </div>
            <ToastContainer />
        </div>
    )
}

export default Home