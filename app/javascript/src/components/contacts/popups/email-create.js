import React, { useState } from 'react';
import PopupWrapper from './popup-wrapper';
import ComposeEmail from '../compose-email';
import ValidatorHelper from '../../../helpers/validator-helper';
import EmailModel from '../../../models/email-model';

export default function EmailCreate({ contact, onComposeEmail, close }) {
  const [email, setEmail] = useState(contact.buildEmail());
  const [errors, setErrors] = useState({});

  const setAttributes = (values) => {
    const changedEmail = new EmailModel({
      ...email,
      ...values,
    })

    setEmail(changedEmail);
  }

  const onSubmit = () => {
    const { body, subject, to } = email;
    const validate = new ValidatorHelper();
    validate.presence({ body, subject, to });

    if (!validate.isValid()) return setErrors(validate.errors);

    close();
    onComposeEmail(email);
  }

  return (
    <PopupWrapper title="Compose email" close={close}>
      <ComposeEmail
        contact={contact}
        email={email}
        setEmail={setEmail}
        setAttributes={setAttributes}
        onComposeEmail={onSubmit}
        errors={errors}
      />
    </PopupWrapper>
  )
}
