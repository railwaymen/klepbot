import React, { useContext } from 'react';
import EmailTemplatesContext from '../../contexts/email-templates-context';

export default function EmailTemplates({ onSelect }) {
  const { templates } = useContext(EmailTemplatesContext);

  return (
    <div className="body">
      {templates.map(template => (
        <div key={template.id} onClick={() => onSelect(template)}>
          <p>{template.name}</p>
        </div>
      ))}
    </div>
  )
}
