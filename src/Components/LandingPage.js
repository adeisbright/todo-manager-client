import { Fragment } from "react";
import { Link } from "react-router-dom";
const LandingPage = () => {
    const todayDate = new Date();
    const currentYear = todayDate.getFullYear();
    return (
        <Fragment>
            <header className="border-line-bottom m-b-3">
                <div className="framer d-flex justify-between">
                    <section>
                        <h1>
                            <a href="#" className="brand-name">
                                TDM
                            </a>
                        </h1>
                    </section>
                    <nav className="main-nav pad-5">
                        <a
                            href="https://localhost:3500/docs"
                            className="user-link"
                        >
                            Docs
                        </a>
                        <Link to="/login" className="user-link login">
                            Login
                        </Link>
                    </nav>
                </div>
            </header>
            <section className="hero m-b-3">
                <div className="d-flex justify-between framer">
                    <section className="fr-md-6 fr-12">
                        <h2 className="hero-title">
                            Create , Manage , and Be notified of Task
                        </h2>
                        <p>
                            TDM , our well crafted Todo Manager is the easiest
                            way to create and integrate your task with Google
                            Calender.
                        </p>
                        <Link
                            to="/signup"
                            type="button"
                            aria-label="button"
                            className="btn btn-register"
                        >
                            Get Started
                        </Link>
                    </section>
                </div>
            </section>
            <footer className="center-text relative">
                <p class="fixed-bottom">
                    &copy; TDM {currentYear}. All Rights Reserved
                </p>
            </footer>
        </Fragment>
    );
};

export default LandingPage;
