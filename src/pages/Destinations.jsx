import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import Toast from "../components/Toast";

import {
    getDestinations,
    saveDestinations
} from "../utils/travelStorage";


// ==========================================
// DEFAULT DESTINATIONS
// ==========================================

const defaultDestinations = [
    {
        id: 1,
        name: "Paris",
        country: "France",
        description:
            "Experience the beauty, culture and romance of Paris.",
        image: "🗼",
        trips: 12,
        status: "Active"
    },

    {
        id: 2,
        name: "Bali",
        country: "Indonesia",
        description:
            "Beautiful beaches, temples and tropical experiences.",
        image: "🏝️",
        trips: 18,
        status: "Active"
    },

    {
        id: 3,
        name: "Switzerland",
        country: "Switzerland",
        description:
            "Explore the Swiss Alps, lakes and beautiful cities.",
        image: "🏔️",
        trips: 9,
        status: "Active"
    },

    {
        id: 4,
        name: "Maldives",
        country: "Maldives",
        description:
            "Relax in luxury resorts surrounded by blue waters.",
        image: "🏖️",
        trips: 15,
        status: "Active"
    },

    {
        id: 5,
        name: "Dubai",
        country: "UAE",
        description:
            "Discover modern architecture, shopping and desert adventures.",
        image: "🏙️",
        trips: 14,
        status: "Active"
    },

    {
        id: 6,
        name: "London",
        country: "United Kingdom",
        description:
            "Explore historic landmarks and modern city life.",
        image: "🎡",
        trips: 8,
        status: "Active"
    }
];


// ==========================================
// DESTINATIONS COMPONENT
// ==========================================

function Destinations() {

    const navigate = useNavigate();

    const [destinations, setDestinations] = useState([]);

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [toast, setToast] = useState(null);

    const itemsPerPage = 4;


    // ==========================================
    // LOAD DESTINATIONS
    // ==========================================

    const loadDestinations = () => {

        const saved = getDestinations();

        if (saved.length > 0) {

            setDestinations(saved);

        } else {

            saveDestinations(defaultDestinations);

            setDestinations(defaultDestinations);
        }
    };


    useEffect(() => {

        loadDestinations();

    }, []);


    // ==========================================
    // LISTEN FOR DESTINATION UPDATES
    // ==========================================

    useEffect(() => {

        const handleUpdate = () => {

            setDestinations(getDestinations());

        };


        window.addEventListener(
            "destinationsUpdated",
            handleUpdate
        );


        return () => {

            window.removeEventListener(
                "destinationsUpdated",
                handleUpdate
            );

        };

    }, []);


    // ==========================================
    // SEARCH
    // ==========================================

    const filteredDestinations = useMemo(() => {

        if (!search.trim()) {

            return destinations;
        }


        const searchText = search
            .toLowerCase()
            .trim();


        return destinations.filter(
            (destination) =>
                destination.name
                    .toLowerCase()
                    .includes(searchText) ||

                destination.country
                    .toLowerCase()
                    .includes(searchText)
        );

    }, [
        destinations,
        search
    ]);


    // ==========================================
    // PAGINATION
    // ==========================================

    const totalPages = Math.ceil(
        filteredDestinations.length /
        itemsPerPage
    );


    const startIndex =
        (currentPage - 1) *
        itemsPerPage;


    const currentDestinations =
        filteredDestinations.slice(
            startIndex,
            startIndex + itemsPerPage
        );


    // ==========================================
    // RESET PAGE WHEN SEARCH CHANGES
    // ==========================================

    useEffect(() => {

        setCurrentPage(1);

    }, [search]);


    // ==========================================
    // KEEP PAGE VALID AFTER DELETE
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
    // DIRECT DELETE
    // ==========================================

    const handleDelete = (destination) => {

        const updatedDestinations =
            destinations.filter(
                (item) =>
                    item.id !== destination.id
            );


        setDestinations(
            updatedDestinations
        );


        saveDestinations(
            updatedDestinations
        );


        setToast({
            message: `${destination.name} deleted successfully`,
            type: "success"
        });
    };


    // ==========================================
    // VIEW DESTINATION
    // ==========================================

    const handleView = (destination) => {

        navigate(
            `/destinations/${destination.id}`
        );
    };


    // ==========================================
    // EDIT DESTINATION
    // ==========================================

    const handleEdit = (destination) => {

        navigate(
            `/destinations/${destination.id}/edit`
        );
    };


    // ==========================================
    // ADD DESTINATION
    // ==========================================

    const handleAdd = () => {

        navigate("/destinations/new");
    };


    // ==========================================
    // RETURN JSX
    // ==========================================

    return (

        <Layout>

            <div className="destination-page">


                {/* ==================================
                    HEADER
                =================================== */}

                <div className="page-header">

                    <div>

                        <h1>
                            Destinations
                        </h1>

                        <p>
                            Manage your travel
                            destinations.
                        </p>

                    </div>


                    <button
                        className="primary-btn"
                        onClick={handleAdd}
                    >
                        + Add Destination
                    </button>

                </div>


                {/* ==================================
                    SEARCH
                =================================== */}

                <div className="destination-toolbar">

                    <input
                        type="text"
                        placeholder="Search destinations or countries..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>


                {/* ==================================
                    DESTINATION GRID
                =================================== */}

                <div className="destination-grid">

                    {currentDestinations.length > 0 ? (

                        currentDestinations.map(
                            (destination) => (

                                <div
                                    className="destination-card"
                                    key={destination.id}
                                >


                                    {/* DESTINATION IMAGE */}

                                    <div className="destination-card-image">

                                        <span>
                                            {
                                                destination.image
                                            }
                                        </span>

                                    </div>


                                    {/* CARD CONTENT */}

                                    <div className="destination-card-content">


                                        {/* TITLE */}

                                        <div className="destination-title-row">

                                            <div>

                                                <h2>
                                                    {
                                                        destination.name
                                                    }
                                                </h2>

                                                <p>
                                                    {
                                                        destination.country
                                                    }
                                                </p>

                                            </div>


                                            <span className="active-badge">

                                                {
                                                    destination.status
                                                }

                                            </span>

                                        </div>


                                        {/* DESCRIPTION */}

                                        <p className="destination-description">

                                            {
                                                destination.description
                                            }

                                        </p>


                                        {/* TRIPS */}

                                        <div className="destination-meta">

                                            <span>

                                                🧳{" "}

                                                {
                                                    destination.trips
                                                }{" "}

                                                trips

                                            </span>

                                        </div>


                                        {/* ACTIONS */}

                                        <div className="destination-actions">


                                            {/* VIEW */}

                                            <button
                                                onClick={() =>
                                                    handleView(
                                                        destination
                                                    )
                                                }
                                            >
                                                View
                                            </button>


                                            {/* EDIT */}

                                            <button
                                                onClick={() =>
                                                    handleEdit(
                                                        destination
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
                                                        destination
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            )
                        )

                    ) : (

                        /* EMPTY STATE */

                        <div className="destination-empty">

                            <div>
                                🌍
                            </div>

                            <h2>
                                No destinations found
                            </h2>

                            <p>
                                Try changing
                                your search.
                            </p>

                        </div>

                    )}

                </div>


                {/* ==================================
                    PAGINATION
                =================================== */}

                {totalPages > 1 && (

                    <div className="pagination">


                        {/* PREVIOUS */}

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


                        {/* PAGE NUMBERS */}

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


                        {/* NEXT */}

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
                =================================== */}

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


export default Destinations;