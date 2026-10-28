import React from "react";

function Toast({
    message,
    type = "success",
    onClose
}) {

    return (
        <div className={`toast toast-${type}`}>

            <span>
                {type === "success" ? "✅" : "⚠️"}
            </span>

            <p>
                {message}
            </p>

            <button
                onClick={onClose}
            >
                ×
            </button>

        </div>
    );
}

export default Toast;