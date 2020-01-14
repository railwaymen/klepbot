import React, { useContext } from 'react';
import EmailTemplatesContext from '../../contexts/email-templates-context';
import CurrentUserContext from '../../contexts/current-user-context';

export default function EmailTemplates({ onSelect }) {
  const { templates } = useContext(EmailTemplatesContext);
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="body form-group">
      <select multiple className="form-control" >
      {templates.map(template => (
        <option key={template.id} onClick={() => onSelect(template)}>
          {template.name}
        </option>
      ))}
      </select>
    </div>
  )
}
