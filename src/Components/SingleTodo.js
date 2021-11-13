import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { putData, getData } from "../lib/FetchHelper";
import Modal from "./Modal";
import LocalStorage from "../lib/StorageService";
import Tree from "../tree.webp";
import { selector } from "../lib/DomHelper";
const storage = new LocalStorage(window.localStorage);

const SingleTodo = () => {
    let [item, setItem] = useState({});
    const { pathname } = useLocation();
    const [show, setShow] = useState(false);

    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [startDate, setStartDate] = useState("");
    let [startTime, setStartTime] = useState("");
    let [dueDate, setDueDate] = useState("");
    let [dueTime, setDueTime] = useState("");
    let [file, setFile] = useState("");
    let [status, setStatus] = useState("");
    let [response, setResponse] = useState("");

    let loginToken = storage.find("auth_token");
    let url = "https://starkstech-interview.nw.r.appspot.com" + pathname;
    //Ref for feedback as user leaves form field
    let titleRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        let token = storage.find("auth_token");

        let areInputsFilled =
            title &&
            description &&
            startTime &&
            startDate &&
            dueTime &&
            dueDate;

        if (areInputsFilled && token) {
            setResponse("Processing...");
            putData(
                url,
                {
                    title: title,
                    description: description,
                    startDate: startDate,
                    startTime: startTime,
                    dueDate: dueDate,
                    dueTime: dueTime,
                    status: status,
                },
                token
            )
                .then((res) => {
                    if (res.status === 200) {
                        setItem(res.data);
                    }

                    setResponse(res.message);
                })
                .catch((err) => {
                    console.log(err);
                    setResponse(err.message);
                });
        } else {
            setResponse("Issues while adding item");
        }
    };

    const showModal = () => setShow(true);
    const hideModal = () => setShow(false);
    const todoStatus = {
        p: "Pending",
        i: "In Progress",
        c: "Completed",
    };

    const getItem = (url, authToken) => {
        getData(url, authToken)
            .then((result) => {
                setItem(result.data);
            })
            .catch((err) => console.error(err.message));
    };

    useEffect(() => {
        getItem(url, loginToken);
    }, []);

    return (
        <>
            {item ? (
                <>
                    <section className="todo-area">
                        <main className="border-around">
                            {item.todo_avatar ? (
                                <figure>
                                    <img
                                        src={
                                            item.todo_avatar.startsWith("h")
                                                ? item.todo_avatar
                                                : Tree
                                        }
                                        alt="Avatar"
                                        className="w-100 card-img"
                                    />
                                </figure>
                            ) : (
                                <figure>
                                    <img
                                        src={Tree}
                                        alt="Avatar"
                                        className="w-100 card-img"
                                    />
                                </figure>
                            )}

                            <section className="todo-area-body">
                                <header>
                                    <h1 className="m-b-1">{item.title}</h1>
                                </header>
                                <strong>
                                    Status: {todoStatus[item.status]}{" "}
                                </strong>

                                <p>Date Created : {item.createdAt} </p>
                                <p>
                                    Starts:
                                    {new Date(item.startNum).toLocaleString()}
                                </p>
                                <p>
                                    Ends:
                                    {new Date(item.endNum).toLocaleString()}
                                </p>
                                <div className="m-b-2 item-description">
                                    {item.description}
                                </div>
                                {item.status !== "c" && (
                                    <button
                                        href="#"
                                        className="btn toggle-modal m-b-2 btn-primary"
                                        onClick={showModal}
                                    >
                                        Update
                                    </button>
                                )}
                                <Modal handleClose={hideModal} show={show}>
                                    <form
                                        method="post"
                                        className="todo-form"
                                        id="item-form"
                                        encType="multipart/form-data"
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="center-text">
                                            <h2>Task Manager</h2>
                                            <p>
                                                Add task , track task , manage
                                                task
                                            </p>
                                        </div>
                                        <label htmlFor="title">Title</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            required
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            ref={titleRef}
                                        />
                                        <label htmlFor="description">
                                            Description
                                        </label>
                                        <textarea
                                            className="form-input"
                                            required
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                        />
                                        <div className="d-flex wrap-sm">
                                            <div
                                                class="fr-md-6 m-r-1"
                                                style={{ width: "100%" }}
                                            >
                                                <label htmlFor="Date">
                                                    Start Date
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-input"
                                                    required
                                                    onChange={(e) =>
                                                        setStartDate(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div style={{ width: "100%" }}>
                                                <label htmlFor="time">
                                                    Start Time
                                                </label>
                                                <input
                                                    type="time"
                                                    className="form-input"
                                                    required
                                                    onChange={(e) =>
                                                        setStartTime(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex wrap-sm">
                                            <div
                                                class="fr-md-6 m-r-1"
                                                style={{ width: "100%" }}
                                            >
                                                <label htmlFor="Date">
                                                    Due Date
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-input"
                                                    required
                                                    onChange={(e) =>
                                                        setDueDate(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div style={{ width: "100%" }}>
                                                <label htmlFor="time">
                                                    Due Time
                                                </label>
                                                <input
                                                    type="time"
                                                    className="form-input"
                                                    required
                                                    onChange={(e) =>
                                                        setDueTime(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-between wrap-sm">
                                            <div>
                                                <label htmlFor="status">
                                                    Status
                                                </label>
                                                <select
                                                    style={{
                                                        display: "block",
                                                        appearance: "none",
                                                        outline: "0",
                                                        border: "1px solid #ccc",
                                                        padding: "5px",
                                                        borderRadius: "6px",
                                                    }}
                                                    onChange={(e) =>
                                                        setStatus(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="c">
                                                        Completed
                                                    </option>
                                                    <option value="p">
                                                        Pending
                                                    </option>
                                                    <option value="i">
                                                        In-Progress
                                                    </option>
                                                </select>
                                            </div>
                                            <div style={{ padding: "1.5rem" }}>
                                                <button
                                                    type="reset"
                                                    className="btn btn-reset m-r-1"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="btn btn-primary"
                                                    type="submit"
                                                >
                                                    Proceed
                                                </button>
                                            </div>
                                        </div>
                                        <p>{response}</p>
                                    </form>
                                </Modal>
                            </section>

                            <footer
                                style={{
                                    background: "#000",
                                    color: "#fff",
                                    padding: "1rem",
                                }}
                            >
                                &copy; Starkstech Global 2021.
                            </footer>
                        </main>
                    </section>
                </>
            ) : (
                <p>There is no item</p>
            )}
        </>
    );
};

export default SingleTodo;
