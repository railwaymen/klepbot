import React from 'react';
import { Link } from "react-router-dom";

export default function EmailTemplateItem({ id, body, name, onDelete }) {
  const onTemplateDelete = () => onDelete(id);

  return (
    <tr>
      <td>
        <Link to={`/email-templates/${id}/edit`}><i className="far fa-edit"></i></Link>
        <a href="javascript:void(0)" onClick={onTemplateDelete}><i class="far fa-trash-alt"></i></a>
      </td>
      <td>{id}</td>
      <td>{name}</td>
      <td>{body}</td>
    </tr>
  )
}
