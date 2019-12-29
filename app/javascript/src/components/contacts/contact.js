import React from 'react';

export default function Contact ({ id, firstName, lastName, event, status, openModal }) {
  const openModalWithId = () => openModal(id);
  const { name: eventName, color: eventColor } = event;
  const { name: statusName, color: statusColor } = status;

  return (
    <div className="contact col-md-12">
      <div className="body">
        <span className="info-pill" style={{color: eventColor, borderColor: eventColor}}>{eventName}</span>
        <b>{firstName} {lastName}</b>
      </div>
      <div className="actions">
        <i className="far action fa-eye" onClick={openModalWithId}></i>
        <span className="info-pill action" style={{backgroundColor: statusColor}}>{statusName}</span>
      </div>
    </div>
  )
}
