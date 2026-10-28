import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {

    return (
        <aside className="travel-sidebar">

            <div className="sidebar-title">

                <span>
                    🌍
                </span>

                <h2>
                    Travel Hub
                </h2>

            </div>


            <nav className="sidebar-menu">

                <NavLink
                    to="/"
                    end
                >
                    <span>📊</span>
                    Dashboard
                </NavLink>


                <NavLink
                    to="/destinations"
                >
                    <span>🌎</span>
                    Destinations
                </NavLink>


                <NavLink
                    to="/trips"
                >
                    <span>🧳</span>
                    Trips
                </NavLink>


                <NavLink
                    to="/customers"
                >
                    <span>👥</span>
                    Customers
                </NavLink>


                <NavLink
                    to="/bookings"
                >
                    <span>🎫</span>
                    Bookings
                </NavLink>

                <NavLink to="/calendar">
                    <span>📅</span>
                    Calendar
                </NavLink>

            </nav>

        </aside>
    );
}

export default Sidebar;