import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import Toast from "../components/Toast";

import {
    getTrips,
    saveTrips,
    getDestinations
} from "../utils/travelStorage";


// ==========================================
// DEFAULT TRIPS
// ==========================================

const defaultTrips = [
    {
        id: 1,
        name: "Paris Explorer",
        destination: "Paris",
        country: "France",
        startDate: "2026-10-12",
        endDate: "2026-10-15",
        duration: "4 Days",
        price: 85000,
        status: "Active",
        description:
            "Explore the beautiful city of Paris."
    },

    {
        id: 2,
        name: "Bali Adventure",
        destination: "Bali",
        country: "Indonesia",
        startDate: "2026-10-18",
        endDate: "2026-10-23",
        duration: "6 Days",
        price: 65000,
        status: "Active",
        description:
            "Enjoy beaches and adventure in Bali."
    },

    {
        id: 3,
        name: "Swiss Escape",
        destination: "Switzerland",
        country: "Switzerland",
        startDate: "2026-10-25",
        endDate: "2026-10-31",
        duration: "7 Days",
        price: 125000,
        status: "Active",
        description:
            "Experience the beauty of Switzerland."
    },

    {
        id: 4,
        name: "Maldives Holiday",
        destination: "Maldives",
        country: "Maldives",
        startDate: "2026-11-05",
        endDate: "2026-11-09",
        duration: "5 Days",
        price: 95000,
        status: "Active",
        description:
            "Relax at the beautiful Maldives beaches."
    },

    {
        id: 5,
        name: "Dubai Experience",
        destination: "Dubai",
        country: "UAE",
        startDate: "2026-11-12",
        endDate: "2026-11-16",
        duration: "5 Days",
        price: 72000,
        status: "Active",
        description:
            "Discover modern Dubai and its attractions."
    },

    {
        id: 6,
        name: "London Discovery",
        destination: "London",
        country: "United Kingdom",
        startDate: "2026-11-20",
        endDate: "2026-11-25",
        duration: "6 Days",
        price: 110000,
        status: "Upcoming",
        description:
            "Explore famous places in London."
    }
];


// ==========================================
// TRIPS COMPONENT
// ==========================================

