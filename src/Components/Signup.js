import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { sendData } from "../lib/FetchHelper";
import LocalStorage from "../lib/StorageService";
import { Link } from "react-router-dom";

const storage = new LocalStorage(window.localStorage);

const Signup = () => {
    let date = new Date();
    let year = date.getFullYear();
    let history = useHistory();
    let [userName, setUserName] = useState("");
    let [email, setEmail] = useState("");
    let [pwd, setPwd] = useState("");
    let [response, setResponse] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let isAllValid = pwd && email && userName;

        if (isAllValid) {
            setResponse("Processing...");
            let url = `http://localhost:3500/users`;
            sendData(url, {
                email: email,
                password: pwd,
                name: userName,
            })
                .then((res) => {
                    if (res.status === 200) {
                        setResponse(
                            "Registration was successful.Redirectiong to Login in 2s"
                        );
                        setTimeout(() => {
                            history.push("/login");
                        }, 2000);
                        return;
                    } else {
                        setResponse(res.message);
                    }
                })
                .catch((err) => setResponse(err.message));
        } else {
            setResponse("Fill the form correctly");
        }
    };

    return (
        <section className="d-flex">
            <main className="fr-md-6 main">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="center-text">
                        <h2>TDM</h2>
                        <p>Welcome back!</p>
                        <p>Please signup to create an account</p>
                    </div>
                    <label htmlFor="username">Username</label>
                    <input
                        className="input input-border-faint"
                        type="text"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        className="input input-border-faint"
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        className="input input-border-faint"
                        type="password"
                        id="pwd"
                        autoComplete
                        onChange={(e) => setPwd(e.target.value)}
                    />
                    <p>{response}</p>

                    <button type="submit" className="login bg-white m-r-1">
                        Sign up
                    </button>
                    <Link to="/login" className="btn btn-register m-r-1">
                        Login
                    </Link>
                </form>
            </main>
            <aside className="login-sidebar  fr-md-6">
                <p>Making tasks manageable</p>
            </aside>
        </section>
    );
};

export default Signup;
