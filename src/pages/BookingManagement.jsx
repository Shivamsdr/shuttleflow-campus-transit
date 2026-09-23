import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';

const BookingManagement = () => {
  const { bookings, drivers, assignDriver, cancelBooking } = useAppContext();
  const [assigningId, setAssigningId] = useState(null);
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [error, setError] = useState('');

  const handleAssign = (bookingId) => {
    setError('');
    if (!selectedDriverId) {
      setError('Please select a driver');
      return;
    }
    try {
      assignDriver(bookingId, parseInt(selectedDriverId));
      setAssigningId(null);
      setSelectedDriverId('');
    } catch (err) {
      setError(err.message);
    }
  };

  const availableDrivers = drivers.filter(d => d.status !== 'Unavailable');

  return (
    <div className="container">
      <h1 className="mb-2" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Booking Management</h1>
      <p className="text-gray mb-8" style={{ fontSize: '0.9rem' }}>View and manage all shuttle bookings, assign drivers.</p>

      {error && (
        <div className="mb-6 p-4 rounded" style={{ backgroundColor: 'var(--accent-danger-light)', color: 'var(--accent-danger-text)', borderLeft: '4px solid var(--accent-danger)', fontWeight: 500 }}>
          {error}
        </div>
      )}

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th className="hide-mobile">Route</th>
              <th className="hide-mobile">Date / Time</th>
              <th>Status</th>
              <th className="hide-mobile">Driver</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td style={{ fontWeight: 500 }}>{booking.id}</td>
                <td>{booking.studentName}</td>
                <td className="hide-mobile">{booking.routeName}</td>
                <td className="hide-mobile">
                  <div className="text-sm">{booking.date}</div>
                  <div className="text-sm text-gray">{booking.time}</div>
                </td>
                <td><StatusBadge status={booking.status} /></td>
                <td className="hide-mobile">
                  {assigningId === booking.id ? (
                    <select 
                      className="form-control"
                      style={{ padding: '0.25rem', margin: 0, minWidth: '150px' }}
                      value={selectedDriverId}
                      onChange={(e) => setSelectedDriverId(e.target.value)}
                    >
                      <option value="">Select driver...</option>
                      {availableDrivers.map(d => (
                        <option key={d.id} value={d.id}>{d.name} ({d.status})</option>
                      ))}
                    </select>
                  ) : (
                    <span className={booking.driverId ? '' : 'text-gray text-sm'}>
                      {booking.driverId ? drivers.find(d => d.id === booking.driverId)?.name : 'Unassigned'}
                    </span>
                  )}
                </td>
                <td>
                  {booking.status === 'Pending' || booking.status === 'Confirmed' ? (
                    <div className="flex gap-2">
                      {assigningId === booking.id ? (
                        <>
                          <button className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => handleAssign(booking.id)}>Save</button>
                          <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => { setAssigningId(null); setError(''); }}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => setAssigningId(booking.id)}>
                            {booking.driverId ? 'Reassign' : 'Assign Driver'}
                          </button>
                          <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => cancelBooking(booking.id)}>Cancel</button>
                        </>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray text-sm">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingManagement;
