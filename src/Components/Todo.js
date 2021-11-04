import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import { deleteResource, getData } from "../lib/FetchHelper";
import { TodoContext } from "../Context/TodosContext";
import LocalStorage from "../lib/StorageService";

const storage = new LocalStorage(window.localStorage);

const Todo = () => {
    const [items, setItems] = useState([]);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);

    let loginToken = storage.find("auth_token");

    const fetchItems = (url, authToken) => {
        getData(url, authToken)
            .then((result) => {
                console.log(result);
                if (Array.isArray(result.data)) {
                    setItems(result.data);
                }
            })
            .catch((error) => console.error(error));
    };

    const removeTodo = (id, authToken) => {
        deleteResource("http://localhost:3500/items/" + id, authToken)
            .then((result) => {
                let deleteIndex = items.findIndex(
                    (el) => String(el._id) === String(id)
                );
                items.splice(deleteIndex, 1);
                setItems([...items]);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
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
                        <h2>Filter Item By Date</h2>
                        <div className="d-flex">
                            <div className="fr-md-7 m-r-1">
                                <label htmlFor="start">From</label>
                                <input
                                    type="date"
                                    className="form-input"
                                    onChange={(e) => setFrom(e.target.value)}
                                />
                            </div>
                            <div className="fr-md-7 m-r-1">
                                <label htmlFor="start">To</label>
                                <input
                                    type="date"
                                    className="form-input"
                                    onChange={(e) => setTo(e.target.value)}
                                />
                            </div>
                            <div>
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
                                {item.todo_avatar ? (
                                    <figure>
                                        <img
                                            src={item.todo_avatar}
                                            alt="Avatar"
                                        />
                                    </figure>
                                ) : (
                                    <div className="card-header bg-card-header">
                                        Nothing in the header
                                    </div>
                                )}
                                <div className="card-body m-b-1">
                                    <h3>{item.title}</h3>
                                    <p>
                                        {item.description.length > 100
                                            ? item.description.substring(
                                                  0,
                                                  100
                                              ) + "..."
                                            : item.description}
                                    </p>
                                </div>
                                <div className="card-footer">
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
                                </div>
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
