import React from "react";

function Navbar() {
    return (
        <div className="travel-navbar">

            <div className="navbar-brand">
                <span className="brand-icon">
                    ✈️
                </span>

                <h2>
                    Travel Booking
                </h2>
            </div>


            <div className="navbar-user">

                <span className="notification-icon">
                    🔔
                </span>

                <div className="user-avatar">
                    👤
                </div>

                <span>
                    Travel Admin
                </span>

            </div>

        </div>
    );
}

export default Navbar;