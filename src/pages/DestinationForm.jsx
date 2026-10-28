import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import {
    getDestinations,
    saveDestinations
} from "../utils/travelStorage";

function DestinationForm() {

    const navigate = useNavigate();
    const { id } = useParams();

    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        name: "",
        country: "",
        description: "",
        image: "🌍",
        status: "Active"
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {

        if (isEdit) {

            const destinations = getDestinations();

            const destination = destinations.find(
                (item) => String(item.id) === String(id)
            );

            if (!destination) {
                navigate("/destinations");
                return;
            }

            setFormData({
                name: destination.name,
                country: destination.country,
                description: destination.description,
                image: destination.image,
                status: destination.status
            });
        }

    }, [id, isEdit, navigate]);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ""
        });
    };


    const validate = () => {

        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Destination name is required";
        } else if (formData.name.trim().length < 2) {
            newErrors.name =
                "Destination name must contain at least 2 characters";
        }

        if (!formData.country.trim()) {
            newErrors.country = "Country is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = (e) => {

        e.preventDefault();

        if (!validate()) {
            return;
        }

        const destinations = getDestinations();

        if (isEdit) {

            const updatedDestinations = destinations.map(
                (destination) =>
                    String(destination.id) === String(id)
                        ? {
                              ...destination,
                              ...formData
                          }
                        : destination
            );

            saveDestinations(updatedDestinations);

        } else {

            const newDestination = {
                id: Date.now(),
                ...formData,
                trips: 0
            };

            saveDestinations([
                ...destinations,
                newDestination
            ]);
        }

        navigate("/destinations");
    };


    return (
        <Layout>

            <div className="destination-form-page">

                <div className="page-header">

                    <div>
                        <h1>
                            {isEdit
                                ? "Edit Destination"
                                : "Add Destination"}
                        </h1>

                        <p>
                            {isEdit
                                ? "Update destination information"
                                : "Add a new travel destination"}
                        </p>
                    </div>

                </div>


                <div className="destination-form-card">

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>
                                Destination Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                placeholder="Enter destination name"
                                onChange={handleChange}
                            />

                            {errors.name && (
                                <span className="form-error">
                                    {errors.name}
                                </span>
                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Country
                            </label>

                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                placeholder="Enter country"
                                onChange={handleChange}
                            />

                            {errors.country && (
                                <span className="form-error">
                                    {errors.country}
                                </span>
                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                placeholder="Enter destination description"
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Destination Icon
                            </label>

                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                placeholder="Example: 🏝️"
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Active">
                                    Active
                                </option>

                                <option value="Inactive">
                                    Inactive
                                </option>
                            </select>

                        </div>


                        <div className="form-page-actions">

                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={() =>
                                    navigate("/destinations")
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="primary-btn"
                            >
                                {isEdit
                                    ? "Update Destination"
                                    : "Add Destination"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </Layout>
    );
}

export default DestinationForm;