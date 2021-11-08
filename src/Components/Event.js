import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import { sendData } from "../lib/FetchHelper";
import LocalStorage from "../lib/StorageService";
const storage = new LocalStorage(window.localStorage);
const Event = () => {
    let [response, setResponse] = useState("");
    let { search } = useLocation();
    let history = useHistory();
    let code = search.substring(search.indexOf("=") + 1, search.length);

    const createEvent = (url) => {
        if (storage.isStorage() && search) {
            let eventData = storage.find("event");
            if (eventData) {
                eventData.code = code;
                storage.update("event", eventData);
                sendData(url, eventData, storage.find("auth_token"))
                    .then((res) => {
                        console.log(res);
                        setResponse(res.message);
                        //history.push("/");
                    })
                    .catch((err) => setResponse(err.message));
            } else {
                //history.push("/");
                console.log("Yes");
            }
        }
    };
    useEffect(() => {
        createEvent("http://localhost:3500/events");
    }, []);
    return (
        <>
            <p>Creating your event</p>
            {response && <p>{response}</p>}
        </>
    );
};

export default Event;
