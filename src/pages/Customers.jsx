import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import Toast from "../components/Toast";

import {
    getCustomers,
    saveCustomers
} from "../utils/travelStorage";


const defaultCustomers = [
    {
        id: 1,
        name: "Ananya Sharma",
        email: "ananya@gmail.com",
        phone: "9876543210",
        city: "Hyderabad",
        country: "India",
        status: "Active"
    },
    {
        id: 2,
        name: "Rahul Kumar",
        email: "rahul@gmail.com",
        phone: "9876543211",
        city: "Bangalore",
        country: "India",
        status: "Active"
    },
    {
        id: 3,
        name: "Priya Reddy",
        email: "priya@gmail.com",
        phone: "9876543212",
        city: "Vizag",
        country: "India",
        status: "Active"
    },
    {
        id: 4,
        name: "Arjun Mehta",
        email: "arjun@gmail.com",
        phone: "9876543213",
        city: "Mumbai",
        country: "India",
        status: "Active"
    },
    {
        id: 5,
        name: "Sneha Patel",
        email: "sneha@gmail.com",
        phone: "9876543214",
        city: "Chennai",
        country: "India",
        status: "Inactive"
    },
    {
        id: 6,
        name: "Vikram Singh",
        email: "vikram@gmail.com",
        phone: "9876543215",
        city: "Delhi",
        country: "India",
        status: "Active"
    }
];


