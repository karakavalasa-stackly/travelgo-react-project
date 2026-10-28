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
    saveBookings,
    getCustomers,
    getTrips
} from "../utils/travelStorage";


function BookingForm() {

    const navigate =
        useNavigate();

    const { id } =
        useParams();

    const isEdit =
        Boolean(id);


    const [customers, setCustomers] =
        useState([]);

    const [trips, setTrips] =
        useState([]);


    const [formData, setFormData] =
        useState({

            customerId: "",

            tripId: "",

            bookingDate: "",

            travelers: 1,

            totalAmount: "",

            bookingStatus: "Pending",

            paymentStatus: "Pending"

        });


    const [errors, setErrors] =
        useState({});


    // ==========================================
    // LOAD CUSTOMERS + TRIPS
    // ==========================================

    useEffect(() => {

        setCustomers(
            getCustomers()
        );

        setTrips(
            getTrips()
        );

    }, []);


    // ==========================================
    // LOAD BOOKING FOR EDIT
    // ==========================================

    useEffect(() => {

        if (!isEdit) {
            return;
        }


        const bookings =
            getBookings();


        const booking =
            bookings.find(
                (item) =>
                    String(item.id) ===
                    String(id)
            );


        if (!booking) {

            navigate(
                "/bookings"
            );

            return;

        }


        setFormData({

            customerId:
                booking.customerId,

            tripId:
                booking.tripId,

            bookingDate:
                booking.bookingDate,

            travelers:
                booking.travelers,

            totalAmount:
                booking.totalAmount,

            bookingStatus:
                booking.bookingStatus,

            paymentStatus:
                booking.paymentStatus

        });

    }, [
        id,
        isEdit,
        navigate
    ]);


    // ==========================================
    // CHANGE
    // ==========================================

    const handleChange =
        (e) => {

            const {
                name,
                value
            } = e.target;


            setFormData(
                (previous) => {

                    const updated = {

                        ...previous,

                        [name]: value

                    };


                    // Calculate total amount

                    if (
                        name === "tripId" ||
                        name === "travelers"
                    ) {

                        const selectedTripId =
                            name === "tripId"
                                ? value
                                : previous.tripId;


                        const selectedTravelers =
                            name === "travelers"
                                ? Number(value)
                                : Number(
                                    previous.travelers
                                );


                        const selectedTrip =
                            trips.find(
                                (trip) =>
                                    String(
                                        trip.id
                                    ) ===
                                    String(
                                        selectedTripId
                                    )
                            );


                        if (selectedTrip) {

                            updated.totalAmount =
                                Number(
                                    selectedTrip.price
                                ) *
                                selectedTravelers;

                        }

                    }


                    return updated;

                }
            );


            setErrors(
                (previous) => ({
                    ...previous,
                    [name]: ""
                })
            );

        };


    // ==========================================
    // VALIDATION
    // ==========================================

    const validate = () => {

        const newErrors = {};


        if (!formData.customerId) {

            newErrors.customerId =
                "Please select a customer.";

        }


        if (!formData.tripId) {

            newErrors.tripId =
                "Please select a trip.";

        }


        if (!formData.bookingDate) {

            newErrors.bookingDate =
                "Booking date is required.";

        }


        if (
            !formData.travelers ||
            Number(formData.travelers) < 1
        ) {

            newErrors.travelers =
                "Travelers must be at least 1.";

        }


        setErrors(
            newErrors
        );


        return (
            Object.keys(newErrors)
                .length === 0
        );

    };


    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit =
        (e) => {

            e.preventDefault();


            if (!validate()) {
                return;
            }


            const bookings =
                getBookings();


            if (isEdit) {

                const updatedBookings =
                    bookings.map(
                        (booking) =>

                            String(
                                booking.id
                            ) ===
                            String(id)

                                ? {

                                    ...booking,

                                    customerId:
                                        Number(
                                            formData.customerId
                                        ),

                                    tripId:
                                        Number(
                                            formData.tripId
                                        ),

                                    bookingDate:
                                        formData.bookingDate,

                                    travelers:
                                        Number(
                                            formData.travelers
                                        ),

                                    totalAmount:
                                        Number(
                                            formData.totalAmount
                                        ),

                                    bookingStatus:
                                        formData.bookingStatus,

                                    paymentStatus:
                                        formData.paymentStatus

                                }

                                : booking
                    );


                saveBookings(
                    updatedBookings
                );

            } else {

                const newBooking = {

                    id: Date.now(),

                    customerId:
                        Number(
                            formData.customerId
                        ),

                    tripId:
                        Number(
                            formData.tripId
                        ),

                    bookingDate:
                        formData.bookingDate,

                    travelers:
                        Number(
                            formData.travelers
                        ),

                    totalAmount:
                        Number(
                            formData.totalAmount
                        ),

                    bookingStatus:
                        formData.bookingStatus,

                    paymentStatus:
                        formData.paymentStatus

                };


                saveBookings([
                    ...bookings,
                    newBooking
                ]);

            }


            navigate(
                "/bookings"
            );

        };


    // ==========================================
    // JSX
    // ==========================================

    return (

        <Layout>

            <div className="booking-form-page">


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
                            {isEdit
                                ? "Edit Booking"
                                : "Add Booking"}
                        </h1>


                        <p>
                            {isEdit
                                ? "Update booking information"
                                : "Create a new travel booking"}
                        </p>

                    </div>

                </div>


                <div className="booking-form-card">

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >


                        {/* CUSTOMER */}

                        <div className="form-group">

                            <label>
                                Customer
                            </label>

                            <select
                                name="customerId"
                                value={
                                    formData.customerId
                                }
                                onChange={
                                    handleChange
                                }
                            >

                                <option value="">
                                    Select Customer
                                </option>


                                {customers.map(
                                    (customer) => (

                                        <option
                                            key={
                                                customer.id
                                            }
                                            value={
                                                customer.id
                                            }
                                        >
                                            {
                                                customer.name
                                            }
                                        </option>

                                    )
                                )}

                            </select>


                            {errors.customerId && (

                                <span className="form-error">
                                    {
                                        errors.customerId
                                    }
                                </span>

                            )}

                        </div>


                        {/* TRIP */}

                        <div className="form-group">

                            <label>
                                Trip
                            </label>

                            <select
                                name="tripId"
                                value={
                                    formData.tripId
                                }
                                onChange={
                                    handleChange
                                }
                            >

                                <option value="">
                                    Select Trip
                                </option>


                                {trips.map(
                                    (trip) => (

                                        <option
                                            key={
                                                trip.id
                                            }
                                            value={
                                                trip.id
                                            }
                                        >
                                            {
                                                trip.name
                                            }
                                        </option>

                                    )
                                )}

                            </select>


                            {errors.tripId && (

                                <span className="form-error">
                                    {
                                        errors.tripId
                                    }
                                </span>

                            )}

                        </div>


                        {/* BOOKING DATE */}

                        <div className="form-group">

                            <label>
                                Booking Date
                            </label>

                            <input
                                type="date"
                                name="bookingDate"
                                value={
                                    formData.bookingDate
                                }
                                onChange={
                                    handleChange
                                }
                            />


                            {errors.bookingDate && (

                                <span className="form-error">
                                    {
                                        errors.bookingDate
                                    }
                                </span>

                            )}

                        </div>


                        {/* TRAVELERS */}

                        <div className="form-group">

                            <label>
                                Number of Travelers
                            </label>

                            <input
                                type="number"
                                name="travelers"
                                min="1"
                                value={
                                    formData.travelers
                                }
                                onChange={
                                    handleChange
                                }
                            />


                            {errors.travelers && (

                                <span className="form-error">
                                    {
                                        errors.travelers
                                    }
                                </span>

                            )}

                        </div>


                        {/* TOTAL AMOUNT */}

                        <div className="form-group">

                            <label>
                                Total Amount
                            </label>

                            <input
                                type="number"
                                name="totalAmount"
                                value={
                                    formData.totalAmount
                                }
                                readOnly
                            />

                        </div>


                        {/* STATUS ROW */}

                        <div className="form-row">


                            {/* BOOKING STATUS */}

                            <div className="form-group">

                                <label>
                                    Booking Status
                                </label>

                                <select
                                    name="bookingStatus"
                                    value={
                                        formData.bookingStatus
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="Confirmed">
                                        Confirmed
                                    </option>

                                    <option value="Cancelled">
                                        Cancelled
                                    </option>

                                </select>

                            </div>


                            {/* PAYMENT STATUS */}

                            <div className="form-group">

                                <label>
                                    Payment Status
                                </label>

                                <select
                                    name="paymentStatus"
                                    value={
                                        formData.paymentStatus
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="Paid">
                                        Paid
                                    </option>

                                    <option value="Refunded">
                                        Refunded
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* ACTIONS */}

                        <div className="form-page-actions">

                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={() =>
                                    navigate(
                                        "/bookings"
                                    )
                                }
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="primary-btn"
                            >
                                {isEdit
                                    ? "Update Booking"
                                    : "Add Booking"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </Layout>

    );

}


export default BookingForm;