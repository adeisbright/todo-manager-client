import React, { useState } from "react";
import Modal from "./Modal";
import TodoForm from "./TodoForm";

const AddTodo = () => {
    const [show, setShow] = useState(false);
    let url = `https://starkstech-interview.nw.r.appspot.com/items`;
    const showModal = (e) => {
        e.stopPropagation();
        setShow(true);
    };
    const hideModal = () => setShow(false);
    return (
        <div className="pad-tb-20">
            <button
                className="toggle-modal user-link login btn-primary"
                onClick={showModal}
            >
                Add +
            </button>
            <Modal handleClose={hideModal} show={show}>
                <TodoForm url={url} />
            </Modal>
        </div>
    );
};

export default AddTodo;
