import React from "react";

function StatusBadge({ status }) {
    const getStatusClass = () => {
        switch (status) {
            case "Confirmed":
                return "status-confirmed";

            case "Pending":
                return "status-pending";

            case "Cancelled":
                return "status-cancelled";

            case "Active":
                return "status-active";

            case "Inactive":
                return "status-inactive";

            case "Upcoming":
                return "status-upcoming";

            case "Completed":
                return "status-completed";

            default:
                return "status-default";
        }
    };

    return (
        <span className={`status-badge ${getStatusClass()}`}>
            {status}
        </span>
    );
}

export default StatusBadge;