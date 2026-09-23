import React from 'react';
import { useAppContext } from '../context/AppContext';
import BookingCard from '../components/BookingCard';
import { CalendarDays } from 'lucide-react';

const MyBookings = () => {
  const { bookings, currentUser, cancelBooking } = useAppContext();
  
  const activeBookings = bookings
    .filter(b => b.studentId === currentUser.id && (b.status === 'Pending' || b.status === 'Confirmed'))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="container">
      <h1 className="mb-2" style={{ fontSize: '1.5rem', fontWeight: 800 }}>My Bookings</h1>
      <p className="text-gray mb-8" style={{ fontSize: '0.9rem' }}>Manage your upcoming and pending shuttle rides.</p>

      {activeBookings.length > 0 ? (
        <div className="card-grid">
          {activeBookings.map(booking => (
            <BookingCard 
              key={booking.id} 
              booking={booking} 
              onCancel={cancelBooking}
            />
          ))}
        </div>
      ) : (
        <div className="card card-elevated py-12" style={{ textAlign: 'center', background: 'linear-gradient(135deg, var(--bg-surface), var(--bg-main))' }}>
          <div style={{ padding: '1.25rem', backgroundColor: 'var(--accent-primary-light)', borderRadius: '50%', color: 'var(--accent-primary)', marginBottom: '1rem', display: 'inline-flex', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.2)' }}>
            <CalendarDays size={32} />
          </div>
          <h3 className="mb-2" style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>No active bookings</h3>
          <p className="text-gray mb-0" style={{ fontSize: '0.9rem' }}>You don't have any pending or confirmed bookings at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default MyBookings;