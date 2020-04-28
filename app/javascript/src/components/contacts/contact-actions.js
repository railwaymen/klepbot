import React, { useState } from 'react';
import TaskCreate from './popups/task-create';
import EmailCreate from './popups/email-create';
import ContactHubspot from './popups/contact-hubspot';

export default function ContactActions({ contact, onComposeEmail, onTaskSubmit, onHubspotSync }) {
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isHubspotOpen, setIsHubspotOpen] = useState(false);
  const closeTask = () => setIsTaskOpen(false);
  const closeEmail = () => setIsEmailOpen(false);
  const closeHubspot = () => setIsHubspotOpen(false);

  return (
    <>
      <div className="row box actions-container">
        <div className="action" onClick={() => setIsTaskOpen(true)}>
          <i className="fas fa-tasks"></i>
        </div>
        <div className="action" onClick={() => setIsEmailOpen(true)}>
          <i className="far fa-envelope-open"></i>
        </div>
        <div className="action" onClick={() => setIsHubspotOpen(true)}>
          <i className="fab fa-hubspot"></i>
        </div>
      </div>
      <div className="tasks-container">
        { isTaskOpen ? <TaskCreate close={closeTask} contact={contact} onTaskSubmit={onTaskSubmit} /> : null }
        { isEmailOpen ? <EmailCreate close={closeEmail} contact={contact} onComposeEmail={onComposeEmail}/> : null }
        { isHubspotOpen ? <ContactHubspot close={closeHubspot} contact={contact} onHubspotSync={onHubspotSync}/> : null }
      </div>
    </>
  )
}
