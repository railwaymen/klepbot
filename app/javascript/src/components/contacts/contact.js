import React from 'react';

export default function Contact ({ firstName, lastName, event, eventColor, statusColor, status, openModal }) {
  return (
    <div className="contact col-md-12">
      <div className="body">
        <span className="info-pill" style={{backgroundColor: eventColor()}}>{event}</span>
        <b>{firstName} {lastName}</b>
      </div>
      <div className="actions">
        <i className="far action fa-eye" onClick={openModal}></i>
        <span className="info-pill action" style={{backgroundColor: statusColor()}}>{status}</span>
      </div>
    </div>
  )
}
