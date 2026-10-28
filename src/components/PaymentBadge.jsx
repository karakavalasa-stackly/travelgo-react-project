import React from "react";

function PaymentBadge({ status }) {
    const getPaymentClass = () => {
        switch (status) {
            case "Paid":
                return "payment-paid";

            case "Pending":
                return "payment-pending";

            case "Refunded":
                return "payment-refunded";

            default:
                return "payment-default";
        }
    };

    return (
        <span className={`payment-badge ${getPaymentClass()}`}>
            {status}
        </span>
    );
}

export default PaymentBadge;