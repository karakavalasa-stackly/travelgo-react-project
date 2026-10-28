import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { getDestinations } from "../utils/travelStorage";

function DestinationDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [destination, setDestination] = useState(null);

    useEffect(() => {

        const destinations = getDestinations();

        const selected = destinations.find(
            (item) => String(item.id) === String(id)
        );

        setDestination(selected);

    }, [id]);


    if (!destination) {

        return (
            <Layout>

                <div className="destination-empty">

                    <h2>
                        Destination not found
                    </h2>

                    <button
                        className="primary-btn"
                        onClick={() =>
                            navigate("/destinations")
                        }
                    >
                        Back to Destinations
                    </button>

                </div>

            </Layout>
        );
    }


    return (
        <Layout>

            <div className="destination-details-page">

                <div className="page-header">

                    <div>

                        <button
                            className="secondary-btn"
                            onClick={() =>
                                navigate("/destinations")
                            }
                        >
                            ← Back to Destinations
                        </button>

                        <h1>
                            {destination.name}
                        </h1>

                        <p>
                            Destination Details
                        </p>

                    </div>

                </div>


                <div className="destination-details-card">

                    <div className="destination-details-icon">
                        {destination.image}
                    </div>

                    <h2>
                        {destination.name}
                    </h2>

                    <p className="destination-country">
                        🌍 {destination.country}
                    </p>


                    <div className="destination-details-info">

                        <div>
                            <strong>
                                Description
                            </strong>

                            <p>
                                {destination.description}
                            </p>
                        </div>


                        <div>
                            <strong>
                                Available Trips
                            </strong>

                            <p>
                                {destination.trips}
                            </p>
                        </div>


                        <div>
                            <strong>
                                Status
                            </strong>

                            <p>
                                {destination.status}
                            </p>
                        </div>

                    </div>


                    <div className="form-page-actions">

                        <button
                            className="secondary-btn"
                            onClick={() =>
                                navigate("/destinations")
                            }
                        >
                            Back
                        </button>

                        <button
                            className="primary-btn"
                            onClick={() =>
                                navigate(
                                    `/destinations/${destination.id}/edit`
                                )
                            }
                        >
                            Edit Destination
                        </button>

                    </div>

                </div>

            </div>

        </Layout>
    );
}

export default DestinationDetails;