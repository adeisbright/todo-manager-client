import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import UnAuthenticatedRoute from "./lib/UnAuthenticatedRoute";
import AuthenticatedRoute from "./lib/AuthenticatedRoute";

const Login = lazy(() => import("./Components/Login"));
const Signup = lazy(() => import("./Components/Signup"));
const Todo = lazy(() => import("./Components/Todo"));
const LandingPage = lazy(() => import("./Components/LandingPage"));
const SingleTodo = lazy(() => import("./Components/SingleTodo"));
const Event = lazy(() => import("./Components/Event"));
const APIKey = lazy(() => import("./Components/APIKey"));

const Preloader = () => {
    return (
        <>
            <p>Loading...</p>
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
            <UnAuthenticatedRoute path="/signup">
                <Suspense fallback={<Preloader />}>
                    <Signup />
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
            <AuthenticatedRoute path="/api">
                <Suspense fallback={<Preloader />}>
                    <APIKey />
                </Suspense>
            </AuthenticatedRoute>
            <UnAuthenticatedRoute path="/" exact>
                <Suspense fallback={<Preloader />}>
                    <LandingPage />
                </Suspense>
            </UnAuthenticatedRoute>
            <Route>
                <p>Error 404 : You are on the Wrong Path</p>
            </Route>
        </Switch>
    );
}
