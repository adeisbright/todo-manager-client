import React from "react";

const Modal = ({ handleClose, show, children }) => {
    const displayClass = show ? "modal d-block" : "modal d-none";
    return (
        <section className={displayClass}>
            <div className="modal-main">
                {children}
                <button onClick={handleClose} className="modal-closer">
                    &times;
                </button>
            </div>
        </section>
    );
};

export default Modal;
