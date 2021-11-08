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
                    <nav className="d-small-toggle d-flex justify-between main-nav pad-5">
                        <Link
                            to="/api"
                            className="user-link m-r-1"
                            style={{ paddingTop: "10px" }}
                        >
                            API
                        </Link>
                        <Logout />
                        <AddTodo className="user-link" />
                    </nav>
                </div>
            </header>
        </>
    );
};
export default Navigation;
