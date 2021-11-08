import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import UnAuthenticatedRoute from "./lib/UnAuthenticatedRoute";
import AuthenticatedRoute from "./lib/AuthenticatedRoute";

const Login = lazy(() => import("./Components/Login"));
const Todo = lazy(() => import("./Components/Todo"));
const LandingPage = lazy(() => import("./Components/LandingPage"));
const SingleTodo = lazy(() => import("./Components/SingleTodo"));
const Event = lazy(() => import("./Components/Event"));
// const DevelopersHub = lazy(() => import("./components/DevelopersHub"));

const Preloader = () => {
    return (
        <>
            <p>Hi , wait while we load the page. This will not take long</p>
        </>
    );
};
export default function AppRoutes() {
    return (
        <Switch>
            <UnAuthenticatedRoute path="/login">
                <Suspense fallback={<Preloader />}>
                    <Login />
                </Suspense>
            </UnAuthenticatedRoute>

            <AuthenticatedRoute path="/dashboard" exact>
                <Suspense fallback={<Preloader />}>
                    <Todo />
                </Suspense>
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/items/*" exact>
                <Suspense fallback={<Preloader />}>
                    <SingleTodo />
                </Suspense>
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/events">
                <Suspense fallback={<Preloader />}>
                    <Event />
                </Suspense>
            </AuthenticatedRoute>
            <UnAuthenticatedRoute path="/" exact>
                <Suspense fallback={<Preloader />}>
                    <LandingPage />
                </Suspense>
            </UnAuthenticatedRoute>
            <Route>
                <p>Error 404 : Not Found</p>
            </Route>
        </Switch>
    );
}
