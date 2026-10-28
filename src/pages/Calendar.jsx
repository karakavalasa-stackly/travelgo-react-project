import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getBookings, getCustomers, getTrips } from "../utils/travelStorage";

function Calendar() {
    const [bookings, setBookings] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [trips, setTrips] = useState([]);

    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        setBookings(getBookings());
        setCustomers(getCustomers());
        setTrips(getTrips());
    }, []);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        days.push(day);
    }

    const monthName = currentDate.toLocaleString("default", {
        month: "long"
    });

    const previousMonth = () => {
        setCurrentDate(
            new Date(year, month - 1, 1)
        );
    };

    const nextMonth = () => {
        setCurrentDate(
            new Date(year, month + 1, 1)
        );
    };

    const getBookingsForDate = (day) => {
        if (!day) return [];

        const dateString =
            `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        return bookings.filter(
            (booking) => booking.bookingDate === dateString
        );
    };

    const getCustomerName = (customerId) => {
        const customer = customers.find(
            (item) => Number(item.id) === Number(customerId)
        );

        return customer ? customer.name : "Unknown Customer";
    };

    const getTripName = (tripId) => {
        const trip = trips.find(
            (item) => Number(item.id) === Number(tripId)
        );

        return trip ? trip.name : "Unknown Trip";
    };

    return (
        <Layout>
            <div className="calendar-page">

                <div className="page-header">
                    <div>
                        <h1>Calendar</h1>
                        <p>Manage your travel bookings by date</p>
                    </div>
                </div>

                <div className="calendar-card">

                    <div className="calendar-header">

                        <button
                            className="secondary-btn"
                            onClick={previousMonth}
                        >
                            ← Previous
                        </button>

                        <h2>
                            {monthName} {year}
                        </h2>

                        <button
                            className="secondary-btn"
                            onClick={nextMonth}
                        >
                            Next →
                        </button>

                    </div>

                    <div className="calendar-weekdays">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>

                    <div className="calendar-grid">

                        {days.map((day, index) => {

                            const dayBookings =
                                getBookingsForDate(day);

                            return (
                                <div
                                    key={index}
                                    className={`calendar-day ${
                                        !day ? "empty-day" : ""
                                    }`}
                                >

                                    {day && (
                                        <>
                                            <div className="calendar-date">
                                                {day}
                                            </div>

                                            <div className="calendar-events">

                                                {dayBookings.map(
                                                    (booking) => (
                                                        <div
                                                            key={booking.id}
                                                            className="calendar-event"
                                                        >
                                                            <strong>
                                                                #{booking.id}
                                                            </strong>

                                                            <span>
                                                                {getCustomerName(
                                                                    booking.customerId
                                                                )}
                                                            </span>

                                                            <small>
                                                                {getTripName(
                                                                    booking.tripId
                                                                )}
                                                            </small>
                                                        </div>
                                                    )
                                                )}

                                            </div>
                                        </>
                                    )}

                                </div>
                            );
                        })}

                    </div>

                </div>

            </div>
        </Layout>
    );
}

export default Calendar;