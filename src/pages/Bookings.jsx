import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import Layout from "../components/Layout";
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import StatusBadge from "../components/StatusBadge";
import PaymentBadge from "../components/PaymentBadge";
import { useNavigate } from "react-router-dom";

import {
    getBookings,
    saveBookings,
    getCustomers,
    getTrips
} from "../utils/travelStorage";


// ==========================================
// DEFAULT BOOKINGS
// ==========================================

const defaultBookings = [
    {
        id: 1,
        customerId: 1,
        tripId: 1,
        bookingDate: "2026-10-05",
        travelers: 2,
        totalAmount: 170000,
        bookingStatus: "Confirmed",
        paymentStatus: "Paid"
    },
    {
        id: 2,
        customerId: 2,
        tripId: 2,
        bookingDate: "2026-10-06",
        travelers: 1,
        totalAmount: 65000,
        bookingStatus: "Pending",
        paymentStatus: "Pending"
    },
    {
        id: 3,
        customerId: 3,
        tripId: 3,
        bookingDate: "2026-10-07",
        travelers: 2,
        totalAmount: 250000,
        bookingStatus: "Confirmed",
        paymentStatus: "Paid"
    },
    {
        id: 4,
        customerId: 4,
        tripId: 4,
        bookingDate: "2026-10-08",
        travelers: 1,
        totalAmount: 95000,
        bookingStatus: "Cancelled",
        paymentStatus: "Refunded"
    },
    {
        id: 5,
        customerId: 5,
        tripId: 5,
        bookingDate: "2026-10-09",
        travelers: 3,
        totalAmount: 216000,
        bookingStatus: "Confirmed",
        paymentStatus: "Paid"
    },
    {
        id: 6,
        customerId: 6,
        tripId: 6,
        bookingDate: "2026-10-10",
        travelers: 2,
        totalAmount: 220000,
        bookingStatus: "Pending",
        paymentStatus: "Pending"
    }
];


