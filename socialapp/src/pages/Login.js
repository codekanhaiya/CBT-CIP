import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from "../utils";

function Login() {
    const [signinInfo, setSigninInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        const copySigninInfo = { ...signinInfo };
        copySigninInfo[name] = value;
        setSigninInfo(copySigninInfo);
    }
    // console.log('signinInfo -> ', signinInfo);
    const handleSignin = async (e) => {
        e.preventDefault();
        const { email, password } = signinInfo;
        if (!email || !password) {
            return handleError('Email & Password are required.')
        } try {
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signinInfo)
            });
            const result = await response.json();
            // console.log(result);
            const { success, Message, jwtToken, name, error,id } = result;
            if (success) {
                handleSuccess(Message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('loggedEmail', email);
                localStorage.setItem('loggedID', id);
                console.log(name,email,id);
                setTimeout(() => {
                    navigate('/apphome')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(Message);
            }
        } catch (err) {
            handleError(err);
        }
    }


    return (
        <div className="justify-content-center d-flex pt-5">
            <div className="signContainer">

                <link href="https://fonts.googleapis.com/css2?family=Rajdhani&display=swap" rel="stylesheet"></link>

                <h1><u>Signin</u></h1>
                <form onSubmit={handleSignin}>
                    <div>
                        <label htmlFor="email">Email-ID</label>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            placeholder="Enter your email..."
                            value={signinInfo.email}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            placeholder="Enter your password..."
                            value={signinInfo.password}
                        />
                    </div>
                    <button type="submit">signin</button>
                    <span>Don't have an account?
                        <Link to='/appsignup'> Create</Link>
                    </span>
                    <span>
                        <Link to='/apppass'>Forget Password</Link>
                    </span>
                </form>
                <ToastContainer />

            </div>
        </div>
    )
}

export default Login