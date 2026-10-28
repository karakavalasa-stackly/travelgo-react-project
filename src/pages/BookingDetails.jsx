import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import Layout from "../components/Layout";

import {
    getBookings,
    getCustomers,
    getTrips
} from "../utils/travelStorage";


function BookingDetails() {

    const {
        id
    } = useParams();

    const navigate =
        useNavigate();


    const [booking, setBooking] =
        useState(null);

    const [customer, setCustomer] =
        useState(null);

    const [trip, setTrip] =
        useState(null);


    // ==========================================
    // LOAD DATA
    // ==========================================

    useEffect(() => {

        const bookings =
            getBookings();

        const customers =
            getCustomers();

        const trips =
            getTrips();


        const selectedBooking =
            bookings.find(
                (item) =>
                    String(item.id) ===
                    String(id)
            );


        if (!selectedBooking) {

            setBooking(null);

            return;

        }


        setBooking(
            selectedBooking
        );


        const selectedCustomer =
            customers.find(
                (item) =>
                    String(item.id) ===
                    String(
                        selectedBooking.customerId
                    )
            );


        const selectedTrip =
            trips.find(
                (item) =>
                    String(item.id) ===
                    String(
                        selectedBooking.tripId
                    )
            );


        setCustomer(
            selectedCustomer
        );

        setTrip(
            selectedTrip
        );

    }, [id]);


    // ==========================================
    // NOT FOUND
    // ==========================================

    if (!booking) {

        return (

            <Layout>

                <div className="booking-details-page">

                    <div className="booking-details-card">

                        <div className="booking-details-icon">
                            📋
                        </div>

                        <h2>
                            Booking not found
                        </h2>

                        <p>
                            The selected booking
                            does not exist.
                        </p>


                        <button
                            className="primary-btn"
                            onClick={() =>
                                navigate(
                                    "/bookings"
                                )
                            }
                        >
                            Back to Bookings
                        </button>

                    </div>

                </div>

            </Layout>

        );

    }


    return (

        <Layout>

            <div className="booking-details-page">


                {/* HEADER */}

                <div className="page-header">

                    <div>

                        <button
                            className="secondary-btn"
                            onClick={() =>
                                navigate(
                                    "/bookings"
                                )
                            }
                        >
                            ← Back to Bookings
                        </button>


                        <h1>
                            Booking #
                            {booking.id}
                        </h1>


                        <p>
                            Complete booking
                            information
                        </p>

                    </div>

                </div>


                {/* DETAILS CARD */}

                <div className="booking-details-card">


                    <div className="booking-details-icon">
                        📋
                    </div>


                    <h2>
                        Booking #
                        {booking.id}
                    </h2>


                    <div className="booking-status-row">

                        <span
                            className={
                                booking.bookingStatus ===
                                "Confirmed"

                                    ? "status-active"

                                    : booking.bookingStatus ===
                                      "Cancelled"

                                        ? "status-inactive"

                                        : "status-pending"
                            }
                        >
                            {
                                booking.bookingStatus
                            }
                        </span>


                        <span
                            className={
                                booking.paymentStatus ===
                                "Paid"

                                    ? "status-active"

                                    : booking.paymentStatus ===
                                      "Refunded"

                                        ? "status-inactive"

                                        : "status-pending"
                            }
                        >
                            {
                                booking.paymentStatus
                            }
                        </span>

                    </div>


                    {/* INFORMATION */}

                    <div className="booking-details-grid">


                        <div className="booking-info-box">

                            <small>
                                Customer
                            </small>

                            <strong>
                                {customer
                                    ? customer.name
                                    : "Unknown Customer"}
                            </strong>

                        </div>


                        <div className="booking-info-box">

                            <small>
                                Trip
                            </small>

                            <strong>
                                {trip
                                    ? trip.name
                                    : "Unknown Trip"}
                            </strong>

                        </div>


                        <div className="booking-info-box">

                            <small>
                                Booking Date
                            </small>

                            <strong>
                                {
                                    booking.bookingDate
                                }
                            </strong>

                        </div>


                        <div className="booking-info-box">

                            <small>
                                Travelers
                            </small>

                            <strong>
                                {
                                    booking.travelers
                                }
                            </strong>

                        </div>


                        <div className="booking-info-box">

                            <small>
                                Total Amount
                            </small>

                            <strong>
                                ₹
                                {Number(
                                    booking.totalAmount
                                ).toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                        </div>


                        <div className="booking-info-box">

                            <small>
                                Payment Status
                            </small>

                            <strong>
                                {
                                    booking.paymentStatus
                                }
                            </strong>

                        </div>

                    </div>


                    {/* CUSTOMER INFORMATION */}

                    {customer && (

                        <div className="booking-customer-section">

                            <h3>
                                Customer Information
                            </h3>


                            <p>
                                <strong>
                                    Name:
                                </strong>{" "}
                                {
                                    customer.name
                                }
                            </p>


                            <p>
                                <strong>
                                    Email:
                                </strong>{" "}
                                {
                                    customer.email
                                }
                            </p>


                            <p>
                                <strong>
                                    Phone:
                                </strong>{" "}
                                {
                                    customer.phone
                                }
                            </p>


                            <p>
                                <strong>
                                    City:
                                </strong>{" "}
                                {
                                    customer.city
                                }
                            </p>

                        </div>

                    )}


                    {/* ACTIONS */}

                    <div className="form-page-actions">

                        <button
                            className="secondary-btn"
                            onClick={() =>
                                navigate(
                                    "/bookings"
                                )
                            }
                        >
                            Back
                        </button>


                        <button
                            className="primary-btn"
                            onClick={() =>
                                navigate(
                                    `/bookings/${booking.id}/edit`
                                )
                            }
                        >
                            Edit Booking
                        </button>

                    </div>

                </div>

            </div>

        </Layout>

    );

}


export default BookingDetails;