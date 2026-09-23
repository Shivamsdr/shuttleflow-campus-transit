import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { CheckCircle2, XCircle, Users } from 'lucide-react';

const BookShuttle = () => {
  const { routes, drivers, addBooking } = useAppContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    routeId: '',
    date: '',
    time: ''
  });
  const [error, setError] = useState('');
  const [availableDriver, setAvailableDriver] = useState(null);

  const today = new Date().toISOString().split('T')[0];

  const handleRouteSelect = (e) => {
    const routeId = parseInt(e.target.value);
    const selectedRoute = routes.find(r => r.id === routeId);
    setFormData({
      ...formData,
      routeId,
      time: selectedRoute ? selectedRoute.defaultTime : ''
    });
  };

  // Check driver availability whenever form data changes
  useEffect(() => {
    if (formData.routeId && formData.date && formData.time) {
      // Very basic mock availability logic
      // Find a driver who is not unavailable, and whose duty hours cover the time
      const timeStr = formData.time;
      const available = drivers.find(d => {
        if (d.status === 'Unavailable') return false;
        
        // Convert to comparable formats (HH:MM vs HH:MM)
        // Ensure format is comparable
        const timeHHMM = timeStr.replace(/ AM| PM/g, ''); 
        
        if (d.dutyStart && d.dutyEnd) {
           return timeHHMM >= d.dutyStart && timeHHMM <= d.dutyEnd && !d.breaks.includes(timeHHMM);
        }
        return true;
      });
      setAvailableDriver(available || null);
    } else {
      setAvailableDriver(null);
    }
  }, [formData, drivers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.routeId || !formData.date || !formData.time) {
      setError('Please fill in all fields.');
      return;
    }

    if (!availableDriver) {
      setError('No shuttle available for this time. Try another time.');
      return;
    }

    try {
      const selectedRoute = routes.find(r => r.id === parseInt(formData.routeId));
      addBooking({
        routeId: selectedRoute.id,
        routeName: selectedRoute.name,
        date: formData.date,
        time: formData.time
      });
      navigate('/my-bookings');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', paddingTop: '1.5rem' }}>
      <h1 className="mb-1" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Book a Shuttle</h1>
      <p className="text-sm text-gray mb-6" style={{ fontSize: '0.9rem' }}>Select a route and time to schedule your ride.</p>

      <div className="card card-elevated">
        {error && (
          <div className="mb-4 p-4 rounded text-sm" style={{ backgroundColor: 'var(--accent-danger-light)', color: 'var(--accent-danger-text)', borderLeft: '4px solid var(--accent-danger)', fontWeight: 500 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Select Route</label>
            <select 
              className="form-control" 
              value={formData.routeId} 
              onChange={handleRouteSelect}
              required
            >
              <option value="">-- Choose a route --</option>
              {routes.map(route => (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row-flex" style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group flex-1">
              <label className="form-label">Date</label>
              <input 
                type="date" 
                className="form-control" 
                min={today}
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>

            <div className="form-group flex-1">
              <label className="form-label">Time</label>
              <input 
                type="time" 
                className="form-control" 
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
                required
              />
            </div>
          </div>

          {formData.routeId && formData.date && formData.time && (
            <div className="mt-4 p-4 rounded" style={{ backgroundColor: 'linear-gradient(135deg, var(--bg-main), white)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <p className="text-sm font-medium mb-3" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Shuttle Availability</p>
              {availableDriver ? (
                <div>
                  <div className="flex items-center gap-2 text-sm mb-2" style={{ color: 'var(--accent-primary-text)', fontWeight: 600 }}>
                    <CheckCircle2 size={16} />
                    <span>Available</span>
                  </div>
                  <div className="grid text-sm text-gray" style={{ gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>Driver: <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{availableDriver.name}</span></div>
                    <div>Vehicle: <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{availableDriver.vehicle}</span></div>
                    <div>Departure: <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{formData.time}</span></div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>40 seats left</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--accent-danger-text)', fontWeight: 500 }}>
                  <XCircle size={16} />
                  <span>No shuttle available for this time. Try another time.</span>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!availableDriver}
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookShuttle;