const DESTINATION_KEY =
    "travelDestinations";


export const getDestinations = () => {

    const saved =
        localStorage.getItem(
            DESTINATION_KEY
        );

    return saved
        ? JSON.parse(saved)
        : [];
};


export const saveDestinations = (
    destinations
) => {

    localStorage.setItem(
        DESTINATION_KEY,
        JSON.stringify(destinations)
    );

    window.dispatchEvent(
        new Event(
            "destinationsUpdated"
        )
    );
};


// =================================
// TRIPS STORAGE
// =================================

const TRIP_KEY =
    "travelTrips";


export const getTrips = () => {

    const saved =
        localStorage.getItem(
            TRIP_KEY
        );

    return saved
        ? JSON.parse(saved)
        : [];
};


export const saveTrips = (
    trips
) => {

    localStorage.setItem(
        TRIP_KEY,
        JSON.stringify(trips)
    );

    window.dispatchEvent(
        new Event(
            "tripsUpdated"
        )
    );
};
// =================================
// CUSTOMERS STORAGE
// =================================

const CUSTOMER_KEY =
    "travelCustomers";


export const getCustomers = () => {

    const saved =
        localStorage.getItem(
            CUSTOMER_KEY
        );

    return saved
        ? JSON.parse(saved)
        : [];

};


export const saveCustomers = (
    customers
) => {

    localStorage.setItem(
        CUSTOMER_KEY,
        JSON.stringify(customers)
    );

    window.dispatchEvent(
        new Event(
            "customersUpdated"
        )
    );

};
// =================================
// BOOKINGS STORAGE
// =================================

const BOOKING_KEY =
    "travelBookings";


export const getBookings = () => {

    const saved =
        localStorage.getItem(
            BOOKING_KEY
        );

    return saved
        ? JSON.parse(saved)
        : [];

};


export const saveBookings = (
    bookings
) => {

    localStorage.setItem(
        BOOKING_KEY,
        JSON.stringify(bookings)
    );

    window.dispatchEvent(
        new Event(
            "bookingsUpdated"
        )
    );

};