function Trips() {

    const navigate = useNavigate();

    const [trips, setTrips] = useState([]);

    const [destinations, setDestinations] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [destinationFilter, setDestinationFilter] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("");

    const [dateFilter, setDateFilter] =
        useState("");

    const [priceFilter, setPriceFilter] =
        useState("");

    const [sortBy, setSortBy] =
        useState("");

    const [currentPage, setCurrentPage] =
        useState(1);

    const [toast, setToast] =
        useState(null);

    const tripsPerPage = 4;


    // ==========================================
    // LOAD TRIPS
    // ==========================================

    useEffect(() => {

        let savedTrips = getTrips();

        if (savedTrips.length === 0) {

            saveTrips(defaultTrips);

            savedTrips = defaultTrips;
        }

        setTrips(savedTrips);

        setDestinations(
            getDestinations()
        );

    }, []);


    // ==========================================
    // LISTEN FOR TRIP UPDATES
    // ==========================================

    useEffect(() => {

        const updateTrips = () => {

            setTrips(
                getTrips()
            );

        };


        const updateDestinations = () => {

            setDestinations(
                getDestinations()
            );

        };


        window.addEventListener(
            "tripsUpdated",
            updateTrips
        );

        window.addEventListener(
            "destinationsUpdated",
            updateDestinations
        );


        return () => {

            window.removeEventListener(
                "tripsUpdated",
                updateTrips
            );

            window.removeEventListener(
                "destinationsUpdated",
                updateDestinations
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
    // FILTER + SORT
    // ==========================================

    const filteredTrips = useMemo(() => {

        let result = [...trips];


        // SEARCH

        if (search.trim()) {

            const searchText =
                search.toLowerCase().trim();

            result = result.filter(
                (trip) =>
                    trip.name
                        .toLowerCase()
                        .includes(searchText) ||

                    trip.destination
                        .toLowerCase()
                        .includes(searchText) ||

                    trip.country
                        .toLowerCase()
                        .includes(searchText)
            );
        }


        // DESTINATION FILTER

        if (destinationFilter) {

            result = result.filter(
                (trip) =>
                    trip.destination ===
                    destinationFilter
            );

        }


        // STATUS FILTER

        if (statusFilter) {

            result = result.filter(
                (trip) =>
                    trip.status ===
                    statusFilter
            );

        }


        // DATE FILTER

        if (dateFilter) {

            result = result.filter(
                (trip) =>
                    trip.startDate ===
                    dateFilter
            );

        }


        // PRICE FILTER

        if (priceFilter === "low") {

            result = result.filter(
                (trip) =>
                    Number(trip.price) < 75000
            );

        }


        if (priceFilter === "medium") {

            result = result.filter(
                (trip) =>
                    Number(trip.price) >= 75000 &&
                    Number(trip.price) <= 100000
            );

        }


        if (priceFilter === "high") {

            result = result.filter(
                (trip) =>
                    Number(trip.price) > 100000
            );

        }


        // SORTING

        if (sortBy === "priceLow") {

            result.sort(
                (a, b) =>
                    Number(a.price) -
                    Number(b.price)
            );

        }


        if (sortBy === "priceHigh") {

            result.sort(
                (a, b) =>
                    Number(b.price) -
                    Number(a.price)
            );

        }


        if (sortBy === "date") {

            result.sort(
                (a, b) =>
                    new Date(a.startDate) -
                    new Date(b.startDate)
            );

        }


        if (sortBy === "name") {

            result.sort(
                (a, b) =>
                    a.name.localeCompare(
                        b.name
                    )
            );

        }


        return result;

    }, [
        trips,
        search,
        destinationFilter,
        statusFilter,
        dateFilter,
        priceFilter,
        sortBy
    ]);


    // ==========================================
    // PAGINATION
    // ==========================================

    const totalPages =
        Math.ceil(
            filteredTrips.length /
            tripsPerPage
        );


    const startIndex =
        (currentPage - 1) *
        tripsPerPage;


    const currentTrips =
        filteredTrips.slice(
            startIndex,
            startIndex + tripsPerPage
        );


    // ==========================================
    // RESET PAGE
    // ==========================================

    useEffect(() => {

        setCurrentPage(1);

    }, [
        search,
        destinationFilter,
        statusFilter,
        dateFilter,
        priceFilter,
        sortBy
    ]);


    // ==========================================
    // KEEP PAGE VALID
    // ==========================================

    useEffect(() => {

        if (
            totalPages > 0 &&
            currentPage > totalPages
        ) {

            setCurrentPage(totalPages);

        }

    }, [
        currentPage,
        totalPages
    ]);


    // ==========================================
    // CREATE TRIP
    // ==========================================

    const handleCreate = () => {

        navigate("/trips/new");

    };


    // ==========================================
    // VIEW TRIP
    // ==========================================

    const handleView = (trip) => {

        navigate(
            `/trips/${trip.id}`
        );

    };


    // ==========================================
    // EDIT TRIP
    // ==========================================

    const handleEdit = (trip) => {

        navigate(
            `/trips/${trip.id}/edit`
        );

    };


    // ==========================================
    // DIRECT DELETE
    // ==========================================

    const handleDelete = (trip) => {

        const updatedTrips =
            trips.filter(
                (item) =>
                    item.id !== trip.id
            );


        setTrips(
            updatedTrips
        );


        saveTrips(
            updatedTrips
        );


        showToast(
            `${trip.name} deleted successfully`
        );

    };


    // ==========================================
    // RETURN JSX
    // ==========================================

    return (

        <Layout>

            <div className="trips-page">


                {/* ==================================
                    PAGE HEADER
                ================================== */}

                <div className="page-header">

                    <div>

                        <h1>
                            Trips
                        </h1>

                        <p>
                            Manage your travel
                            trips and packages.
                        </p>

                    </div>


                    <button
                        className="primary-btn"
                        onClick={handleCreate}
                    >
                        + Create Trip
                    </button>

                </div>


                {/* ==================================
                    FILTERS
                ================================== */}

                <div className="trip-toolbar">


                    {/* SEARCH */}

                    <input
                        type="text"
                        placeholder="Search trips..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />


                    {/* DESTINATION */}

                    <select
                        value={
                            destinationFilter
                        }
                        onChange={(e) =>
                            setDestinationFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            All Destinations
                        </option>

                        {destinations.map(
                            (destination) => (

                                <option
                                    key={
                                        destination.id
                                    }
                                    value={
                                        destination.name
                                    }
                                >
                                    {
                                        destination.name
                                    }
                                </option>

                            )
                        )}

                    </select>


                    {/* STATUS */}

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            All Status
                        </option>

                        <option value="Active">
                            Active
                        </option>

                        <option value="Upcoming">
                            Upcoming
                        </option>

                    </select>


                    {/* DATE */}

                    <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) =>
                            setDateFilter(
                                e.target.value
                            )
                        }
                    />


                    {/* PRICE */}

                    <select
                        value={priceFilter}
                        onChange={(e) =>
                            setPriceFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            All Prices
                        </option>

                        <option value="low">
                            Below ₹75,000
                        </option>

                        <option value="medium">
                            ₹75,000 - ₹1,00,000
                        </option>

                        <option value="high">
                            Above ₹1,00,000
                        </option>

                    </select>


                    {/* SORT */}

                    <select
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            Sort By
                        </option>

                        <option value="priceLow">
                            Price: Low to High
                        </option>

                        <option value="priceHigh">
                            Price: High to Low
                        </option>

                        <option value="date">
                            Start Date
                        </option>

                        <option value="name">
                            Name
                        </option>

                    </select>

                </div>


                {/* ==================================
                    TRIP GRID
                ================================== */}

                {currentTrips.length > 0 ? (

                    <div className="trip-card-grid">

                        {currentTrips.map(
                            (trip) => (

                                <div
                                    className="trip-card"
                                    key={trip.id}
                                >


                                    {/* IMAGE */}

                                    <div className="trip-card-image">

                                        <span>
                                            🧳
                                        </span>

                                        <span className="trip-status">
                                            {
                                                trip.status
                                            }
                                        </span>

                                    </div>


                                    {/* CONTENT */}

                                    <div className="trip-card-content">

                                        <h2>
                                            {
                                                trip.name
                                            }
                                        </h2>


                                        <p className="trip-location">
                                            🌍{" "}
                                            {
                                                trip.destination
                                            }
                                            ,{" "}
                                            {
                                                trip.country
                                            }
                                        </p>


                                        <p>
                                            {
                                                trip.description
                                            }
                                        </p>


                                        {/* DETAILS */}

                                        <div className="trip-details">

                                            <span>
                                                📅{" "}
                                                {
                                                    trip.startDate
                                                }
                                            </span>

                                            <span>
                                                ⏱️{" "}
                                                {
                                                    trip.duration
                                                }
                                            </span>

                                            <strong>
                                                ₹
                                                {Number(
                                                    trip.price
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </strong>

                                        </div>


                                        {/* ACTIONS */}

                                        <div className="trip-actions">


                                            {/* VIEW */}

                                            <button
                                                className="view-btn"
                                                onClick={() =>
                                                    handleView(
                                                        trip
                                                    )
                                                }
                                            >
                                                View
                                            </button>


                                            {/* EDIT */}

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    handleEdit(
                                                        trip
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>


                                            {/* DELETE */}

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(
                                                        trip
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                ) : (

                    /* EMPTY */

                    <div className="trip-empty">

                        <div>
                            🧳
                        </div>

                        <h2>
                            No trips found
                        </h2>

                        <p>
                            Try changing your
                            search or filters.
                        </p>

                    </div>

                )}


                {/* ==================================
                    PAGINATION
                ================================== */}

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


                        {Array.from(
                            {
                                length: totalPages
                            },
                            (_, index) => (

                                <button
                                    key={index + 1}
                                    className={
                                        currentPage ===
                                        index + 1
                                            ? "active-page"
                                            : ""
                                    }
                                    onClick={() =>
                                        setCurrentPage(
                                            index + 1
                                        )
                                    }
                                >
                                    {
                                        index + 1
                                    }
                                </button>

                            )
                        )}


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


                {/* ==================================
                    TOAST
                ================================== */}

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

            </div>

        </Layout>
    );
}


export default Trips;