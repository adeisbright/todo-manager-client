import { Fragment } from "react";

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
                        <a href="#" className="user-link">
                            Docs
                        </a>
                        <a href="#" className="user-link login">
                            Login
                        </a>
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
                        <button
                            type="button"
                            aria-label="button"
                            className="btn btn-register"
                        >
                            Get Started
                        </button>
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
