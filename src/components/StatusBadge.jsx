import React from 'react';

const StatusBadge = ({ status }) => {
  const statusLower = status.toLowerCase();
  let badgeColor = '';

  switch(statusLower) {
    case 'pending':
      badgeColor = 'var(--status-pending-bg)';
      break;
    case 'confirmed':
    case 'completed':
    case 'available':
      badgeColor = 'var(--status-confirmed-bg)';
      break;
    case 'cancelled':
    case 'unavailable':
      badgeColor = 'var(--status-cancelled-bg)';
      break;
    case 'on trip':
      badgeColor = 'var(--status-on-trip-bg)';
      break;
    default:
      badgeColor = '#e2e8f0';
  }

  let textColor = '';
  switch(statusLower) {
    case 'pending': textColor = 'var(--status-pending-text)'; break;
    case 'confirmed': 
    case 'completed':
    case 'available': textColor = 'var(--status-confirmed-text)'; break;
    case 'cancelled':
    case 'unavailable': textColor = 'var(--status-cancelled-text)'; break;
    case 'on trip': textColor = 'var(--status-on-trip-text)'; break;
    default: textColor = '#475569';
  }

  return (
    <span className="badge" style={{ backgroundColor: badgeColor, color: textColor }}>
      {status}
    </span>
  );
};

export default StatusBadge;
