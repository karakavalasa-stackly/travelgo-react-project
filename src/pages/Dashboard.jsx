import React, { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import {
    getDestinations,
    getTrips,
    getCustomers,
    getBookings
} from "../utils/travelStorage";

function Dashboard() {
    const [destinations, setDestinations] = useState([]);
    const [trips, setTrips] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [bookings, setBookings] = useState([]);

    const loadDashboardData = () => {
        setDestinations(getDestinations());
        setTrips(getTrips());
        setCustomers(getCustomers());
        setBookings(getBookings());
    };

    useEffect(() => {
        loadDashboardData();

        window.addEventListener(
            "destinationsUpdated",
            loadDashboardData
        );

        window.addEventListener(
            "tripsUpdated",
            loadDashboardData
        );

        window.addEventListener(
            "customersUpdated",
            loadDashboardData
        );

        window.addEventListener(
            "bookingsUpdated",
            loadDashboardData
        );

        return () => {
            window.removeEventListener(
                "destinationsUpdated",
                loadDashboardData
            );

            window.removeEventListener(
                "tripsUpdated",
                loadDashboardData
            );

            window.removeEventListener(
                "customersUpdated",
                loadDashboardData
            );

            window.removeEventListener(
                "bookingsUpdated",
                loadDashboardData
            );
        };
    }, []);

    const statistics = useMemo(() => {

        const confirmedBookings = bookings.filter(
            (booking) =>
                booking.bookingStatus === "Confirmed"
        );

        const pendingBookings = bookings.filter(
            (booking) =>
                booking.bookingStatus === "Pending"
        );

        const cancelledBookings = bookings.filter(
            (booking) =>
                booking.bookingStatus === "Cancelled"
        );

        const totalRevenue = confirmedBookings.reduce(
            (total, booking) =>
                total + Number(booking.totalAmount || 0),
            0
        );

        return {
            totalDestinations: destinations.length,
            totalTrips: trips.length,
            totalCustomers: customers.length,
            totalBookings: bookings.length,
            confirmedBookings: confirmedBookings.length,
            pendingBookings: pendingBookings.length,
            cancelledBookings: cancelledBookings.length,
            totalRevenue
        };

    }, [destinations, trips, customers, bookings]);

    const getCustomerName = (customerId) => {
        const customer = customers.find(
            (item) =>
                Number(item.id) === Number(customerId)
        );

        return customer
            ? customer.name
            : "Unknown Customer";
    };

    const getTripName = (tripId) => {
        const trip = trips.find(
            (item) =>
                Number(item.id) === Number(tripId)
        );

        return trip
            ? trip.name
            : "Unknown Trip";
    };

    const getStatusClass = (status) => {
        if (status === "Confirmed") {
            return "status-confirmed";
        }

        if (status === "Pending") {
            return "status-pending";
        }

        if (status === "Cancelled") {
            return "status-cancelled";
        }

        return "";
    };

    return (
        <Layout>

            <div className="dashboard-page">

                {/* Header */}

                <div className="page-header">

                    <div>
                        <h1>Dashboard</h1>

                        <p>
                            Overview of your travel booking system
                        </p>
                    </div>

                </div>


                {/* Statistics */}

                <div className="dashboard-stats">

                    <div className="dashboard-stat-card">

                        <div className="stat-icon">
                            🌍
                        </div>

                        <div>
                            <p>Total Destinations</p>

                            <h2>
                                {statistics.totalDestinations}
                            </h2>
                        </div>

                    </div>


                    <div className="dashboard-stat-card">

                        <div className="stat-icon">
                            ✈️
                        </div>

                        <div>
                            <p>Total Trips</p>

                            <h2>
                                {statistics.totalTrips}
                            </h2>
                        </div>

                    </div>


                    <div className="dashboard-stat-card">

                        <div className="stat-icon">
                            👥
                        </div>

                        <div>
                            <p>Total Customers</p>

                            <h2>
                                {statistics.totalCustomers}
                            </h2>
                        </div>

                    </div>


                    <div className="dashboard-stat-card">

                        <div className="stat-icon">
                            🎫
                        </div>

                        <div>
                            <p>Total Bookings</p>

                            <h2>
                                {statistics.totalBookings}
                            </h2>
                        </div>

                    </div>


                    <div className="dashboard-stat-card">

                        <div className="stat-icon">
                            💰
                        </div>

                        <div>
                            <p>Total Revenue</p>

                            <h2>
                                ₹{statistics.totalRevenue.toLocaleString()}
                            </h2>
                        </div>

                    </div>

                </div>


                {/* Charts */}

                <div className="dashboard-chart-row">

                    {/* Booking Status Chart */}

                    <div className="dashboard-chart-card">

                        <div className="chart-header">

                            <h2>
                                Booking Status
                            </h2>

                            <span>
                                {statistics.totalBookings} bookings
                            </span>

                        </div>


                        <div className="status-chart">

                            <div className="chart-item">

                                <div className="chart-label">

                                    <span>
                                        Confirmed
                                    </span>

                                    <strong>
                                        {statistics.confirmedBookings}
                                    </strong>

                                </div>

                                <div className="chart-bar-background">

                                    <div
                                        className="chart-bar confirmed-bar"
                                        style={{
                                            width:
                                                statistics.totalBookings > 0
                                                    ? `${(statistics.confirmedBookings / statistics.totalBookings) * 100}%`
                                                    : "0%"
                                        }}
                                    ></div>

                                </div>

                            </div>


                            <div className="chart-item">

                                <div className="chart-label">

                                    <span>
                                        Pending
                                    </span>

                                    <strong>
                                        {statistics.pendingBookings}
                                    </strong>

                                </div>

                                <div className="chart-bar-background">

                                    <div
                                        className="chart-bar pending-bar"
                                        style={{
                                            width:
                                                statistics.totalBookings > 0
                                                    ? `${(statistics.pendingBookings / statistics.totalBookings) * 100}%`
                                                    : "0%"
                                        }}
                                    ></div>

                                </div>

                            </div>


                            <div className="chart-item">

                                <div className="chart-label">

                                    <span>
                                        Cancelled
                                    </span>

                                    <strong>
                                        {statistics.cancelledBookings}
                                    </strong>

                                </div>

                                <div className="chart-bar-background">

                                    <div
                                        className="chart-bar cancelled-bar"
                                        style={{
                                            width:
                                                statistics.totalBookings > 0
                                                    ? `${(statistics.cancelledBookings / statistics.totalBookings) * 100}%`
                                                    : "0%"
                                        }}
                                    ></div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Quick Summary */}

                    <div className="dashboard-chart-card">

                        <div className="chart-header">

                            <h2>
                                Quick Summary
                            </h2>

                        </div>


                        <div className="summary-list">

                            <div className="summary-item">

                                <span>
                                    Confirmed Bookings
                                </span>

                                <strong>
                                    {statistics.confirmedBookings}
                                </strong>

                            </div>


                            <div className="summary-item">

                                <span>
                                    Pending Bookings
                                </span>

                                <strong>
                                    {statistics.pendingBookings}
                                </strong>

                            </div>


                            <div className="summary-item">

                                <span>
                                    Cancelled Bookings
                                </span>

                                <strong>
                                    {statistics.cancelledBookings}
                                </strong>

                            </div>


                            <div className="summary-item">

                                <span>
                                    Total Customers
                                </span>

                                <strong>
                                    {statistics.totalCustomers}
                                </strong>

                            </div>


                            <div className="summary-item">

                                <span>
                                    Available Trips
                                </span>

                                <strong>
                                    {statistics.totalTrips}
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Recent Bookings */}

                <div className="dashboard-recent-card">

                    <div className="chart-header">

                        <h2>
                            Recent Bookings
                        </h2>

                        <span>
                            Latest bookings
                        </span>

                    </div>


                    {bookings.length === 0 ? (

                        <div className="dashboard-empty">
                            No bookings available
                        </div>

                    ) : (

                        <div className="dashboard-table-wrapper">

                            <table className="dashboard-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Booking ID
                                        </th>

                                        <th>
                                            Customer
                                        </th>

                                        <th>
                                            Trip
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Amount
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {[...bookings]
                                        .sort(
                                            (a, b) =>
                                                new Date(b.bookingDate) -
                                                new Date(a.bookingDate)
                                        )
                                        .slice(0, 5)
                                        .map((booking) => (

                                            <tr key={booking.id}>

                                                <td>
                                                    #{booking.id}
                                                </td>

                                                <td>
                                                    {getCustomerName(
                                                        booking.customerId
                                                    )}
                                                </td>

                                                <td>
                                                    {getTripName(
                                                        booking.tripId
                                                    )}
                                                </td>

                                                <td>
                                                    {booking.bookingDate}
                                                </td>

                                                <td>
                                                    ₹
                                                    {Number(
                                                        booking.totalAmount
                                                    ).toLocaleString()}
                                                </td>

                                                <td>

                                                    <span
                                                        className={`dashboard-status ${getStatusClass(
                                                            booking.bookingStatus
                                                        )}`}
                                                    >
                                                        {
                                                            booking.bookingStatus
                                                        }
                                                    </span>

                                                </td>

                                            </tr>

                                        ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </Layout>
    );
}

export default Dashboard;