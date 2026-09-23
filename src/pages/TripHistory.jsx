import React from 'react';
import { useAppContext } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import { History } from 'lucide-react';

const TripHistory = () => {
  const { bookings, currentUser } = useAppContext();
  
  const historyBookings = bookings
    .filter(b => b.studentId === currentUser.id && (b.status === 'Completed' || b.status === 'Cancelled'))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="container">
      <h1 className="mb-2" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Trip History</h1>
      <p className="text-gray mb-8" style={{ fontSize: '0.9rem' }}>View your past completed or cancelled rides.</p>

      {historyBookings.length > 0 ? (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th className="hide-mobile">Date</th>
                <th className="hide-mobile">Time</th>
                <th>Route</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {historyBookings.map(booking => (
                <tr key={booking.id}>
                  <td style={{ fontWeight: 600 }}>{booking.id}</td>
                  <td className="hide-mobile">{new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="hide-mobile">{booking.time}</td>
                  <td>{booking.routeName}</td>
                  <td><StatusBadge status={booking.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card card-elevated py-12" style={{ textAlign: 'center', background: 'linear-gradient(135deg, var(--bg-surface), var(--bg-main))' }}>
          <div style={{ padding: '1.25rem', backgroundColor: 'var(--accent-secondary-light)', borderRadius: '50%', color: 'var(--accent-secondary)', marginBottom: '1rem', display: 'inline-flex', boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)' }}>
            <History size={32} />
          </div>
          <h3 className="mb-2" style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>No history</h3>
          <p className="text-gray mb-0" style={{ fontSize: '0.9rem' }}>You haven't completed or cancelled any trips yet.</p>
        </div>
      )}
    </div>
  );
};

export default TripHistory;