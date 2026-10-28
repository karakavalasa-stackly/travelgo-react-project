import React from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {

    return (
        <div className="travel-dashboard">

            <Navbar />

            <div className="travel-body">

                <Sidebar />

                <main className="travel-content">

                    {children}

                </main>

            </div>

        </div>
    );
}

export default Layout;