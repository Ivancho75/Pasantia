import React from "react";

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button style={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                <div>{children}</div>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },
    modal: {
        background: "#fff",
        padding: "2rem",
        borderRadius: "8px",
        position: "relative",
        minWidth: "300px",
        maxWidth: "90vw",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    },
    closeButton: {
        position: "absolute",
        top: "0.5rem",
        right: "0.5rem",
        background: "transparent",
        border: "none",
        fontSize: "1.5rem",
        cursor: "pointer",
    },
};

export default Modal;