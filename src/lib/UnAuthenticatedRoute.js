import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useLoginContext } from "../Context/LoginContext";

const querystring = (name, url = window.location.href) => {
    name = name.replace(/[[]]/g, "\\$&");

    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
    const results = regex.exec(url);

    if (!results) {
        return null;
    }
    if (!results[2]) {
        return "";
    }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

const UnAuthenticatedRoute = ({ children, ...rest }) => {
    const { login } = useLoginContext();
    const redirect = querystring("redirect");
    console.log(redirect);
    return (
        <Route {...rest}>
            {!login ? (
                children
            ) : (
                <Redirect
                    to={
                        redirect === "" || redirect === null
                            ? "/dashboard"
                            : redirect
                    }
                />
            )}
        </Route>
    );
};

export default UnAuthenticatedRoute;
