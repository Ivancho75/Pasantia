import React from "react";
import './Modal.css'

 function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="overlay">
            <div className="modal">
                <div>{children}</div>
            </div>
        </div>
    );
}

export default Modal;
