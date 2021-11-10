/**
 * Sends a get request to the server
 */
export const getData = async (url, token = false) => {
    try {
        const data = await fetch(url, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            redirect: "follow",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: token ? "Bearer" + " " + token : "",
            },
        });
        let parseRes = await data.json();
        return parseRes;
    } catch (error) {
        return error;
    }
};
/**
 *
 * @param {*} url
 * @param {*} host
 * @param {*} userToken
 * @returns
 */
export const getUsingKey = async (url, key) => {
    try {
        const data = await fetch(url, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            redirect: "follow",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "api-key": key,
            },
        });
        let parseRes = await data.json();
        return parseRes;
    } catch (error) {
        return error;
    }
};

export const putUsingKey = async (url, key, data) => {
    try {
        let useData = await fetch(url, {
            method: "PUT",
            cors: "cors",
            redirect: "follow",
            headers: {
                "Content-Type": "application/json",
                "api-key": key,
            },
            body: JSON.stringify(data),
        });
        let parseRes = await useData.json();
        return parseRes;
    } catch (error) {
        return error;
    }
};

export const postUsingKey = async (url, key, data) => {
    try {
        let useData = await fetch(url, {
            method: "POST",
            cors: "cors",
            redirect: "follow",
            headers: {
                "Content-Type": "application/json",
                "api-key": key,
            },
            body: JSON.stringify(data),
        });
        let parseRes = await useData.json();
        return parseRes;
    } catch (error) {
        return error;
    }
};
export const deleteUsingKey = async (url, key) => {
    try {
        let useData = await fetch(url, {
            method: "DELETE",
            cors: "cors",
            redirect: "follow",
            headers: {
                "Content-Type": "application/json",
                "api-key": key,
            },
        });
        let parseRes = await useData.json();
        return parseRes;
    } catch (error) {
        return error;
    }
};

/**Sends a delete request to the server */
export const deleteResource = async (url, token = false) => {
    try {
        let data = await fetch(url, {
            method: "DELETE",
            cors: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: token ? "Bearer" + " " + token : "",
            },
        });
        let parseRes = await data.json();
        return parseRes;
    } catch (error) {
        return error;
    }
};

/** Send Data */
export const sendData = async (url, data, token = false) => {
    try {
        let useData = await fetch(url, {
            method: "POST",
            cors: "cors",
            redirect: "follow",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: token ? "Bearer" + " " + token : "",
            },
            body: JSON.stringify(data),
        });
        let parseRes = await useData.json();
        return parseRes;
    } catch (error) {
        return error;
    }
};
/** Update Data */
export const putData = async (url, data, token = false) => {
    try {
        let useData = await fetch(url, {
            method: "PUT",
            cors: "cors",
            redirect: "follow",
            headers: {
                "Content-Type": "application/json",
                authorization: token ? "Bearer" + " " + token : "",
            },
            body: JSON.stringify(data),
        });
        let parseRes = await useData.json();
        return parseRes;
    } catch (error) {
        return error;
    }
};
