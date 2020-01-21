import React, { useState } from 'react';
import PopupWrapper from './popup-wrapper';
import ComposeEmail from '../compose-email';

export default function EmailCreate({ contact, onComposeEmail, close }) {
  const [template, setTemplate] = useState('');
  const onSubmit = (args) => {
    close();
    onComposeEmail(args);
  }

  return (
    <PopupWrapper title="Compose email" close={close}>
      <ComposeEmail
        {...contact}
        template={template}
        setTemplate={setTemplate}
        onComposeEmail={onSubmit}
      />
    </PopupWrapper>
  )
}
