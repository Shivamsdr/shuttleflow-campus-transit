import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BusFront, LayoutDashboard, CalendarDays, History, Users, Map, BarChart3, Menu, X } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [menuOpen, setMenuOpen] = useState(false);

  const studentLinks = [
    { to: '/', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { to: '/book-shuttle', label: 'Book Shuttle', icon: <BusFront size={16} /> },
    { to: '/my-bookings', label: 'My Bookings', icon: <CalendarDays size={16} /> },
    { to: '/trip-history', label: 'Trip History', icon: <History size={16} /> }
  ];

  const adminLinks = [
    { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { to: '/admin/bookings', label: 'Bookings', icon: <CalendarDays size={16} /> },
    { to: '/admin/drivers', label: 'Drivers & Scheduling', icon: <Users size={16} /> },
    { to: '/admin/routes', label: 'Routes', icon: <Map size={16} /> },
    { to: '/admin/analytics', label: 'Analytics', icon: <BarChart3 size={16} /> }
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  const isActive = (link) =>
    location.pathname === link.to ||
    (link.to !== '/admin' && link.to !== '/' && location.pathname.startsWith(link.to));

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      {/* Top row: brand + hamburger (on mobile) */}
      <div className="nav-top-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link to={isAdmin ? '/admin' : '/'} className="brand" onClick={() => setMenuOpen(false)}>
          <BusFront size={22} />
          ShuttleFlow
          {isAdmin && (
            <span className="badge" style={{ backgroundColor: '#e2e8f0', color: '#475569', marginLeft: '8px', fontSize: '0.7rem' }}>
              Admin
            </span>
          )}
        </Link>

        {/* Hamburger toggle — visible only on small screens */}
        <button
          onClick={handleMenuToggle}
          className="nav-hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Links row */}
      <div className={`nav-links${menuOpen ? ' nav-open' : ''}`}>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={isActive(link) ? 'active' : ''}
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
            onClick={() => setMenuOpen(false)}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {link.icon}
              {link.label}
            </span>
          </Link>
        ))}
        <Link
          to={isAdmin ? '/' : '/admin'}
          className="btn btn-outline nav-switch-btn"
          style={{ padding: '0.25rem 0.75rem', marginLeft: '0.5rem' }}
          onClick={() => setMenuOpen(false)}
        >
          <span>Switch to {isAdmin ? 'Student' : 'Admin'}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
