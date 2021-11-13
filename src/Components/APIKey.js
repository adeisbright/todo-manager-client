import React, { useState, useEffect } from "react";
import { getData, putData } from "../lib/FetchHelper";
import LocalStorage from "../lib/StorageService";
const storage = new LocalStorage(window.localStorage);

const APIKey = () => {
    let [key, setKey] = useState("");
    let date = new Date();
    let year = date.getFullYear();
    let authToken = storage.find("auth_token");
    /**
     *
     * @param {String} url the path to generating an API key
     * @param {String} token the authorization token
     */
    const getKey = (url, token) => {
        getData(url, token)
            .then((res) => {
                setKey(res.api_key);
            })
            .catch((err) => console.error(err));
    };

    const generateKey = () => {
        putData(
            "https://starkstech-interview.nw.r.appspot.com/key",
            {
                time: Date.now(),
            },
            authToken
        )
            .then((res) => {
                setKey(res.data);
            })
            .catch((error) => console.error(error));
    };
    useEffect(() => {
        getKey(
            "https://starkstech-interview.nw.r.appspot.com/api/key",
            authToken
        );
    }, []);

    return (
        <>
            <section className="d-flex framer wrap justify-betwee m-b-2">
                <main style={{ height: "100%" }}>
                    <h2>Welcome to the Public API Section</h2>
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
                    <p>
                        This API only supports development mode for now , use
                        http://localhost:3000 as your client{" "}
                    </p>
                    <footer>&copy; Simple Todo Manager {year}</footer>
                </main>
            </section>
        </>
    );
};

export default APIKey;
