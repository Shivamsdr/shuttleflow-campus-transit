import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';

const DriverManagement = () => {
  const { drivers, updateDriverStatus, updateDriverSchedule } = useAppContext();
  
  const [editingDriver, setEditingDriver] = useState(null);
  const [scheduleData, setScheduleData] = useState({ dutyStart: '', dutyEnd: '', breaks: '' });

  // Timeline hours from 06:00 to 20:00 (15 slots)
  const hours = Array.from({ length: 15 }, (_, i) => i + 6);
  
  const getTimelineStyle = (start, end) => {
    const startHour = parseInt(start.split(':')[0]);
    const endHour = parseInt(end.split(':')[0]);
    
    // Column starts at 2 (1st column is driver name)
    const gridColumnStart = Math.max(2, startHour - 6 + 2);
    const gridColumnEnd = Math.min(17, endHour - 6 + 2);
    
    return {
      gridColumn: `${gridColumnStart} / ${gridColumnEnd}`
    };
  };

  const getBreakStyle = (breakTime) => {
    const hour = parseInt(breakTime.split(':')[0]);
    const col = hour - 6 + 2;
    return {
      gridColumn: `${col} / ${col + 1}`
    };
  };

  const handleEditClick = (driver) => {
    setEditingDriver(driver.id);
    setScheduleData({
      dutyStart: driver.dutyStart || '',
      dutyEnd: driver.dutyEnd || '',
      breaks: driver.breaks ? driver.breaks.join(', ') : ''
    });
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    const breaksArray = scheduleData.breaks.split(',').map(b => b.trim()).filter(b => b);
    updateDriverSchedule(editingDriver, {
      dutyStart: scheduleData.dutyStart,
      dutyEnd: scheduleData.dutyEnd,
      breaks: breaksArray
    });
    setEditingDriver(null);
  };

  return (
    <div className="container" style={{ paddingTop: '1.5rem' }}>
      <h1 className="mb-1" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Drivers & Scheduling</h1>
      <p className="text-sm text-gray mb-6" style={{ fontSize: '0.9rem' }}>Manage driver schedules, duty hours, and breaks.</p>

      {editingDriver && (
        <div className="card card-elevated mb-8" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
          <h2 className="mb-4" style={{ fontSize: '1.125rem', fontWeight: 700 }}>Edit Schedule for {drivers.find(d => d.id === editingDriver)?.name}</h2>
          <form onSubmit={handleScheduleSubmit}>
            <div className="flex gap-4 mb-4">
              <div className="form-group flex-1">
                <label className="form-label">Duty Start (HH:MM)</label>
                <input 
                  type="time" 
                  className="form-control" 
                  value={scheduleData.dutyStart}
                  onChange={e => setScheduleData({...scheduleData, dutyStart: e.target.value})}
                  required
                />
              </div>
              <div className="form-group flex-1">
                <label className="form-label">Duty End (HH:MM)</label>
                <input 
                  type="time" 
                  className="form-control" 
                  value={scheduleData.dutyEnd}
                  onChange={e => setScheduleData({...scheduleData, dutyEnd: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="form-group mb-4">
              <label className="form-label">Breaks (comma separated, e.g. 13:00, 16:00)</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. 13:00, 16:00"
                value={scheduleData.breaks}
                onChange={e => setScheduleData({...scheduleData, breaks: e.target.value})}
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary">Save Schedule</button>
              <button type="button" className="btn btn-outline" onClick={() => setEditingDriver(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="card mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="mb-0" style={{ fontSize: '1.125rem' }}>Schedule — Sep 23, 2026</h2>
          <div className="flex items-center gap-4 text-sm text-gray">
            <div className="flex items-center gap-2">
              <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--accent-green-light)', border: '1px solid var(--accent-green)', borderRadius: '2px' }}></div>
              Duty Hours
            </div>
            <div className="flex items-center gap-2">
              <div style={{ width: '12px', height: '12px', backgroundColor: '#f1f5f9', border: '1px dashed #cbd5e1', borderRadius: '2px' }}></div>
              Break
            </div>
          </div>
        </div>
        <div className="timeline-container">
          <div className="timeline-header">
            <div className="timeline-cell" style={{ textAlign: 'left' }}>Driver</div>
            {hours.map(hour => (
              <div key={hour} className="timeline-cell">
                {hour.toString().padStart(2, '0')}:00
              </div>
            ))}
          </div>
          
          {drivers.map(driver => (
            <div key={driver.id} className="timeline-row" style={{ position: 'relative' }}>
              <div className="timeline-cell driver-info">
                {driver.name}
              </div>
              {/* Grid cells for borders */}
              {hours.map(hour => (
                <div key={`cell-${hour}`} className="timeline-cell"></div>
              ))}
              
              {/* Duty hours bar */}
              {driver.dutyStart && driver.dutyEnd && (
                <div 
                  className="timeline-bar" 
                  style={getTimelineStyle(driver.dutyStart, driver.dutyEnd)}
                ></div>
              )}
              
              {/* Break bars (drawn over duty hours) */}
              {driver.breaks && driver.breaks.map((brk, idx) => (
                <div 
                  key={idx}
                  className="timeline-bar break" 
                  style={getBreakStyle(brk)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th className="hide-mobile">Vehicle</th>
              <th className="hide-mobile">Duty Hours</th>
              <th className="hide-mobile">Breaks</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map(driver => (
              <tr key={driver.id}>
                <td>{driver.id}</td>
                <td style={{ fontWeight: 500 }}>{driver.name}</td>
                <td className="hide-mobile">{driver.vehicle}</td>
                <td className="hide-mobile">{driver.dutyStart} - {driver.dutyEnd}</td>
                <td className="hide-mobile">{driver.breaks.join(', ') || 'None'}</td>
                <td><StatusBadge status={driver.status} /></td>
                <td>
                  <div className="driver-action-cell" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <select 
                      className="form-control"
                      style={{ padding: '0.25rem', margin: 0, width: 'auto' }}
                      value={driver.status}
                      onChange={(e) => updateDriverStatus(driver.id, e.target.value)}
                    >
                      <option value="Available">Available</option>
                      <option value="On Trip">On Trip</option>
                      <option value="Unavailable">Unavailable</option>
                    </select>
                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => handleEditClick(driver)}>
                      Edit Schedule
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverManagement;
