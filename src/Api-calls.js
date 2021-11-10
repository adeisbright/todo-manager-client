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
                    postUsingKey("http://localhost:3500/events", key, eventData)
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