function Customers() {

    const navigate = useNavigate();

    const [customers, setCustomers] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("");

    const [sortBy, setSortBy] =
        useState("");

    const [currentPage, setCurrentPage] =
        useState(1);

    const [toast, setToast] =
        useState(null);

    const customersPerPage = 4;


    // ==========================================
    // LOAD CUSTOMERS
    // ==========================================

    useEffect(() => {

        const saved =
            getCustomers();

        if (saved.length > 0) {

            setCustomers(saved);

        } else {

            saveCustomers(
                defaultCustomers
            );

            setCustomers(
                defaultCustomers
            );
        }

    }, []);


    // ==========================================
    // LISTEN FOR UPDATES
    // ==========================================

    useEffect(() => {

        const handleUpdate = () => {

            setCustomers(
                getCustomers()
            );

        };

        window.addEventListener(
            "customersUpdated",
            handleUpdate
        );

        return () => {

            window.removeEventListener(
                "customersUpdated",
                handleUpdate
            );

        };

    }, []);


    // ==========================================
    // FILTER + SEARCH + SORT
    // ==========================================

    const filteredCustomers =
        useMemo(() => {

            let result =
                [...customers];


            if (search.trim()) {

                const text =
                    search
                        .toLowerCase()
                        .trim();

                result =
                    result.filter(
                        (customer) =>
                            customer.name
                                .toLowerCase()
                                .includes(text) ||

                            customer.email
                                .toLowerCase()
                                .includes(text) ||

                            customer.phone
                                .includes(text) ||

                            customer.city
                                .toLowerCase()
                                .includes(text)
                    );

            }


            if (statusFilter) {

                result =
                    result.filter(
                        (customer) =>
                            customer.status ===
                            statusFilter
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


            if (sortBy === "newest") {

                result.sort(
                    (a, b) =>
                        Number(b.id) -
                        Number(a.id)
                );

            }


            if (sortBy === "oldest") {

                result.sort(
                    (a, b) =>
                        Number(a.id) -
                        Number(b.id)
                );

            }


            return result;

        }, [
            customers,
            search,
            statusFilter,
            sortBy
        ]);


    // ==========================================
    // PAGINATION
    // ==========================================

    const totalPages =
        Math.ceil(
            filteredCustomers.length /
            customersPerPage
        );


    const startIndex =
        (currentPage - 1) *
        customersPerPage;


    const currentCustomers =
        filteredCustomers.slice(
            startIndex,
            startIndex +
                customersPerPage
        );


    useEffect(() => {

        setCurrentPage(1);

    }, [
        search,
        statusFilter,
        sortBy
    ]);


    // ==========================================
    // DELETE
    // ==========================================

    const handleDelete =
        (customer) => {

            const updated =
                customers.filter(
                    (item) =>
                        item.id !==
                        customer.id
                );


            setCustomers(updated);

            saveCustomers(updated);


            setToast({
                message:
                    `${customer.name} deleted successfully`,
                type: "success"
            });

        };


    // ==========================================
    // ADD
    // ==========================================

    const handleAdd = () => {

        navigate(
            "/customers/new"
        );

    };


    // ==========================================
    // VIEW
    // ==========================================

    const handleView =
        (customer) => {

            navigate(
                `/customers/${customer.id}`
            );

        };


    // ==========================================
    // EDIT
    // ==========================================

    const handleEdit =
        (customer) => {

            navigate(
                `/customers/${customer.id}/edit`
            );

        };


    // ==========================================
    // JSX
    // ==========================================

    return (

        <Layout>

            <div className="customers-page">


                {/* HEADER */}

                <div className="page-header">

                    <div>

                        <h1>
                            Customers
                        </h1>

                        <p>
                            Manage your travel
                            customers.
                        </p>

                    </div>


                    <button
                        className="primary-btn"
                        onClick={handleAdd}
                    >
                        + Add Customer
                    </button>

                </div>


                {/* FILTERS */}

                <div className="customer-toolbar">

                    <input
                        type="text"
                        placeholder="Search customers..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />


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

                        <option value="Inactive">
                            Inactive
                        </option>

                    </select>


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

                        <option value="name">
                            Name
                        </option>

                        <option value="newest">
                            Newest
                        </option>

                        <option value="oldest">
                            Oldest
                        </option>

                    </select>

                </div>


                {/* CUSTOMER GRID */}

                {currentCustomers.length >
                0 ? (

                    <div className="customer-grid">

                        {currentCustomers.map(
                            (customer) => (

                                <div
                                    className="customer-card"
                                    key={
                                        customer.id
                                    }
                                >

                                    <div className="customer-avatar">
                                        {customer.name
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>


                                    <div className="customer-card-content">

                                        <div className="customer-title-row">

                                            <div>

                                                <h2>
                                                    {
                                                        customer.name
                                                    }
                                                </h2>

                                                <p>
                                                    {
                                                        customer.email
                                                    }
                                                </p>

                                            </div>


                                            <span
                                                className={
                                                    customer.status ===
                                                    "Active"
                                                        ? "customer-active"
                                                        : "customer-inactive"
                                                }
                                            >
                                                {
                                                    customer.status
                                                }
                                            </span>

                                        </div>


                                        <div className="customer-info">

                                            <p>
                                                📞{" "}
                                                {
                                                    customer.phone
                                                }
                                            </p>

                                            <p>
                                                📍{" "}
                                                {
                                                    customer.city
                                                }
                                                ,{" "}
                                                {
                                                    customer.country
                                                }
                                            </p>

                                        </div>


                                        <div className="customer-actions">

                                            <button
                                                className="view-btn"
                                                onClick={() =>
                                                    handleView(
                                                        customer
                                                    )
                                                }
                                            >
                                                View
                                            </button>


                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    handleEdit(
                                                        customer
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>


                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(
                                                        customer
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

                    <div className="customer-empty">

                        <div>
                            👥
                        </div>

                        <h2>
                            No customers found
                        </h2>

                        <p>
                            Try changing your
                            search or filters.
                        </p>

                    </div>

                )}


                {/* PAGINATION */}

                {totalPages > 1 && (

                    <div className="pagination">

                        <button
                            disabled={
                                currentPage ===
                                1
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
                                length:
                                    totalPages
                            },
                            (_, index) => (

                                <button
                                    key={
                                        index + 1
                                    }
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


                {/* TOAST */}

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


export default Customers;