import React from "react";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Destinations from "./pages/Destinations";
import Trips from "./pages/Trips";
import TripDetails from "./pages/TripDetails";
import TripForm from "./pages/TripForm";
import Customers from "./pages/Customers";
import CustomerForm from "./pages/CustomerForm";
import CustomerDetails from "./pages/CustomerDetails";
import Bookings from "./pages/Bookings";
import BookingDetails from "./pages/BookingDetails";
import BookingForm from "./pages/BookingForm";
import Calendar from "./pages/Calendar";
import DestinationForm from "./pages/DestinationForm";
import DestinationDetails from "./pages/DestinationDetails";
import "./App.css";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={
                        <Dashboard />
                    }
                />

                <Route
                    path="/destinations"
                    element={
                        <Destinations />
                    }
                />
                <Route
                   path="/destinations/new"
                   element={<DestinationForm />}
                  />

               <Route
                 path="/destinations/:id"
                 element={<DestinationDetails />}
              />

            <Route
               path="/destinations/:id/edit"
               element={<DestinationForm />}
          />
                <Route
                    path="/trips"
                    element={
                      <Trips />
                   }
            />

            <Route
              path="/trips/:id"
              element={<TripDetails />}
               />

               <Route
                    path="/trips/new"
                   element={<TripForm />}
               />

            <Route
                path="/trips/:id/edit"
                element={<TripForm />}
             />

           <Route
              path="/customers"
              element={<Customers />}
              />
              
              <Route
                 path="/customers/new"
                 element={<CustomerForm />}
             />

              <Route
                   path="/customers/:id"
                   element={<CustomerDetails />}
              />

               <Route
                  path="/customers/:id/edit"
                  element={<CustomerForm />}
            />

              <Route
               path="/bookings"
               element={<Bookings />}
            />

            <Route
                path="/bookings/:id"
                element={<BookingDetails />}
           />
           <Route
                path="/bookings/new"
               element={<BookingForm />}
           />  
           <Route
                path="/bookings/:id/edit"
                element={<BookingForm />}
                />
           <Route
              path="/calendar"
              element={<Calendar />}
           />
            </Routes>
        </BrowserRouter>
    );
}

export default App;