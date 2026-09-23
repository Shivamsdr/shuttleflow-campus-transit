import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import StatusBadge from './StatusBadge';

const BookingCard = ({ booking, onCancel }) => {
  const [pickup, drop] = booking.routeName.split(' → ');

  return (
    <div className="card card-elevated">
      <div className="flex justify-between items-center mb-4">
        <h3 className="mb-0" style={{ fontSize: '1.125rem', fontWeight: 700 }}>Booking {booking.id}</h3>
        <StatusBadge status={booking.status} />
      </div>

      <div className="route-visual mb-4">
        <MapPin size={16} className="text-gray" />
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{pickup}</span>
        <div className="route-line"></div>
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{drop}</span>
        <MapPin size={16} className="text-gray" />
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray">
          <Calendar size={16} />
          {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray">
          <Clock size={16} />
          {booking.time}
        </div>
      </div>

      {booking.status === 'Pending' || booking.status === 'Confirmed' ? (
        <div className="flex justify-between items-center mt-4 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          {booking.driverId ? (
            <span className="text-sm" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Assigned Driver ID: {booking.driverId}</span>
          ) : (
            <span className="text-sm text-gray">Driver not yet assigned</span>
          )}
          {onCancel && (
            <button 
              className="btn btn-danger btn-sm" 
              onClick={() => onCancel(booking.id)}
            >
              Cancel Booking
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default BookingCard;
