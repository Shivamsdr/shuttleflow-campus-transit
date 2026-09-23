import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import { Users, CalendarDays, Map, TrendingUp, Clock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

const StatCard = ({ label, value, sub, icon, accent, linkTo, linkLabel }) => (
  <div className="card card-elevated" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
    <div className="flex justify-between items-start">
      <p className="text-sm text-gray mb-0" style={{ fontWeight: 600, fontSize: '0.875rem' }}>{label}</p>
      <div style={{
        padding: '0.75rem',
        backgroundColor: accent ? 'var(--accent-primary-light)' : 'var(--bg-main)',
        borderRadius: '12px',
        color: accent ? 'var(--accent-primary)' : 'var(--text-secondary)',
        display: 'flex',
        boxShadow: accent ? '0 4px 12px rgba(16, 185, 129, 0.15)' : '0 4px 12px rgba(0, 0, 0, 0.05)'
      }}>
        {icon}
      </div>
    </div>
    <div>
      <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{value}</span>
      {sub && <span className="text-sm text-gray" style={{ marginLeft: '0.4rem', fontWeight: 500 }}>{sub}</span>}
    </div>
    {linkTo && (
      <Link to={linkTo} className="text-sm flex items-center gap-1"
        style={{ color: 'var(--accent-primary)', textDecoration: 'none', marginTop: 'auto', fontWeight: 600 }}>
        {linkLabel} <ArrowRight size={14} />
      </Link>
    )}
  </div>
);

const AdminDashboard = () => {
  const { bookings, drivers, routes } = useAppContext();

  const today = new Date().toISOString().split('T')[0];
  const pendingBookings = bookings.filter(b => b.status === 'Pending');
  const confirmedToday = bookings.filter(b => b.date === today && b.status === 'Confirmed').length;
  const activeDrivers = drivers.filter(d => d.status === 'Available' || d.status === 'On Trip').length;
  const todaysBookings = bookings.filter(b => b.date === today).length;

  // Recent bookings — last 5
  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Driver overview
  const driversByStatus = {
    available: drivers.filter(d => d.status === 'Available').length,
    onTrip: drivers.filter(d => d.status === 'On Trip').length,
    unavailable: drivers.filter(d => d.status === 'Unavailable').length,
  };

  return (
    <div className="container" style={{ paddingTop: '1.5rem' }}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="mb-1" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Admin Dashboard</h1>
          <p className="text-sm text-gray mb-0" style={{ fontSize: '0.875rem' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <Link to="/admin/bookings" className="btn btn-primary btn-lg" style={{ gap: '0.5rem' }}>
          <CalendarDays size={18} />
          Manage Bookings
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="admin-stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard
          label="Pending Bookings"
          value={pendingBookings.length}
          icon={<AlertCircle size={20} />}
          accent={pendingBookings.length > 0}
          linkTo="/admin/bookings"
          linkLabel="Review now"
        />
        <StatCard
          label="Today's Trips"
          value={todaysBookings}
          sub="bookings"
          icon={<CalendarDays size={20} />}
          linkTo="/admin/analytics"
          linkLabel="View analytics"
        />
        <StatCard
          label="Active Drivers"
          value={activeDrivers}
          sub={`/ ${drivers.length} total`}
          icon={<Users size={20} />}
          accent={activeDrivers > 0}
          linkTo="/admin/drivers"
          linkLabel="Manage drivers"
        />
        <StatCard
          label="Routes"
          value={routes.length}
          sub="active"
          icon={<Map size={20} />}
          linkTo="/admin/routes"
          linkLabel="View routes"
        />
      </div>

      {/* Two-column layout */}
      <div className="admin-dash-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem' }}>

        {/* Recent Bookings Table */}
        <div className="card card-elevated" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="flex justify-between items-center" style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid var(--border-color)' }}>
            <h2 style={{ fontSize: '1.125rem', margin: 0, fontWeight: 700 }}>Recent Bookings</h2>
            <Link to="/admin/bookings" className="text-sm flex items-center gap-1"
              style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}>
              See all <ArrowRight size={14} />
            </Link>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr>
                <th style={{ padding: '0.75rem 1.5rem', background: 'var(--bg-main)', color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Student</th>
                <th style={{ padding: '0.75rem 1rem', background: 'var(--bg-main)', color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Route</th>
                <th style={{ padding: '0.75rem 1rem', background: 'var(--bg-main)', color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Time</th>
                <th style={{ padding: '0.75rem 1.5rem 0.75rem 0', background: 'var(--bg-main)', color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'right', borderBottom: '1px solid var(--border-color)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b, i) => (
                <tr key={b.id} style={{ borderBottom: i < recentBookings.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                  <td style={{ padding: '0.875rem 1.5rem' }}>
                    <div style={{ fontWeight: 500 }}>{b.studentName}</div>
                    <div className="text-gray" style={{ fontSize: '0.75rem' }}>{b.id}</div>
                  </td>
                  <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)', maxWidth: '160px' }}>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.routeName}</div>
                    <div className="text-gray" style={{ fontSize: '0.75rem' }}>{b.date}</div>
                  </td>
                  <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                    <Clock size={13} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                    {b.time}
                  </td>
                  <td style={{ padding: '0.875rem 1.5rem 0.875rem 0', textAlign: 'right' }}>
                    <StatusBadge status={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right column: Driver Status + Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Driver Status Breakdown */}
          <div className="card card-elevated">
            <div className="flex justify-between items-center mb-4">
              <h2 style={{ fontSize: '1.125rem', margin: 0, fontWeight: 700 }}>Driver Status</h2>
              <Link to="/admin/drivers" className="text-sm" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}>Manage</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Available', count: driversByStatus.available, color: 'var(--accent-green)' },
                { label: 'On Trip', count: driversByStatus.onTrip, color: '#3b82f6' },
                { label: 'Unavailable', count: driversByStatus.unavailable, color: '#cbd5e1' },
              ].map(({ label, count, color }) => (
                <div key={label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">{label}</span>
                    <span className="text-sm" style={{ fontWeight: 600 }}>{count}</span>
                  </div>
                  <div style={{ height: '6px', borderRadius: '999px', background: '#f1f5f9', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${drivers.length > 0 ? (count / drivers.length) * 100 : 0}%`,
                      backgroundColor: color,
                      borderRadius: '999px',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card card-elevated">
            <h2 style={{ fontSize: '1.125rem', margin: '0 0 1rem 0', fontWeight: 700 }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { to: '/admin/bookings', label: 'Review Pending Bookings', icon: <AlertCircle size={16} />, count: pendingBookings.length },
                { to: '/admin/drivers', label: 'Drivers & Scheduling', icon: <Users size={16} /> },
                { to: '/admin/routes', label: 'Manage Routes', icon: <Map size={16} /> },
                { to: '/admin/analytics', label: 'View Analytics', icon: <TrendingUp size={16} /> },
              ].map(({ to, label, icon, count }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex justify-between items-center"
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    background: 'transparent',
                    transition: 'all var(--transition-base)',
                    border: '1px solid var(--border-color)',
                    fontWeight: 500,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--accent-primary-light)';
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                    {icon} {label}
                  </span>
                  {count > 0 && (
                    <span style={{ background: 'var(--accent-primary)', color: 'white', borderRadius: '999px', padding: '0.125rem 0.625rem', fontSize: '0.7rem', fontWeight: 700, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      {count}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;