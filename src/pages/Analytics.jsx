import React from 'react';
import { useAppContext } from '../context/AppContext';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const { bookings, drivers, routes } = useAppContext();

  // 1. Total Trips
  const totalTrips = bookings.length;

  // 2a. Popular Pickup Points (For Chart)
  const pickupCounts = bookings.reduce((acc, booking) => {
    const route = routes.find(r => r.id === booking.routeId);
    const label = route ? route.pickup : booking.routeName.substring(0, 10) + '...';
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

  const routeData = Object.keys(pickupCounts).map(route => ({
    name: route,
    bookings: pickupCounts[route]
  }));

  // 2b. Most Requested Route (For Metric)
  const fullRouteCounts = bookings.reduce((acc, booking) => {
    const label = booking.routeName;
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

  let mostRequestedRoute = 'N/A';
  let maxRouteCount = 0;
  Object.keys(fullRouteCounts).forEach(route => {
    if (fullRouteCounts[route] > maxRouteCount) {
      maxRouteCount = fullRouteCounts[route];
      mostRequestedRoute = route;
    }
  });

  // 3. Peak Hour Demand
  const hourCounts = bookings.reduce((acc, booking) => {
    const hour = booking.time.split(':')[0]; // get HH
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {});

  const peakHourData = Object.keys(hourCounts)
    .sort()
    .map(hour => ({
      hour: `${hour}:00`,
      bookings: hourCounts[hour]
    }));

  let peakHour = 'N/A';
  let maxHourCount = 0;
  Object.keys(hourCounts).forEach(hour => {
    if (hourCounts[hour] > maxHourCount) {
      maxHourCount = hourCounts[hour];
      peakHour = `${hour}:00`;
    }
  });

  // 4. Driver Utilization
  const driverData = [
    { name: 'Available', value: drivers.filter(d => d.status === 'Available').length },
    { name: 'On Trip', value: drivers.filter(d => d.status === 'On Trip').length },
    { name: 'Unavailable', value: drivers.filter(d => d.status === 'Unavailable').length }
  ];

  const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444']; 

  return (
    <div className="container" style={{ paddingTop: '1.5rem' }}>
      <h1 className="mb-1" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Analytics</h1>
      <p className="text-sm text-gray mb-6" style={{ fontSize: '0.9rem' }}>System performance and usage metrics powered by real application data.</p>

      <div className="analytics-summary-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="card card-elevated text-center py-4">
          <p className="text-sm text-gray mb-1" style={{ fontWeight: 600 }}>Total Trips</p>
          <h2 className="mb-0" style={{ fontSize: '2.5rem', fontWeight: 800 }}>{totalTrips}</h2>
        </div>
        <div className="card card-elevated text-center py-4">
          <p className="text-sm text-gray mb-1" style={{ fontWeight: 600 }}>Peak Hour</p>
          <h2 className="mb-0" style={{ fontSize: '2.5rem', fontWeight: 800 }}>{peakHour}</h2>
        </div>
        <div className="card card-elevated text-center py-4">
          <p className="text-sm text-gray mb-1" style={{ fontWeight: 600 }}>Most Requested Route</p>
          <h2 className="mb-0" style={{ fontSize: '1.25rem', marginTop: '0.5rem', fontWeight: 700 }}>{mostRequestedRoute}</h2>
        </div>
      </div>

      <div className="card-grid mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
        
        {/* Chart 1: Peak Hour Demand */}
        <div className="card card-elevated">
          <h3 className="mb-4" style={{ fontSize: '1.125rem', fontWeight: 700 }}>Peak Hour Demand</h3>
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={peakHourData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="hour" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip cursor={{ stroke: '#e2e8f0' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <Line type="monotone" dataKey="bookings" stroke="var(--accent-green)" strokeWidth={3} dot={{ r: 4, fill: 'var(--accent-green)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Bookings by Route */}
        <div className="card card-elevated">
          <h3 className="mb-4" style={{ fontSize: '1.125rem', fontWeight: 700 }}>Popular Pickup Points</h3>
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={routeData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <Bar dataKey="bookings" fill="var(--accent-green)" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Chart 3: Driver Status */}
        <div className="card card-elevated">
          <h3 className="mb-4" style={{ fontSize: '1.125rem', fontWeight: 700 }}>Current Driver Availability</h3>
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={driverData} layout="vertical" margin={{ top: 20, right: 30, left: 30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <YAxis dataKey="name" type="category" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={25}>
                  {
                    driverData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.name === 'Available' ? 'var(--accent-green)' : entry.name === 'On Trip' ? '#3b82f6' : '#cbd5e1'} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;
