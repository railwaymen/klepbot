import React, { useState } from 'react';

export default function ContactAction ({
  firstName, lastName, actionType, emailBody, createdAt,
  event: { name: eventName, color: eventColor },
  status: { name: statusName, color: statusColor }
}) {

  const [hide, setHide] = useState(true);
  const toggleHide = () => setHide(!hide);

  return (
    <div className="contact col-md-12 history-contact-action" onClick={toggleHide}>
      <div className="action-container">
        <div className="body">
          <span className="info-pill" style={{backgroundColor: eventColor}}>{eventName}</span>
          <b>{firstName} {lastName}</b>
        </div>
        <div className="actions">
          {actionType}
          <span className="info-pill action" style={{backgroundColor: statusColor}}>{statusName}</span>
          <i className="fas fa-caret-down"></i>
        </div>
      </div>
      <div hidden={hide}>
        <p>{emailBody}</p>
        <p>{createdAt}</p>
      </div>
    </div>
  )
}
