import React, { useState } from 'react';
import TaskCreate from './popups/task-create';
import EmailCreate from './popups/email-create';

export default function ContactActions({ contact, onComposeEmail, onTaskSubmit }) {
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const closeTask = () => setIsTaskOpen(false);
  const closeEmail = () => setIsEmailOpen(false);

  return (
    <>
      <div className="row box actions-container">
        <div className="action" onClick={() => setIsTaskOpen(true)}>
          <i className="fas fa-tasks"></i>
        </div>
        <div className="action" onClick={() => setIsEmailOpen(true)}>
          <i className="far fa-envelope-open"></i>
        </div>
      </div>
      { isTaskOpen ? <TaskCreate close={closeTask} contact={contact} onTaskSubmit={onTaskSubmit} /> : null }
      { isEmailOpen ? <EmailCreate close={closeEmail} contact={contact} onComposeEmail={onComposeEmail}/> : null}
    </>
  )
}
