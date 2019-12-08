import React from 'react';

export default function ContactAction ({
  firstName, lastName,
  event: { name: eventName, color: eventColor },
  status: { name: statusName, color: statusColor }
}) {
  return (
    <div className="contact col-md-12">
      <div className="body">
        <span className="info-pill" style={{backgroundColor: eventColor}}>{eventName}</span>
        <b>{firstName} {lastName}</b>
      </div>
      <div className="actions">
        <span className="info-pill action" style={{backgroundColor: statusColor}}>{statusName}</span>
      </div>
    </div>
  )
}
