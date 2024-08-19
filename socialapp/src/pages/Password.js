import React, { useState } from "react";
import {useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from "../utils";

function Password() {
    const [passInfo, setPassInfo] = useState({
        email: '',
        newPassword:''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        const copyPassInfo = { ...passInfo };
        copyPassInfo[name] = value;
        setPassInfo(copyPassInfo);
    }
    // console.log('passsInfo -> ', passInfo);
    const handlePass = async (e) => {
        e.preventDefault();
        const { email, newPassword } = passInfo;
        if (!email || !newPassword) {
            return handleError('Email & New Password are required.')
        } try {
            const url = "http://localhost:8080/auth/password";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(passInfo)
            });
            const result = await response.json();
            // console.log(result);
            const { success, Message, error} = result;
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

                <h1><u>Forget-Password</u></h1>
                <form onSubmit={handlePass}>
                    <div>
                        <label htmlFor="email">Email-ID</label>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            placeholder="Enter your email..."
                            value={passInfo.email}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={handleChange}
                            type="password"
                            name="newPassword"
                            placeholder="Enter your new password..."
                            value={passInfo.password}
                        />
                    </div>
                    <button type="submit">update</button>
                </form>
                <ToastContainer />

            </div>
        </div>
    )
}

export default Password