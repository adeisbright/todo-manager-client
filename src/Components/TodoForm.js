import React, { useState, useRef } from "react";
import { selector } from "../lib/DomHelper";
import { sendData } from "../lib/FetchHelper";
import { useTodoContext } from "../Context/TodosContext";
import { useHistory } from "react-router-dom";
import LocalStorage from "../lib/StorageService";
const storage = new LocalStorage(window.localStorage);

const TodoForm = ({ url }) => {
    let { items, setItems } = useTodoContext();
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [date, setDate] = useState("");
    let [time, setTime] = useState("");
    let [file, setFile] = useState("");
    let [response, setResponse] = useState("");
    let [createEvent, setCreatedEvent] = useState(false);

    let history = useHistory();
    let titleRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        let areInputsFilled = title && description && time && date;
        let form = selector("#item-form");
        let formData = new FormData(form);
        if (areInputsFilled) {
            setResponse("Processing...");

            formData.append("title", title);
            formData.append("description", description);
            formData.append("date", date);
            formData.append("time", time);
            formData.append("attachment", file);
            fetch(url, {
                method: "POST",
                body: formData,
            })
                .then((res) => res.json())
                .then((res) => {
                    setItems(items.concat([res.data]));
                    setResponse(res.message);
                    //Check if you have access to the user calender
                    if (storage.isStorage()) {
                        let eventToken = storage.find("event");
                        let eventData = {
                            summary: title,
                            startDate: date,
                            endDate: "2021-11-02T22:00:00:500Z",
                        };
                        storage.add("event", eventData);
                        if (eventToken) {
                            eventData.code = eventToken.code;
                            sendData("http://localhost:3500/events", eventData)
                                .then((res) => {
                                    console.log(res);
                                    eventData.expiryDate = res.expiryDate;
                                    storage.update("event", eventData);
                                    history.push("/");
                                })
                                .catch((err) => setResponse(err.message));
                        } else {
                            window.location.replace(res.eventUrl);
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setResponse(err.message);
                });
        } else {
            setResponse("Issues while adding item");
        }
    };
    const handleChange = (e) => {
        e.preventDefault();
        let { value } = e.target;

        if (!value) {
            return false;
        }
        switch (e.target.id) {
            case "f_title":
                let tRef = titleRef.current;
                if (value !== "") {
                    setTitle(value);
                    tRef.classList.remove("border-error-color");
                    tRef.classList.add("border-good-color");
                } else {
                    tRef.classList.add("border-error-color");
                    tRef.classList.remove("border-good-color");
                }
                break;
            case "f_description":
                if (value !== "") {
                    setDescription(value);
                }
                break;
            case "f_date":
                if (value !== "") {
                    setDate(value);
                }
                break;
            case "f_time":
                if (value !== "") {
                    setTime(value);
                }
                break;
            case "f_file":
                let files = e.target.files[0];
                setFile(files);
            default:
                //console.log(e.target.id);
                return false;
        }
    };
    return (
        <>
            {createEvent ? (
                <p className="todo-form">
                    Adding your Event to Google Calender ...
                </p>
            ) : (
                <section className="modal-main">
                    <form
                        className="todo-form"
                        method="post"
                        id="item-form"
                        encType="multipart/form-data"
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
                            onChange={handleChange}
                            ref={titleRef}
                        />
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="form-input"
                            id="f_description"
                            required
                            onChange={handleChange}
                        />
                        <div className="d-flex">
                            <div
                                class="fr-md-6 m-r-1"
                                style={{ width: "100%" }}
                            >
                                <label htmlFor="Date">Start Date</label>
                                <input
                                    type="date"
                                    className="form-input"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div style={{ width: "100%" }}>
                                <label htmlFor="time">Start Time</label>
                                <input
                                    type="time"
                                    className="form-input"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="d-flex">
                            <div class="fr-md-6 m-r-1">
                                <label htmlFor="Date">Due Date</label>
                                <input
                                    type="date"
                                    className="form-input"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div style={{ width: "100%" }}>
                                <label htmlFor="time">Due Time</label>
                                <input
                                    type="time"
                                    className="form-input"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <label htmlFor="time">Attach file</label>
                        <input
                            type="file"
                            className="form-input"
                            required
                            onChange={handleChange}
                        />
                        <div className="d-flex justify-between">
                            <div>
                                <label htmlFor="status">Status</label>
                                <select
                                    style={{
                                        display: "block",
                                        appearance: "none",
                                        outline: "0",
                                        border: "1px solid #ccc",
                                        padding: "5px",
                                        borderRadius: "6px",
                                    }}
                                >
                                    <option value="c">Completed</option>
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
                </section>
            )}
        </>
    );
};

export default TodoForm;
