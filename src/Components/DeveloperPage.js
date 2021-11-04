import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./Logout";
import {
    sendData,
    getData,
    putData,
    getUsingKey,
    putUsingKey,
    postUsingKey,
    deleteUsingKey,
} from "../../js/api";
import LocalStorage from "../../js/CalenderService";
const storage = new LocalStorage(window.localStorage);

const DevelopersHub = () => {
    let [key, setKey] = useState("");
    let date = new Date();
    let year = date.getFullYear();
    let authToken = storage.find("auth_token");
    const getKey = (url, token) => {
        getData(url, token)
            .then((res) => {
                setKey(res.api_key);
            })
            .catch((err) => console.error(err));
    };

    const getTodos = () => {
        getUsingKey("http://localhost:3500/api/v1/todos", key)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getSingleTodo = () => {
        getUsingKey(
            "http://localhost:3500/api/v1/todos/617ea2a05be00ccd0c203ac7",
            key
        )
            .then((result) => {
                console.log(result);
            })
            .catch((err) => console.error(err.message));
    };

    const updateTodo = () => {
        putUsingKey(
            "http://localhost:3500/api/v1/todos/617ea2a05be00ccd0c203ac7",
            key,
            {
                title: "Testing My RESTFUL API",
                description: `Creating a service that users can communicate with using an API. I have invested a lot
                    into learning how to Architect Applications especially those of this nature`,
                date: "2021-11-02",
                time: "02:01:48",
                status: "c",
            }
        )
            .then((result) => {
                console.log(result);
            })
            .catch((err) => console.error(err.message));
    };

    const removeTodo = (id) => {
        deleteUsingKey(
            "http://localhost:3500/api/v1/todos/617e928d1a746401bce7845c",
            key
        )
            .then((result) => {
                console.log(result);
            })
            .catch((error) => console.error(error));
    };

    const addTodo = () => {
        let eventData = {
            title: "External API",
            description: "Small thing",
            date: "2021-11-02",
            time: "13:20:44",
        };
        postUsingKey("http://localhost:3500/items", key, eventData)
            .then((res) => {
                console.log(res);
                if (storage.isStorage()) {
                    let eventToken = storage.find("event");
                    let eventData = {
                        summary: "My Public Facing API",
                        startDate: "2021-11-02T23:00:00:400Z",
                        endDate: "2021-11-02T22:00:00:500Z",
                    };
                    storage.add("event", eventData);
                    if (eventToken) {
                        eventData.code = eventToken.code;
                        postUsingKey(
                            "http://localhost:3500/events",
                            key,
                            eventData
                        )
                            .then((res) => {
                                console.log(res);
                                eventData.expiryDate = res.expiryDate;
                                storage.update("event", eventData);
                                //history.push("/");
                            })
                            .catch((err) => console.log(err.message));
                    } else {
                        window.location.replace(res.eventUrl);
                    }
                }
            })
            .catch((error) => console.log(error));
    };
    const generateKey = () => {
        putData(
            "http://localhost:3500/api/key",
            {
                time: Date.now(),
            },
            authToken
        )
            .then((res) => {
                console.log(res);
                setKey(res.data);
            })
            .catch((error) => console.error(error));
    };
    useEffect(() => {
        getKey("http://localhost:3500/api/key", authToken);
    }, []);

    return (
        <>
            <header>
                <section className="framer d-flex justify-between">
                    <div>
                        <h1>
                            <Link to="/">STM</Link>
                        </h1>
                    </div>
                    <nav className="d-flex">
                        <p>Hello , Adeleke</p>
                        <LogoutButton />
                    </nav>
                </section>
            </header>
            <section className="d-flex framer justify-betwee m-b-2">
                <aside
                    className="fr-2 m-r-1"
                    style={{
                        height: "100vh",
                        background: "#000",
                        color: "#fff",
                        position: "fixed",
                        top: "0px",
                        left: "0px",
                    }}
                >
                    <div>
                        <p>Dashboard Menus</p>
                    </div>
                </aside>
                <main style={{ height: "100%" }}>
                    <h2>Welcome to STM API Documentation</h2>
                    <p class="m-b-2">
                        Create a Developer's API Key to programmatically create
                        Todos
                    </p>
                    <div className="d-flex space-between w-100 m-b-2">
                        <input
                            type="input"
                            className="form-input m-r-1"
                            value={key}
                        />
                        <button
                            className="btn btn-primary btn-input fr-4"
                            onClick={generateKey}
                        >
                            Generate Key
                        </button>
                    </div>
                    <section className="m-b-2">
                        <h2>Test the API</h2>
                        <p>
                            This example page will show how to test run the
                            API's
                        </p>
                        <button className="btn btn-primary" onClick={addTodo}>
                            Fetch Todos
                        </button>
                    </section>

                    <footer>&copy; Simple Todo Manager {year}</footer>
                </main>
            </section>
        </>
    );
};

export default DevelopersHub;
