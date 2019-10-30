import React, { useContext } from 'react';
import EmailTemplatesContext from '../../contexts/email-templates-context';

export default function EmailTemplates({ onSelect }) {
  const { templates } = useContext(EmailTemplatesContext);

  return (
    <div className="body">
      <select multiple>
      {templates.map(template => (
        <option key={template.id} onClick={() => onSelect(template)}>
          {template.name}
        </option>
      ))}
      </select>
    </div>
  )
}
