import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialRoutes, initialDrivers, initialBookings } from '../data/mockData';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Initialize state from localStorage or use mock data
  const [routes, setRoutes] = useState(() => {
    const saved = localStorage.getItem('shuttle_routes');
    return saved ? JSON.parse(saved) : initialRoutes;
  });

  const [drivers, setDrivers] = useState(() => {
    const saved = localStorage.getItem('shuttle_drivers');
    return saved ? JSON.parse(saved) : initialDrivers;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('shuttle_bookings');
    return saved ? JSON.parse(saved) : initialBookings;
  });

  // Current logged in user (mocked as student for student views)
  const [currentUser] = useState({ id: 'STU101', name: 'Rahul Sharma' });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('shuttle_routes', JSON.stringify(routes));
  }, [routes]);

  useEffect(() => {
    localStorage.setItem('shuttle_drivers', JSON.stringify(drivers));
  }, [drivers]);

  useEffect(() => {
    localStorage.setItem('shuttle_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Actions

  /**
   * Books a shuttle for the current user.
   * Checks for duplicates to prevent multiple bookings for the same time.
   * Time Complexity: O(B) where B is the number of bookings.
   */
  const addBooking = (bookingData) => {
    // Check for duplicate booking
    const isDuplicate = bookings.some(b => 
      b.studentId === currentUser.id && 
      b.date === bookingData.date && 
      b.time === bookingData.time &&
      b.status !== 'Cancelled'
    );

    if (isDuplicate) {
      throw new Error("You already have a booking for this time.");
    }

    const newBooking = {
      ...bookingData,
      id: `BK${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      status: 'Pending',
      driverId: null
    };

    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  /**
   * Cancels an active booking.
   * Time Complexity: O(B)
   */
  const cancelBooking = (bookingId) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, status: 'Cancelled' } : b
    ));
  };

  /**
   * Assigns a driver to a specific booking.
   * Time Complexity: O(D + B) where D is drivers and B is bookings.
   */
  const assignDriver = (bookingId, driverId) => {
    // Basic validation
    const driver = drivers.find(d => d.id === driverId);
    if (!driver || driver.status === 'Unavailable') {
      throw new Error("Driver is unavailable");
    }

    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, driverId, status: 'Confirmed' } : b
    ));
  };

  /**
   * Adds a new shuttle route.
   * Time Complexity: O(R) where R is the number of routes.
   */
  const addRoute = (routeData) => {
    const newRoute = {
      ...routeData,
      id: Math.max(0, ...routes.map(r => r.id)) + 1
    };
    setRoutes(prev => [...prev, newRoute]);
  };

  /**
   * Updates a driver's schedule (duty hours and breaks).
   * Time Complexity: O(D)
   */
  const updateDriverSchedule = (driverId, scheduleData) => {
    setDrivers(prev => prev.map(d => 
      d.id === driverId ? { ...d, ...scheduleData } : d
    ));
  };

  /**
   * Updates a driver's current availability status.
   * Time Complexity: O(D)
   */
  const updateDriverStatus = (driverId, status) => {
    setDrivers(prev => prev.map(d => 
      d.id === driverId ? { ...d, status } : d
    ));
  };

  return (
    <AppContext.Provider value={{
      routes,
      drivers,
      bookings,
      currentUser,
      addBooking,
      cancelBooking,
      assignDriver,
      addRoute,
      updateDriverSchedule,
      updateDriverStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};
