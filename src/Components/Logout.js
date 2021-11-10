import React from "react";
import { useLoginContext } from "../Context/LoginContext";
import LocalStorage from "../lib/StorageService";

const storage = new LocalStorage(window.localStorage);

const Logout = () => {
    const { setLogin } = useLoginContext();
    const handleClick = () => {
        storage.remove("login");
        storage.remove("auth_token");
        setLogin(false);
    };

    return (
        <>
            <button
                onClick={handleClick}
                className="no-border btn-logout user-link bg-white"
            >
                Sign out
            </button>
        </>
    );
};

export default Logout;
