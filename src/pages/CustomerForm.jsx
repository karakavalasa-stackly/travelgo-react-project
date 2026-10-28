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
    getCustomers,
    saveCustomers
} from "../utils/travelStorage";


function CustomerForm() {

    const navigate = useNavigate();

    const { id } = useParams();

    const isEdit =
        Boolean(id);


    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            phone: "",
            city: "",
            country: "",
            status: "Active"
        });


    const [errors, setErrors] =
        useState({});


    // LOAD CUSTOMER FOR EDIT

    useEffect(() => {

        if (!isEdit) {
            return;
        }


        const customers =
            getCustomers();


        const customer =
            customers.find(
                (item) =>
                    String(item.id) ===
                    String(id)
            );


        if (!customer) {

            navigate(
                "/customers"
            );

            return;
        }


        setFormData({
            name: customer.name || "",
            email: customer.email || "",
            phone: customer.phone || "",
            city: customer.city || "",
            country: customer.country || "",
            status:
                customer.status ||
                "Active"
        });

    }, [
        id,
        isEdit,
        navigate
    ]);


    // INPUT

    const handleChange =
        (e) => {

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


    // VALIDATION

    const validate = () => {

        const newErrors = {};


        if (!formData.name.trim()) {

            newErrors.name =
                "Customer name is required.";

        }


        if (!formData.email.trim()) {

            newErrors.email =
                "Email is required.";

        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(formData.email)
        ) {

            newErrors.email =
                "Enter a valid email.";

        }


        if (!formData.phone.trim()) {

            newErrors.phone =
                "Phone number is required.";

        } else if (
            !/^[0-9]{10}$/
                .test(formData.phone)
        ) {

            newErrors.phone =
                "Enter a valid 10 digit phone number.";

        }


        if (!formData.city.trim()) {

            newErrors.city =
                "City is required.";

        }


        if (!formData.country.trim()) {

            newErrors.country =
                "Country is required.";

        }


        setErrors(newErrors);


        return (
            Object.keys(newErrors)
                .length === 0
        );

    };


    // SUBMIT

    const handleSubmit =
        (e) => {

            e.preventDefault();


            if (!validate()) {
                return;
            }


            const customers =
                getCustomers();


            if (isEdit) {

                const updated =
                    customers.map(
                        (customer) =>
                            String(
                                customer.id
                            ) ===
                            String(id)
                                ? {
                                    ...customer,
                                    ...formData
                                }
                                : customer
                    );


                saveCustomers(
                    updated
                );

            } else {

                const newCustomer = {

                    id: Date.now(),

                    ...formData

                };


                saveCustomers([
                    ...customers,
                    newCustomer
                ]);

            }


            navigate(
                "/customers"
            );

        };


    return (

        <Layout>

            <div className="customer-form-page">

                <div className="page-header">

                    <div>

                        <h1>
                            {isEdit
                                ? "Edit Customer"
                                : "Add Customer"}
                        </h1>

                        <p>
                            {isEdit
                                ? "Update customer information"
                                : "Add a new travel customer"}
                        </p>

                    </div>

                </div>


                <div className="customer-form-card">

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >


                        <div className="form-group">

                            <label>
                                Customer Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={
                                    formData.name
                                }
                                placeholder="Enter customer name"
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


                        <div className="form-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={
                                    formData.email
                                }
                                placeholder="Enter email"
                                onChange={
                                    handleChange
                                }
                            />

                            {errors.email && (

                                <span className="form-error">
                                    {
                                        errors.email
                                    }
                                </span>

                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={
                                    formData.phone
                                }
                                placeholder="Enter 10 digit phone number"
                                maxLength="10"
                                onChange={
                                    handleChange
                                }
                            />

                            {errors.phone && (

                                <span className="form-error">
                                    {
                                        errors.phone
                                    }
                                </span>

                            )}

                        </div>


                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={
                                        formData.city
                                    }
                                    placeholder="Enter city"
                                    onChange={
                                        handleChange
                                    }
                                />

                                {errors.city && (

                                    <span className="form-error">
                                        {
                                            errors.city
                                        }
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
                                    value={
                                        formData.country
                                    }
                                    placeholder="Enter country"
                                    onChange={
                                        handleChange
                                    }
                                />

                                {errors.country && (

                                    <span className="form-error">
                                        {
                                            errors.country
                                        }
                                    </span>

                                )}

                            </div>

                        </div>


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
                                    navigate(
                                        "/customers"
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
                                    ? "Update Customer"
                                    : "Add Customer"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </Layout>
    );
}


export default CustomerForm;