function Bookings() {

    const navigate = useNavigate();


    // ==========================================
    // STATE
    // ==========================================

    const [bookings, setBookings] =
        useState([]);

    const [customers, setCustomers] =
        useState([]);

    const [trips, setTrips] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [bookingStatusFilter, setBookingStatusFilter] =
        useState("");

    const [paymentStatusFilter, setPaymentStatusFilter] =
        useState("");

    const [currentPage, setCurrentPage] =
        useState(1);

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [selectedBooking, setSelectedBooking] =
        useState(null);

    const [toast, setToast] =
        useState(null);


    const itemsPerPage = 5;


    // ==========================================
    // LOAD DATA
    // ==========================================

    useEffect(() => {

        const savedBookings =
            getBookings();

        const savedCustomers =
            getCustomers();

        const savedTrips =
            getTrips();


        if (savedBookings.length === 0) {

            saveBookings(
                defaultBookings
            );

            setBookings(
                defaultBookings
            );

        } else {

            setBookings(
                savedBookings
            );

        }


        setCustomers(
            savedCustomers
        );

        setTrips(
            savedTrips
        );

    }, []);


    // ==========================================
    // UPDATE LISTENERS
    // ==========================================

    useEffect(() => {

        const updateBookings = () => {

            setBookings(
                getBookings()
            );

        };


        const updateCustomers = () => {

            setCustomers(
                getCustomers()
            );

        };


        const updateTrips = () => {

            setTrips(
                getTrips()
            );

        };


        window.addEventListener(
            "bookingsUpdated",
            updateBookings
        );

        window.addEventListener(
            "customersUpdated",
            updateCustomers
        );

        window.addEventListener(
            "tripsUpdated",
            updateTrips
        );


        return () => {

            window.removeEventListener(
                "bookingsUpdated",
                updateBookings
            );

            window.removeEventListener(
                "customersUpdated",
                updateCustomers
            );

            window.removeEventListener(
                "tripsUpdated",
                updateTrips
            );

        };

    }, []);


    // ==========================================
    // TOAST
    // ==========================================

    const showToast = (
        message,
        type = "success"
    ) => {

        setToast({
            message,
            type
        });


        setTimeout(() => {

            setToast(null);

        }, 3000);

    };


    // ==========================================
    // CUSTOMER NAME
    // ==========================================

    const getCustomerName = (
        customerId
    ) => {

        const customer =
            customers.find(
                (item) =>
                    String(item.id) ===
                    String(customerId)
            );


        return customer
            ? customer.name
            : "Unknown Customer";

    };


    // ==========================================
    // TRIP NAME
    // ==========================================

    const getTripName = (
        tripId
    ) => {

        const trip =
            trips.find(
                (item) =>
                    String(item.id) ===
                    String(tripId)
            );


        return trip
            ? trip.name
            : "Unknown Trip";

    };


    // ==========================================
    // FILTER
    // ==========================================

    const filteredBookings =
        useMemo(() => {

            let result =
                [...bookings];


            // Search

            if (search.trim()) {

                const value =
                    search
                        .toLowerCase()
                        .trim();


                result =
                    result.filter(
                        (booking) => {

                            const customerName =
                                getCustomerName(
                                    booking.customerId
                                ).toLowerCase();


                            const tripName =
                                getTripName(
                                    booking.tripId
                                ).toLowerCase();


                            return (
                                customerName.includes(
                                    value
                                ) ||

                                tripName.includes(
                                    value
                                ) ||

                                String(
                                    booking.id
                                ).includes(
                                    value
                                )
                            );

                        }
                    );

            }


            // Booking Status

            if (bookingStatusFilter) {

                result =
                    result.filter(
                        (booking) =>
                            booking.bookingStatus ===
                            bookingStatusFilter
                    );

            }


            // Payment Status

            if (paymentStatusFilter) {

                result =
                    result.filter(
                        (booking) =>
                            booking.paymentStatus ===
                            paymentStatusFilter
                    );

            }


            return result;

        }, [
            bookings,
            customers,
            trips,
            search,
            bookingStatusFilter,
            paymentStatusFilter
        ]);


    // ==========================================
    // PAGINATION
    // ==========================================

    const totalPages =
        Math.ceil(
            filteredBookings.length /
            itemsPerPage
        );


    const startIndex =
        (currentPage - 1) *
        itemsPerPage;


    const currentBookings =
        filteredBookings.slice(
            startIndex,
            startIndex + itemsPerPage
        );


    // ==========================================
    // VIEW
    // ==========================================

    const handleView = (
        booking
    ) => {

        navigate(
            `/bookings/${booking.id}`
        );

    };


    // ==========================================
    // EDIT
    // ==========================================

    const handleEdit = (
        booking
    ) => {

        navigate(
            `/bookings/${booking.id}/edit`
        );

    };


    // ==========================================
    // DELETE
    // ==========================================

    const handleDelete = () => {

        if (!selectedBooking) {
            return;
        }


        const updatedBookings =
            bookings.filter(
                (booking) =>
                    booking.id !==
                    selectedBooking.id
            );


        setBookings(
            updatedBookings
        );


        saveBookings(
            updatedBookings
        );


        setShowDeleteModal(
            false
        );

        setSelectedBooking(
            null
        );


        showToast(
            "Booking deleted successfully"
        );

    };


    // ==========================================
    // CLOSE DELETE MODAL
    // ==========================================

    const closeDeleteModal = () => {

        setShowDeleteModal(
            false
        );

        setSelectedBooking(
            null
        );

    };


    // ==========================================
    // JSX
    // ==========================================

    return (

        <Layout>

            <div className="page-container">


                {/* =====================================
                    HEADER
                ====================================== */}

                <div className="page-header">

                    <div>

                        <h1>
                            Bookings
                        </h1>

                        <p>
                            Manage travel bookings
                        </p>

                    </div>


                    <button
                        className="primary-btn"
                        onClick={() =>
                            navigate(
                                "/bookings/new"
                            )
                        }
                    >
                        + New Booking
                    </button>

                </div>


                {/* =====================================
                    FILTERS
                ====================================== */}

                <div className="filter-bar">

                    <input
                        type="text"
                        placeholder="Search customer or trip..."
                        value={search}
                        onChange={(e) => {

                            setSearch(
                                e.target.value
                            );

                            setCurrentPage(1);

                        }}
                    />


                    <select
                        value={
                            bookingStatusFilter
                        }
                        onChange={(e) => {

                            setBookingStatusFilter(
                                e.target.value
                            );

                            setCurrentPage(1);

                        }}
                    >

                        <option value="">
                            All Booking Status
                        </option>

                        <option value="Confirmed">
                            Confirmed
                        </option>

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Cancelled">
                            Cancelled
                        </option>

                    </select>


                    <select
                        value={
                            paymentStatusFilter
                        }
                        onChange={(e) => {

                            setPaymentStatusFilter(
                                e.target.value
                            );

                            setCurrentPage(1);

                        }}
                    >

                        <option value="">
                            All Payment Status
                        </option>

                        <option value="Paid">
                            Paid
                        </option>

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Refunded">
                            Refunded
                        </option>

                    </select>

                </div>


                {/* =====================================
                    TABLE
                ====================================== */}

                <div className="table-container">

                    <table>

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
                                    Travelers
                                </th>

                                <th>
                                    Amount
                                </th>

                                <th>
                                    Booking Status
                                </th>

                                <th>
                                    Payment
                                </th>

                                <th>
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {currentBookings.length ===
                            0 ? (

                                <tr>

                                    <td
                                        colSpan="9"
                                        className="empty-state"
                                    >
                                        No bookings found
                                    </td>

                                </tr>

                            ) : (

                                currentBookings.map(
                                    (booking) => (

                                        <tr
                                            key={
                                                booking.id
                                            }
                                        >

                                            {/* ID */}

                                            <td>

                                                #
                                                {
                                                    booking.id
                                                }

                                            </td>


                                            {/* CUSTOMER */}

                                            <td>

                                                <strong>
                                                    {
                                                        getCustomerName(
                                                            booking.customerId
                                                        )
                                                    }
                                                </strong>

                                            </td>


                                            {/* TRIP */}

                                            <td>

                                                {
                                                    getTripName(
                                                        booking.tripId
                                                    )
                                                }

                                            </td>


                                            {/* DATE */}

                                            <td>

                                                {
                                                    booking.bookingDate
                                                }

                                            </td>


                                            {/* TRAVELERS */}

                                            <td>

                                                {
                                                    booking.travelers
                                                }

                                            </td>


                                            {/* AMOUNT */}

                                            <td>

                                                ₹
                                                {Number(
                                                    booking.totalAmount
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}

                                            </td>


                                            {/* BOOKING STATUS */}

                                           <td>
                                              <StatusBadge
                                                 status={booking.bookingStatus}
                                               />
                                           </td>

                                            {/* PAYMENT */}

                                          <td>
                                              <PaymentBadge
                                                      status={booking.paymentStatus}
                                               />
                                           </td>


                                            {/* ACTIONS */}

                                            <td>

                                                <div className="action-buttons">


                                                    <button
                                                        onClick={() =>
                                                            handleView(
                                                                booking
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>


                                                    <button
                                                        onClick={() =>
                                                            handleEdit(
                                                                booking
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        onClick={() => {

                                                            setSelectedBooking(
                                                                booking
                                                            );

                                                            setShowDeleteModal(
                                                                true
                                                            );

                                                        }}
                                                    >
                                                        Delete
                                                    </button>


                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>


                {/* =====================================
                    PAGINATION
                ====================================== */}

                {totalPages > 1 && (

                    <div className="pagination">

                        <button
                            disabled={
                                currentPage === 1
                            }
                            onClick={() =>
                                setCurrentPage(
                                    currentPage - 1
                                )
                            }
                        >
                            Previous
                        </button>


                        <span>

                            Page{" "}

                            {currentPage}

                            {" "}of{" "}

                            {totalPages}

                        </span>


                        <button
                            disabled={
                                currentPage ===
                                totalPages
                            }
                            onClick={() =>
                                setCurrentPage(
                                    currentPage + 1
                                )
                            }
                        >
                            Next
                        </button>

                    </div>

                )}

            </div>


            {/* =====================================
                DELETE MODAL
            ====================================== */}

            {showDeleteModal &&
                selectedBooking && (

                    <Modal
                        title="Delete Booking"
                        onClose={
                            closeDeleteModal
                        }
                    >

                        <p>

                            Are you sure you
                            want to delete
                            booking{" "}

                            <strong>
                                #
                                {
                                    selectedBooking.id
                                }
                            </strong>

                            ?

                        </p>


                        <div className="modal-actions">

                            <button
                                className="secondary-btn"
                                onClick={
                                    closeDeleteModal
                                }
                            >
                                Cancel
                            </button>


                            <button
                                className="delete-btn"
                                onClick={
                                    handleDelete
                                }
                            >
                                Delete
                            </button>

                        </div>

                    </Modal>

                )}


            {/* =====================================
                TOAST
            ====================================== */}

            {toast && (

                <Toast
                    message={
                        toast.message
                    }
                    type={
                        toast.type
                    }
                    onClose={() =>
                        setToast(null)
                    }
                />

            )}

        </Layout>
    );
}


export default Bookings;