import React, { useState } from 'react';
import PopupWrapper from './popup-wrapper';
import ComposeEmail from '../compose-email';
import ValidatorHelper from '../../../helpers/validator-helper';

export default function EmailCreate({ contact, onComposeEmail, close }) {
  const [template, setTemplate] = useState('');
  const [errors, setErrors] = useState({});

  const onSubmit = (template) => {
    const validate = new ValidatorHelper();
    validate.presence({ template });

    if (!validate.isValid()) return setErrors(validate.errors);

    close();
    onComposeEmail(template);
  }

  return (
    <PopupWrapper title="Compose email" close={close}>
      <ComposeEmail
        {...contact}
        template={template}
        setTemplate={setTemplate}
        onComposeEmail={onSubmit}
        errors={errors}
      />
    </PopupWrapper>
  )
}
