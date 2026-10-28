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
    getTrips,
    saveTrips,
    getDestinations
} from "../utils/travelStorage";


function TripForm() {

    const navigate = useNavigate();

    const { id } = useParams();

    const isEdit = Boolean(id);


    const [destinations, setDestinations] =
        useState([]);


    const [formData, setFormData] =
        useState({
            name: "",
            destination: "",
            country: "",
            startDate: "",
            endDate: "",
            duration: "",
            price: "",
            status: "Active",
            description: ""
        });


    const [errors, setErrors] =
        useState({});


    // ==========================================
    // LOAD DESTINATIONS
    // ==========================================

    useEffect(() => {

        setDestinations(
            getDestinations()
        );

    }, []);


    // ==========================================
    // LOAD TRIP FOR EDIT
    // ==========================================

    useEffect(() => {

        if (!isEdit) {
            return;
        }


        const trips = getTrips();

        const trip = trips.find(
            (item) =>
                String(item.id) ===
                String(id)
        );


        if (!trip) {

            navigate("/trips");

            return;
        }


        setFormData({
            name: trip.name,
            destination: trip.destination,
            country: trip.country,
            startDate: trip.startDate,
            endDate: trip.endDate,
            duration: trip.duration,
            price: trip.price,
            status: trip.status,
            description: trip.description
        });

    }, [
        id,
        isEdit,
        navigate
    ]);


    // ==========================================
    // INPUT CHANGE
    // ==========================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData({
            ...formData,
            [name]: value
        });


        setErrors({
            ...errors,
            [name]: ""
        });

    };


    // ==========================================
    // DESTINATION CHANGE
    // ==========================================

    const handleDestinationChange = (
        e
    ) => {

        const value =
            e.target.value;


        const selected =
            destinations.find(
                (destination) =>
                    destination.name ===
                    value
            );


        setFormData({
            ...formData,
            destination: value,
            country: selected
                ? selected.country
                : ""
        });


        setErrors({
            ...errors,
            destination: ""
        });

    };


    // ==========================================
    // VALIDATION
    // ==========================================

    const validate = () => {

        const newErrors = {};


        if (!formData.name.trim()) {

            newErrors.name =
                "Trip name is required.";

        }


        if (!formData.destination) {

            newErrors.destination =
                "Destination is required.";

        }


        if (!formData.startDate) {

            newErrors.startDate =
                "Start date is required.";

        }


        if (!formData.endDate) {

            newErrors.endDate =
                "End date is required.";

        }


        if (
            formData.startDate &&
            formData.endDate &&
            formData.endDate <
                formData.startDate
        ) {

            newErrors.endDate =
                "End date must be after start date.";

        }


        if (
            !formData.price ||
            Number(formData.price) <= 0
        ) {

            newErrors.price =
                "Valid price is required.";

        }


        setErrors(newErrors);


        return (
            Object.keys(newErrors)
                .length === 0
        );

    };


    // ==========================================
    // CALCULATE DURATION
    // ==========================================

    const calculateDuration = (
        startDate,
        endDate
    ) => {

        if (
            !startDate ||
            !endDate
        ) {
            return "";
        }


        const start =
            new Date(startDate);

        const end =
            new Date(endDate);


        const difference =
            end.getTime() -
            start.getTime();


        if (difference < 0) {
            return "";
        }


        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            ) + 1;


        return `${days} Days`;

    };


    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = (e) => {

        e.preventDefault();


        if (!validate()) {
            return;
        }


        const trips =
            getTrips();


        const duration =
            calculateDuration(
                formData.startDate,
                formData.endDate
            );


        if (isEdit) {

            const updatedTrips =
                trips.map(
                    (trip) =>
                        String(trip.id) ===
                        String(id)
                            ? {
                                ...trip,
                                ...formData,
                                duration,
                                price:
                                    Number(
                                        formData.price
                                    )
                            }
                            : trip
                );


            saveTrips(
                updatedTrips
            );

        } else {

            const newTrip = {

                id: Date.now(),

                ...formData,

                duration,

                price:
                    Number(
                        formData.price
                    )
            };


            saveTrips([
                ...trips,
                newTrip
            ]);

        }


        navigate("/trips");

    };


    // ==========================================
    // JSX
    // ==========================================

    return (

        <Layout>

            <div className="trip-form-page">


                <div className="page-header">

                    <div>

                        <h1>
                            {isEdit
                                ? "Edit Trip"
                                : "Create Trip"}
                        </h1>

                        <p>
                            {isEdit
                                ? "Update trip information"
                                : "Create a new travel trip"}
                        </p>

                    </div>

                </div>


                <div className="trip-form-card">

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >


                        {/* TRIP NAME */}

                        <div className="form-group">

                            <label>
                                Trip Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={
                                    formData.name
                                }
                                placeholder="Enter trip name"
                                onChange={
                                    handleChange
                                }
                            />

                            {errors.name && (

                                <span className="form-error">
                                    {
                                        errors.name
                                    }
                                </span>

                            )}

                        </div>


                        {/* DESTINATION */}

                        <div className="form-group">

                            <label>
                                Destination
                            </label>

                            <select
                                name="destination"
                                value={
                                    formData.destination
                                }
                                onChange={
                                    handleDestinationChange
                                }
                            >

                                <option value="">
                                    Select Destination
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

                            {errors.destination && (

                                <span className="form-error">
                                    {
                                        errors.destination
                                    }
                                </span>

                            )}

                        </div>


                        {/* COUNTRY */}

                        <div className="form-group">

                            <label>
                                Country
                            </label>

                            <input
                                type="text"
                                name="country"
                                value={
                                    formData.country
                                }
                                readOnly
                            />

                        </div>


                        {/* DATES */}

                        <div className="form-row">


                            <div className="form-group">

                                <label>
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    name="startDate"
                                    value={
                                        formData.startDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                {errors.startDate && (

                                    <span className="form-error">
                                        {
                                            errors.startDate
                                        }
                                    </span>

                                )}

                            </div>


                            <div className="form-group">

                                <label>
                                    End Date
                                </label>

                                <input
                                    type="date"
                                    name="endDate"
                                    value={
                                        formData.endDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                {errors.endDate && (

                                    <span className="form-error">
                                        {
                                            errors.endDate
                                        }
                                    </span>

                                )}

                            </div>

                        </div>


                        {/* PRICE */}

                        <div className="form-group">

                            <label>
                                Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                min="1"
                                value={
                                    formData.price
                                }
                                placeholder="Enter price"
                                onChange={
                                    handleChange
                                }
                            />

                            {errors.price && (

                                <span className="form-error">
                                    {
                                        errors.price
                                    }
                                </span>

                            )}

                        </div>


                        {/* STATUS */}

                        <div className="form-group">

                            <label>
                                Status
                            </label>

                            <select
                                name="status"
                                value={
                                    formData.status
                                }
                                onChange={
                                    handleChange
                                }
                            >

                                <option value="Active">
                                    Active
                                </option>

                                <option value="Upcoming">
                                    Upcoming
                                </option>

                            </select>

                        </div>


                        {/* DESCRIPTION */}

                        <div className="form-group">

                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                rows="5"
                                value={
                                    formData.description
                                }
                                placeholder="Enter trip description"
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        {/* ACTIONS */}

                        <div className="form-page-actions">

                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={() =>
                                    navigate(
                                        "/trips"
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
                                    ? "Update Trip"
                                    : "Create Trip"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </Layout>
    );
}


export default TripForm;