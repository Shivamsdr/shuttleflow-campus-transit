import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { MapPin, Plus } from 'lucide-react';

const RouteManagement = () => {
  const { routes, addRoute } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    pickup: '',
    drop: '',
    defaultTime: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.pickup && formData.drop && formData.defaultTime) {
      addRoute(formData);
      setIsAdding(false);
      setFormData({ name: '', pickup: '', drop: '', defaultTime: '' });
    }
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="mb-2" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Route Management</h1>
          <p className="text-gray mb-0" style={{ fontSize: '0.9rem' }}>View and manage campus shuttle routes.</p>
        </div>
        <button className="btn btn-primary btn-lg" onClick={() => setIsAdding(!isAdding)}>
          <Plus size={18} />
          {isAdding ? 'Cancel' : 'Add Route'}
        </button>
      </div>

      {isAdding && (
        <div className="card card-elevated mb-8">
          <h2 className="mb-4" style={{ fontSize: '1.125rem', fontWeight: 700 }}>Add New Route</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Route Name</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Hostel Block C → Library"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="route-form-row" style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group flex-1">
                <label className="form-label">Pickup Point</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={formData.pickup}
                  onChange={e => setFormData({...formData, pickup: e.target.value})}
                  required
                />
              </div>
              <div className="form-group flex-1">
                <label className="form-label">Drop-off Point</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={formData.drop}
                  onChange={e => setFormData({...formData, drop: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Default Time</label>
              <input 
                type="time" 
                className="form-control" 
                style={{ maxWidth: '200px' }}
                value={formData.defaultTime}
                onChange={e => setFormData({...formData, defaultTime: e.target.value})}
                required
              />
            </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-primary">Save Route</button>
            </div>
          </form>
        </div>
      )}

      <div className="card-grid">
        {routes.map(route => (
          <div key={route.id} className="card">
            <h3 className="mb-4">{route.name}</h3>
            
            <div className="route-visual mb-4">
              <MapPin size={16} className="text-gray" />
              <span style={{ fontWeight: 500 }}>{route.pickup}</span>
              <div className="route-line"></div>
              <span style={{ fontWeight: 500 }}>{route.drop}</span>
              <MapPin size={16} className="text-gray" />
            </div>

            <div className="flex justify-between items-center text-sm text-gray mt-4 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
              <span>Route ID: {route.id}</span>
              <span>Default: {route.defaultTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteManagement;
