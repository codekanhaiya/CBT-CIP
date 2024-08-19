import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from "../utils";

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
    console.log('signupInfo -> ', signupInfo);
    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('Name, Email & Password are required.')
        } try {
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            console.log(result);
            const { success, Message, error } = result;
            if (success) {
                handleSuccess(Message);
                setTimeout(() => {
                    navigate('/appsignin')
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

                <h1><u>Signup</u></h1>
                <form onSubmit={handleSignup}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="name"
                            autoFocus
                            placeholder="Enter your name..."
                            value={signupInfo.name}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email-ID</label>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            placeholder="Enter your email..."
                            value={signupInfo.email}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            placeholder="Enter your password..."
                            value={signupInfo.password}
                        />
                    </div>
                    <button type="submit">signup</button>
                    <span>Already have an account?
                        <Link to='/appsignin'> Login</Link>
                    </span>
                </form>
                <ToastContainer />

            </div>
        </div>
    )
}

export default Signup