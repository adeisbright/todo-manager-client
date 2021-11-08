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
    let [startDate, setStartDate] = useState("");
    let [startTime, setStartTime] = useState("");
    let [dueDate, setDueDate] = useState("");
    let [dueTime, setDueTime] = useState("");
    let [file, setFile] = useState("");
    let [response, setResponse] = useState("");
    let [createEvent, setCreatedEvent] = useState(false);

    let history = useHistory();
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
        let form = selector("#item-form");
        let formData = new FormData(form);
        if (areInputsFilled && token) {
            setResponse("Processing...");

            formData.append("title", title);
            formData.append("description", description);
            formData.append("startDate", startDate);
            formData.append("startTime", startTime);
            formData.append("dueDate", dueDate);
            formData.append("dueTime", dueTime);
            formData.append("attachment", file);

            fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    authorization: "Bearer" + " " + token,
                },
                body: formData,
            })
                .then((res) => res.json())
                .then((res) => {
                    setItems(items.concat([res.data]));
                    setResponse(res.message);
                    if (storage.isStorage()) {
                        let eventData = {
                            summary: title,
                            description: description,
                            start: {
                                date: startDate,
                                time: startTime,
                                timeZone: "GMT+1",
                            },
                            end: {
                                date: dueDate,
                                time: dueTime,
                                timeZone: "GMT+1",
                            },
                        };
                        storage.add("event", eventData);

                        if (res.ok) {
                            sendData(
                                "http://localhost:3500/events",
                                eventData,
                                token
                            )
                                .then((res) => {
                                    console.log(res);
                                    setResponse(`Event link ${res.link}`);
                                    //history.push("/");
                                })
                                .catch((err) => setResponse(err.message));
                        } else if (res.eventUrl) {
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
        let files = e.target.files[0];
        setFile(files);
    };
    return (
        <>
            {createEvent ? (
                <p className="todo-form">
                    Adding your Event to Google Calender ...
                </p>
            ) : (
                <form
                    method="post"
                    className="todo-form"
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
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        ref={titleRef}
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-input"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="d-flex wrap-sm">
                        <div class="fr-md-6 m-r-1" style={{ width: "100%" }}>
                            <label htmlFor="Date">Start Date</label>
                            <input
                                type="date"
                                className="form-input"
                                required
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div style={{ width: "100%" }}>
                            <label htmlFor="time">Start Time</label>
                            <input
                                type="time"
                                className="form-input"
                                required
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="d-flex wrap-sm">
                        <div class="fr-md-6 m-r-1" style={{ width: "100%" }}>
                            <label htmlFor="Date">Due Date</label>
                            <input
                                type="date"
                                className="form-input"
                                required
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                        <div style={{ width: "100%" }}>
                            <label htmlFor="time">Due Time</label>
                            <input
                                type="time"
                                className="form-input"
                                required
                                onChange={(e) => setDueTime(e.target.value)}
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
                    <div className="d-flex justify-between wrap-sm">
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
                                <option value="p">Pending</option>
                                <option value="i">In-Progress</option>
                            </select>
                        </div>
                        <div style={{ padding: "1.5rem" }}>
                            <button
                                type="reset"
                                className="btn btn-reset m-r-1"
                            >
                                Cancel
                            </button>
                            <button className="btn btn-primary" type="submit">
                                Proceed
                            </button>
                        </div>
                    </div>
                    <p>{response}</p>
                </form>
            )}
        </>
    );
};

export default TodoForm;
