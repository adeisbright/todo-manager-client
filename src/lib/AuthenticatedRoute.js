import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useLoginContext } from "../Context/LoginContext";

const AuthenticatedRoute = ({ children, ...rest }) => {
    const { pathname, search } = useLocation();
    const { login } = useLoginContext();
    return (
        <Route {...rest}>
            {login ? (
                children
            ) : (
                <Redirect to={`/login?redirect=${pathname}${search}`} />
            )}
        </Route>
    );
};
export default AuthenticatedRoute;
