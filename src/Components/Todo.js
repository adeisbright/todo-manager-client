import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import { deleteResource, getData } from "../lib/FetchHelper";
import { TodoContext } from "../Context/TodosContext";
import LocalStorage from "../lib/StorageService";

const storage = new LocalStorage(window.localStorage);

const TodoRevealer = ({ click, index, n, id, removeTodo }) => {
    return (
        <>
            <span className="todo-tools-revealer" onClick={() => click(index)}>
                ...
            </span>
            <div
                className="todo-actions"
                style={{
                    display: index === n ? "block" : "none",
                }}
            >
                <Link to={"/items/" + id}>View</Link>
                <span>Update</span>
                <span
                    style={{ cursor: "pointer" }}
                    onClick={() => removeTodo(id)}
                >
                    Delete
                </span>
            </div>
        </>
    );
};

const Todo = () => {
    const [items, setItems] = useState([]);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);

    let loginToken = storage.find("auth_token");
    let [n, setN] = useState(-1);

    const handleClick = (index) => {
        setN(index);
    };

    const fetchItems = (url, authToken) => {
        getData(url, authToken)
            .then((result) => {
                // console.log(result);
                if (Array.isArray(result.data)) {
                    setItems(result.data);
                }
            })
            .catch((error) => console.error(error));
    };

    const removeTodo = (id) => {
        let loginToken = storage.find("auth_token");
        deleteResource("http://localhost:3500/items/" + id, loginToken)
            .then((result) => {
                if (result.ok) {
                    let deleteIndex = items.findIndex(
                        (el) => String(el._id) === String(id)
                    );
                    items.splice(deleteIndex, 1);
                    setItems([...items]);
                }
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        loginToken = storage.find("auth_token");
        fetchItems(
            "http://localhost:3500/items?page_no=1&offset=6",
            loginToken
        );
    }, []);

    return (
        <TodoContext.Provider value={{ items, setItems }}>
            {items ? (
                <>
                    <Navigation />
                    <div className="framer pad-tb-20">
                        <strong>Filter Todo by Date</strong>
                        <div className="d-flex">
                            <div className="fr-md-3 m-r-1">
                                <label htmlFor="start">Start Date</label>
                                <input
                                    type="date"
                                    className="form-input"
                                    onChange={(e) => setFrom(e.target.value)}
                                />
                            </div>
                            <div className="fr-md-3 m-r-1">
                                <label htmlFor="start">End Date</label>
                                <input
                                    type="date"
                                    className="form-input"
                                    onChange={(e) => setTo(e.target.value)}
                                />
                            </div>
                            <div style={{ padding: "2.3rem" }}>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() =>
                                        fetchItems(
                                            `http://localhost:3500/items?from=${from}&to=${to}`,
                                            loginToken
                                        )
                                    }
                                >
                                    Filter
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="framer pad-tb-20 d-grid grid-3">
                        {items.map((item, index) => (
                            <div className="relative" key={index}>
                                <TodoRevealer
                                    n={n}
                                    index={index}
                                    click={handleClick}
                                    id={item._id}
                                    removeTodo={removeTodo}
                                />
                                {!item.todo_avatar ? (
                                    <figure>
                                        <img
                                            src={item.todo_avatar}
                                            alt="Avatar"
                                        />
                                    </figure>
                                ) : (
                                    <div className="card-header bg-card-header">
                                        <h3>{item.title}</h3>
                                    </div>
                                )}
                                <div className="card-body m-b-1">
                                    <p className="m-b-1">{item.created_at}</p>
                                    <p>
                                        {item.description.length > 100
                                            ? item.description.substring(
                                                  0,
                                                  100
                                              ) + "..."
                                            : item.description}
                                    </p>
                                </div>
                                {/* <div className="card-footer">
                                    <button
                                        className="btn btn-danger m-r-1"
                                        onClick={() =>
                                            removeTodo(item._id, loginToken)
                                        }
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        to={`/items/${item._id}`}
                                        className="btn btn-primary"
                                    >
                                        View
                                    </Link>
                                </div> */}
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p>Loading item or no item to display yet</p>
            )}
        </TodoContext.Provider>
    );
};

export default Todo;
