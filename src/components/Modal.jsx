import React from "react";

function Modal({
    title,
    children,
    onClose
}) {
    return (
        <div className="modal-overlay">

            <div className="modal-box">

                <div className="modal-header">

                    <h2>{title}</h2>

                    <button
                        className="modal-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                <div className="modal-body">
                    {children}
                </div>

            </div>

        </div>
    );
}

export default Modal;