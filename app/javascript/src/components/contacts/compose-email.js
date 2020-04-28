import React, { useContext, useState, useEffect } from 'react';
import EmailTemplates from '../shared/templates';
import CurrentUserContext from '../../contexts/current-user-context';
import GradientButton from '../shared/button';
import EmailsService from '../../services/emails-service';
import TinyMCE from '../shared/tiny-mce';

export default function GmailCompose(props) {
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);

  useEffect(() => {
    EmailsService.isGmailConnected().then((connected) => {
      setIsGoogleConnected(connected);
    });
  }, []);

  if (isGoogleConnected) {
    return (
      <ComposeEmail {...props} />
    )
  } else {
    return (
      <div className="col container-message-info">
        <h5>Seems that you're not connected with Gmail!</h5>
        <GradientButton onClick={onConnect}>Connect</GradientButton>
      </div>
    )
  }
}

function ComposeEmail({ setAttributes, email: { body, subject }, errors, onComposeEmail, contact: { replaceAttributesForEmailTemplate } }) {
  const onSubmit = () => {
    onComposeEmail()
  }

  const onChange = ({ target: { value, name } }) => {
    setAttributes({ name, value });
  }

  const onSelectTemplate = (template, signature) => {
    const emailBody = replaceAttributesForEmailTemplate(template.body, signature);
    const emailSubject = template.subject;

    setAttributes({
      body: emailBody,
      subject: emailSubject,
    });
  }

  return (
    <div className="details col form-control-klepbot">
      <div className="email-body">
        <div className="input-anim-container">
          <label htmlFor="templateSubject">Subject</label>
          <input
            id="templateSubject"
            type="text"
            placeholder="Subject"
            className="form-control"
            value={subject}
            onChange={onChange}
            name="subject"
          />
          <div className={`border ${errors.subject ? 'error' : ''}`}></div>
        </div>
        <div className="input-anim-container">
          <label htmlFor="templateBody">Body</label>
          <div className={`border ${errors.body ? 'error' : ''}`}></div>
          <TinyMCE value={body} onChange={onChange} name="body" />
          <div className={`border ${errors.body ? 'error' : ''}`}></div>
        </div>
      </div>
      <EmailTemplatesForCurrentUser onSelect={onSelectTemplate} />
      <div className="button-container">
        <button type="button" className="btn btn-light" onClick={onSubmit}>Compose</button>
      </div>
    </div>
  )
}

function EmailTemplatesForCurrentUser({ onSelect }) {
  const { currentUser } = useContext(CurrentUserContext);

  const onSelectTemplate = (template) => {
    currentUser().then(user => {
      onSelect(template, user.signature);
    })
  }

  return (
    <EmailTemplates onSelect={onSelectTemplate} />
  )
}

function onConnect() {
  const clientId = process.env.CLIENT_ID;
  const scope = [
    'https://www.googleapis.com/auth/gmail.labels',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.insert',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.settings.basic',
    'https://www.googleapis.com/auth/gmail.settings.sharing',
    'https://mail.google.com/',
  ].join(' ');
  const includeGrantedScopes = process.env.INCLUDE_GRANTED_SCOPES;
  const responseType = process.env.RESPONSE_TYPE;
  const state = process.env.STATE;
  const redirectUrl = process.env.REDIRECT_URL;
  const accessType = process.env.ACCESS_TYPE;
  const prompt = process.env.PROMPT;

  const href = `https://accounts.google.com/o/oauth2/v2/auth?prompt=${prompt}&scope=${scope}&access_type=${accessType}&include_granted_scopes=${includeGrantedScopes}&response_type=${responseType}&state=${state}&redirect_uri=${redirectUrl}&client_id=${clientId}`;

  window.open(href, '_blank');
}
