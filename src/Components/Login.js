import React, { useState } from "react";

const Login = () => {
    let [email, setEmail] = useState("");
    let [pwd, setPwd] = useState("");
    let [response, setResponse] = useState("");

    return (
        <section className="d-flex">
            <main className="fr-md-6 main">
                <form className="login-form">
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
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        className="input input-border-faint"
                        type="password"
                        id="pwd"
                        autoComplete
                    />
                    <button type="submit" className="btn btn-register m-r-1">
                        Login
                    </button>
                    <button type="submit" className="login bg-white">
                        Sign up
                    </button>
                </form>
            </main>
            <aside className="login-sidebar  fr-md-6">
                <p>Making tasks manageable</p>
            </aside>
        </section>
    );
};

export default Login;
