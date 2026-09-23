import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from './context/AppContext';
import Navigation from './components/Navigation';

// Student Pages
import Dashboard from "./pages/Dashboard"; 
import BookShuttle from "./pages/BookShuttle"; 
import MyBookings from "./pages/MyBookings"; 
import TripHistory from "./pages/TripHistory"; 

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import BookingManagement from './pages/BookingManagement';
import DriverManagement from './pages/DriverManagement';
import RouteManagement from './pages/RouteManagement';
import Analytics from './pages/Analytics';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/book-shuttle" element={<BookShuttle/>} />
            <Route path="/my-bookings" element={<MyBookings/>} />
            <Route path="/trip-history" element={<TripHistory/>} />
            
            <Route path="/admin" element={<AdminDashboard/>} />
            <Route path="/admin/bookings" element={<BookingManagement/>} />
            <Route path="/admin/drivers" element={<DriverManagement/>} />
            <Route path="/admin/routes" element={<RouteManagement/>} />
            <Route path="/admin/analytics" element={<Analytics/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;