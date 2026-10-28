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
    getCustomers
} from "../utils/travelStorage";


function CustomerDetails() {

    const {
        id
    } = useParams();

    const navigate =
        useNavigate();


    const [customer, setCustomer] =
        useState(null);


    useEffect(() => {

        const customers =
            getCustomers();


        const selected =
            customers.find(
                (item) =>
                    String(item.id) ===
                    String(id)
            );


        setCustomer(
            selected
        );

    }, [id]);


    if (!customer) {

        return (

            <Layout>

                <div className="customer-empty">

                    <h2>
                        Customer not found
                    </h2>

                    <button
                        className="primary-btn"
                        onClick={() =>
                            navigate(
                                "/customers"
                            )
                        }
                    >
                        Back to Customers
                    </button>

                </div>

            </Layout>
        );

    }


    return (

        <Layout>

            <div className="customer-details-page">


                <div className="page-header">

                    <div>

                        <button
                            className="secondary-btn"
                            onClick={() =>
                                navigate(
                                    "/customers"
                                )
                            }
                        >
                            ← Back to Customers
                        </button>

                        <h1>
                            {customer.name}
                        </h1>

                        <p>
                            Customer Details
                        </p>

                    </div>

                </div>


                <div className="customer-details-card">


                    <div className="customer-details-avatar">

                        {
                            customer.name
                                .charAt(0)
                                .toUpperCase()
                        }

                    </div>


                    <h2>
                        {customer.name}
                    </h2>


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


                    <div className="customer-details-info">


                        <div>

                            <strong>
                                Email
                            </strong>

                            <p>
                                📧{" "}
                                {
                                    customer.email
                                }
                            </p>

                        </div>


                        <div>

                            <strong>
                                Phone
                            </strong>

                            <p>
                                📞{" "}
                                {
                                    customer.phone
                                }
                            </p>

                        </div>


                        <div>

                            <strong>
                                City
                            </strong>

                            <p>
                                📍{" "}
                                {
                                    customer.city
                                }
                            </p>

                        </div>


                        <div>

                            <strong>
                                Country
                            </strong>

                            <p>
                                🌍{" "}
                                {
                                    customer.country
                                }
                            </p>

                        </div>

                    </div>


                    <div className="form-page-actions">

                        <button
                            className="secondary-btn"
                            onClick={() =>
                                navigate(
                                    "/customers"
                                )
                            }
                        >
                            Back
                        </button>


                        <button
                            className="primary-btn"
                            onClick={() =>
                                navigate(
                                    `/customers/${customer.id}/edit`
                                )
                            }
                        >
                            Edit Customer
                        </button>

                    </div>

                </div>

            </div>

        </Layout>
    );
}


export default CustomerDetails;