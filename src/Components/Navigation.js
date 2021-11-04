import React from "react";
import { Link } from "react-router-dom";
import AddTodo from "./Add-Todo";
import Logout from "./Logout";

const Navigation = () => {
    return (
        <>
            <header>
                <div className="d-flex framer justify-between pad-tb-20">
                    <section>
                        <h1 className="brand-identity">
                            <a className="brand-name" href="">
                                Task Manager
                            </a>
                        </h1>
                    </section>
                    <nav className="d-small-toggle d-flex justify-between">
                        <Link to="/api" className="m-r-1">
                            API
                        </Link>
                        <Logout />
                        <AddTodo />
                    </nav>
                </div>
            </header>
        </>
    );
};
export default Navigation;
