import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { putData, getData } from "../../js/api";
import Modal from "./Modal";
import LocalStorage from "../../js/CalenderService";
const storage = new LocalStorage(window.localStorage);

const SingleTodo = () => {
    let [item, setItem] = useState({});
    const { pathname } = useLocation();
    const [show, setShow] = useState(false);

    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [date, setDate] = useState("");
    let [time, setTime] = useState("");
    let [status, setStatus] = useState("");
    let [response, setResponse] = useState("");

    let loginToken = storage.find("auth_token");
    let url = "http://localhost:3500" + pathname;
    //Ref for feedback as user leaves form field
    let titleRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        let areInputsFilled = title && description && time && date;
        if (areInputsFilled) {
            setResponse("Processing...");
            console.log(title, description);
            putData(url, {
                title: title,
                description: description,
                date: date,
                time: time,
                status: status,
            })
                .then((res) => {
                    setItem(res.data);
                    setResponse(res.message);
                    console.log(res);
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
        o: "On going",
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
                    <main className="framer border-around">
                        <header>
                            <h1 className="m-b-2">{item.title}</h1>
                        </header>
                        <h2>Status: {todoStatus[item.status]} </h2>
                        <p>{item.created_at} </p>
                        <div className="m-b-2">{item.description}</div>
                        {item.status !== "c" && (
                            <button
                                href="#"
                                className="btn toggle-modal m-b-2"
                                onClick={showModal}
                            >
                                Update
                            </button>
                        )}
                        <Modal handleClose={hideModal} show={show}>
                            <form
                                className="todo-form"
                                id="item-form"
                                onSubmit={handleSubmit}
                            >
                                <div className="center-text">
                                    <h2>Task Manager</h2>
                                    <p>Add task , track task , manage task</p>
                                </div>
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    id="f_title"
                                    required
                                    onBlur={(e) => setTitle(e.target.value)}
                                    ref={titleRef}
                                />
                                <label htmlFor="status">Status</label>
                                <select
                                    className="form-input"
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="p">Pending</option>
                                    <option value="o">On Going</option>
                                    <option value="c">Completed</option>
                                </select>
                                <label htmlFor="description">Description</label>
                                <textarea
                                    className="form-input"
                                    id="f_description"
                                    required
                                    onBlur={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                                <label htmlFor="Date">Date</label>
                                <input
                                    type="date"
                                    className="form-input"
                                    id="f_date"
                                    required
                                    onBlur={(e) => setDate(e.target.value)}
                                />
                                <label htmlFor="time">Time</label>
                                <input
                                    type="time"
                                    className="form-input"
                                    id="f_time"
                                    required
                                    onBlur={(e) => setTime(e.target.value)}
                                />
                                <p>{response}</p>
                                <button
                                    type="submit"
                                    className="btn-submit"
                                    id="btn_submit"
                                >
                                    Proceed
                                </button>
                            </form>
                        </Modal>
                        <footer className="framer bg-dark white-text">
                            &copy; Starkstech Global 2021.
                        </footer>
                    </main>
                </>
            ) : (
                <p>There is no item</p>
            )}
        </>
    );
};

export default SingleTodo;
