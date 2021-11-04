import React, { useState } from "react";
import Modal from "./Modal";
import TodoForm from "./TodoForm";

const AddTodo = () => {
    const [show, setShow] = useState(false);
    let url = `http://localhost:3500/items`;
    const showModal = (e) => {
        e.stopPropagation();
        setShow(true);
        console.log(show, e.target);
    };
    const hideModal = () => setShow(false);
    return (
        <div className="pad-tb-20">
            <button href="#" className="toggle-modal" onClick={showModal}>
                Add +
            </button>
            <Modal handleClose={hideModal} show={show}>
                <TodoForm url={url} />
            </Modal>
        </div>
    );
};

export default AddTodo;
