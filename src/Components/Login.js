import React, { useState, useRef } from "react";
import { useLoginContext } from "../Context/LoginContext";
import { Link } from "react-router-dom";
import { sendData } from "../lib/FetchHelper";
import LocalStorage from "../lib/StorageService";

const storage = new LocalStorage(window.localStorage);

const Login = () => {
    const { setLogin } = useLoginContext();

    let date = new Date();
    let year = date.getFullYear();

    let [email, setEmail] = useState("");
    let [pwd, setPwd] = useState("");
    let [response, setResponse] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let isAllValid = pwd && email;

        if (isAllValid) {
            setResponse("Processing...");
            let url = `http://localhost:3500/auth`;
            sendData(url, {
                email: email,
                password: pwd,
            })
                .then((res) => {
                    if (res.status === 200) {
                        setResponse("Login was successful");
                        setLogin(true);
                        storage.add("login", true);
                        storage.add("auth_token", res.token);
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
                        <p>Please login/signup to your account</p>
                    </div>
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
                    <button type="submit" className="btn btn-register m-r-1">
                        Login
                    </button>
                    <Link to="/signup" className="login bg-white">
                        Sign up
                    </Link>
                </form>
            </main>
            <aside className="login-sidebar  fr-md-6">
                <p>Making tasks manageable</p>
            </aside>
        </section>
    );
};

export default Login;
