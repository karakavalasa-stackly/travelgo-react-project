import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import { getTrips } from "../utils/travelStorage";

function TripDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [trip, setTrip] = useState(null);

    useEffect(() => {

        const trips = getTrips();

        const selectedTrip = trips.find(
            (item) =>
                String(item.id) === String(id)
        );

        setTrip(selectedTrip);

    }, [id]);


    if (!trip) {

        return (
            <Layout>

                <div className="trip-empty">

                    <div>
                        🧳
                    </div>

                    <h2>
                        Trip not found
                    </h2>

                    <p>
                        The selected trip does not exist.
                    </p>

                    <button
                        className="primary-btn"
                        onClick={() =>
                            navigate("/trips")
                        }
                    >
                        Back to Trips
                    </button>

                </div>

            </Layout>
        );

    }


    return (

        <Layout>

            <div className="trip-details-page">

                <div className="page-header">

                    <div>

                        <button
                            className="secondary-btn"
                            onClick={() =>
                                navigate("/trips")
                            }
                        >
                            ← Back to Trips
                        </button>

                        <h1>
                            {trip.name}
                        </h1>

                        <p>
                            Complete trip information
                        </p>

                    </div>

                    <span className="trip-status">
                        {trip.status}
                    </span>

                </div>


                <div className="trip-detail-card">

                    <div className="trip-detail-image">

                        <span>
                            🧳
                        </span>

                    </div>


                    <div className="trip-detail-content">

                        <h2>
                            {trip.name}
                        </h2>

                        <p className="trip-location">
                            🌍 {trip.destination},{" "}
                            {trip.country}
                        </p>

                        <p className="trip-description">
                            {trip.description}
                        </p>


                        <div className="trip-info-grid">

                            <div className="trip-info-box">

                                <span>📅</span>

                                <div>

                                    <small>
                                        Start Date
                                    </small>

                                    <strong>
                                        {trip.startDate}
                                    </strong>

                                </div>

                            </div>


                            <div className="trip-info-box">

                                <span>📅</span>

                                <div>

                                    <small>
                                        End Date
                                    </small>

                                    <strong>
                                        {trip.endDate}
                                    </strong>

                                </div>

                            </div>


                            <div className="trip-info-box">

                                <span>⏱️</span>

                                <div>

                                    <small>
                                        Duration
                                    </small>

                                    <strong>
                                        {trip.duration}
                                    </strong>

                                </div>

                            </div>


                            <div className="trip-info-box">

                                <span>💰</span>

                                <div>

                                    <small>
                                        Price
                                    </small>

                                    <strong>
                                        ₹
                                        {Number(
                                            trip.price
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </strong>

                                </div>

                            </div>

                        </div>


                        <div className="trip-detail-actions">

                            <button
                                className="secondary-btn"
                                onClick={() =>
                                    navigate("/trips")
                                }
                            >
                                Back
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default TripDetails;