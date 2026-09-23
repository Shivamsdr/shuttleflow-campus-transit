import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import { BusFront, CalendarDays, History, MapPin, Clock, ArrowRight, CheckCircle2, User } from 'lucide-react';

const Dashboard = () => {
  const { bookings, drivers, currentUser } = useAppContext();

  const upcomingTrips = bookings
    .filter(b => b.studentId === currentUser.id && (b.status === 'Pending' || b.status === 'Confirmed'))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const completedTrips = bookings.filter(
    b => b.studentId === currentUser.id && b.status === 'Completed'
  ).length;

  const nextTrip = upcomingTrips.length > 0 ? upcomingTrips[0] : null;
  const otherTrips = upcomingTrips.slice(1, 3); // show up to 2 more upcoming
  const driverForNextTrip = nextTrip?.driverId ? drivers.find(d => d.id === nextTrip.driverId) : null;

  return (
    <div className="container" style={{ maxWidth: '900px', paddingTop: '1.5rem' }}>

      {/* Header row */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="mb-1">
            Welcome back, {currentUser.name.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-gray mb-0">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Link to="/book-shuttle" className="btn btn-primary">
          <BusFront size={16} />
          Book a Shuttle
        </Link>
      </div>

      {/* Stat pills row */}
      <div className="student-stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="card card-elevated" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <div style={{ padding: '0.5rem', backgroundColor: 'var(--accent-primary-light)', borderRadius: '8px', color: 'var(--accent-primary)', display: 'flex' }}>
            <CalendarDays size={18} />
          </div>
          <div>
            <div style={{ fontSize: '1.375rem', fontWeight: 600, lineHeight: 1 }}>{upcomingTrips.length}</div>
            <div className="text-gray" style={{ fontSize: '0.8rem', marginTop: '2px' }}>Upcoming Trips</div>
          </div>
        </div>

        <div className="card card-elevated" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <div style={{ padding: '0.5rem', backgroundColor: '#e0e7ff', borderRadius: '8px', color: '#4f46e5', display: 'flex' }}>
            <CheckCircle2 size={18} />
          </div>
          <div>
            <div style={{ fontSize: '1.375rem', fontWeight: 600, lineHeight: 1 }}>{completedTrips}</div>
            <div className="text-gray" style={{ fontSize: '0.8rem', marginTop: '2px' }}>Completed Trips</div>
          </div>
        </div>

        <div className="card card-elevated" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <div style={{ padding: '0.5rem', backgroundColor: '#f1f5f9', borderRadius: '8px', color: '#64748b', display: 'flex' }}>
            <User size={18} />
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1.2 }}>{currentUser.name}</div>
            <div className="text-gray" style={{ fontSize: '0.8rem', marginTop: '2px' }}>ID: {currentUser.id}</div>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="student-dash-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem' }}>

        {/* Left: Next Trip Card */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Your Next Trip</h2>
            {upcomingTrips.length > 0 && (
              <Link to="/my-bookings" className="text-sm flex items-center gap-1"
                style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 500 }}>
                All bookings <ArrowRight size={14} />
              </Link>
            )}
          </div>

          {nextTrip ? (
            <div className="card card-elevated" style={{ borderLeft: '4px solid var(--accent-primary)', padding: '1.5rem' }}>
              {/* Date + status */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-gray" style={{ fontSize: '0.8rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>Scheduled</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                    {new Date(nextTrip.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <StatusBadge status={nextTrip.status} />
              </div>

              {/* Time */}
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} style={{ color: 'var(--accent-primary)' }} />
                <span style={{ fontSize: '1.375rem', fontWeight: 600, color: 'var(--accent-primary)' }}>{nextTrip.time}</span>
              </div>

              {/* Route visual */}
              <div style={{
                background: 'var(--bg-main)',
                borderRadius: '8px',
                padding: '0.875rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                marginBottom: '1.25rem'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)', border: '2px solid white', boxShadow: '0 0 0 2px var(--accent-primary-light)' }} />
                  <div style={{ width: '2px', height: '18px', backgroundColor: 'var(--border-color)' }} />
                  <MapPin size={14} style={{ color: 'var(--text-secondary)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{nextTrip.routeName.split(' → ')[0]}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{nextTrip.routeName.split(' → ')[1]}</span>
                </div>
              </div>

              {/* Footer: booking ID + driver */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <div>
                  <div className="text-gray" style={{ fontSize: '0.75rem', marginBottom: '2px' }}>Booking ID</div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{nextTrip.id}</div>
                </div>
                <div>
                  <div className="text-gray" style={{ fontSize: '0.75rem', marginBottom: '2px' }}>Driver</div>
                  {driverForNextTrip ? (
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--accent-primary-text)' }}>{driverForNextTrip.name}</div>
                      <div className="text-gray" style={{ fontSize: '0.75rem' }}>{driverForNextTrip.vehicle}</div>
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Assigning soon...</div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="card flex flex-col items-center justify-center" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#f1f5f9', borderRadius: '50%', color: '#94a3b8', marginBottom: '1rem' }}>
                <BusFront size={28} />
              </div>
              <h3 className="mb-1" style={{ fontSize: '1rem' }}>No upcoming trips</h3>
              <p className="text-sm text-gray mb-4">You don't have any shuttle rides scheduled.</p>
              <Link to="/book-shuttle" className="btn btn-primary">Book your first ride</Link>
            </div>
          )}

          {/* Other upcoming trips */}
          {otherTrips.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <p className="text-sm text-gray mb-2" style={{ fontWeight: 500 }}>Also coming up</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {otherTrips.map(trip => (
                  <div key={trip.id} className="card" style={{ padding: '0.875rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{trip.routeName}</div>
                      <div className="text-gray" style={{ fontSize: '0.75rem' }}>
                        {new Date(trip.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {trip.time}
                      </div>
                    </div>
                    <StatusBadge status={trip.status} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Quick Actions */}
          <div className="card">
            <h2 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 1rem 0' }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { to: '/book-shuttle', label: 'Book a Shuttle', icon: <BusFront size={15} />, primary: true },
                { to: '/my-bookings', label: 'My Bookings', icon: <CalendarDays size={15} />, count: upcomingTrips.length },
                { to: '/trip-history', label: 'Trip History', icon: <History size={15} /> },
              ].map(({ to, label, icon, primary, count }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex justify-between items-center"
                  style={{
                    padding: '0.625rem 0.75rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    color: primary ? 'white' : 'var(--text-primary)',
                    fontSize: '0.875rem',
                    background: primary ? 'var(--accent-primary)' : 'transparent',
                    border: primary ? 'none' : '1px solid var(--border-color)',
                    fontWeight: primary ? 600 : 400,
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={e => { if (!primary) e.currentTarget.style.background = 'var(--accent-primary-light)'; }}
                  onMouseLeave={e => { if (!primary) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span className="flex items-center gap-2" style={{ color: primary ? 'white' : 'var(--text-secondary)' }}>
                    {icon} {label}
                  </span>
                  {count > 0 && (
                    <span style={{ background: 'white', color: 'var(--accent-primary)', borderRadius: '999px', padding: '0.1rem 0.5rem', fontSize: '0.7rem', fontWeight: 700 }}>
                      {count}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Recent History */}
          <div className="card card-elevated">
            <div className="flex justify-between items-center mb-4">
              <h2 style={{ fontSize: '1.125rem', margin: 0, fontWeight: 700, color: 'var(--text-primary)' }}>Recent History</h2>
              <Link to="/trip-history" className="text-sm" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem' }}>See all</Link>
            </div>
            {bookings.filter(b => b.studentId === currentUser.id && (b.status === 'Completed' || b.status === 'Cancelled'))
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 3)
              .map(b => (
                <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem 0', borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{b.routeName.split(' → ')[0]} → {b.routeName.split(' → ')[1]}</div>
                    <div className="text-gray" style={{ fontSize: '0.8rem', fontWeight: 500 }}>{b.date} · {b.time}</div>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
              ))}
            {bookings.filter(b => b.studentId === currentUser.id && (b.status === 'Completed' || b.status === 'Cancelled')).length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--accent-secondary-light)', borderRadius: '50%', color: 'var(--accent-secondary)', display: 'inline-flex', marginBottom: '0.75rem' }}>
                  <History size={20} />
                </div>
                <p className="text-sm text-gray mb-0" style={{ fontWeight: 500 }}>No past trips yet.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;