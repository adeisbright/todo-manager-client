import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { LoginContext } from "./Context/LoginContext";
import AppRoutes from "./AppRoutes";
import ErrorBoundary from "./ErrorBoundary";
import LocalStorage from "./lib/StorageService";
import "./Tdm.css";

const storage = new LocalStorage(window.localStorage);

const App = () => {
    const [login, setLogin] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    const load = async () => {
        try {
            if (storage.isStorage()) {
                if (storage.find("login")) {
                    setLogin(true);
                } else {
                    setLogin(false);
                }
            }
        } catch (e) {
            console.error(e);
        }
        setIsAuthenticating(false);
    };

    useEffect(() => {
        load();
    }, []);

    return (
        !isAuthenticating && (
            <ErrorBoundary>
                <LoginContext.Provider value={{ login, setLogin }}>
                    <BrowserRouter>
                        <AppRoutes />
                    </BrowserRouter>
                </LoginContext.Provider>
            </ErrorBoundary>
        )
    );
};

export default App;
