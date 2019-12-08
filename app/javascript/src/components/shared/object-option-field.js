import React from 'react';

export default function OptionField ({ object: { name, id } }) {
  return (
    <option value={id}>{name}</option>
  )
}

export default function SelectField ({ collection, name, selectedId }) {
  return (
    <select name={name} onChange={this.onChange} value={selectedId}>
      {collection.map(element => (
        <OptionField object={element} onSelect={alert} />
      ))}
    </select>
  )
}
