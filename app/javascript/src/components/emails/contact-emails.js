import React, { useState, useEffect } from 'react';
import EmailsService from '../../services/emails-service';

export default function Emails({ contactId }) {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    EmailsService.contactEmails(contactId).then((fetchedEmails) => setEmails(fetchedEmails));
  }, []);

  return (
    <div className="history row box">
      <div className="col-md-12">
        <h4>Emails</h4>
        <div>
          {emails.map((email) => (
            <Email {...email} key={email.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Email({ subject, body, to, googleId, user: { fullName }, createdAt, labels, readAt }) {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className="contact col-md-12 history-contact-action" onClick={() => setIsHidden(!isHidden)}>
      <div className="action-container">
        <div className="body">
          <b>{subject}</b>, by {fullName}
        </div>
        <div className="tags">
          {labels.map((label) => (
            <p>{label}</p>
          ))}
        </div>
        <div className="actions">
          {to}
          <b>{createdAt}</b>
          <i className="fas fa-caret-down"></i>
        </div>
      </div>
      <div className="email-container" hidden={isHidden}>
        <p dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </div>
  )
}
